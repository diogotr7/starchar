use deku::{DekuRead, DekuWrite};
use serde::{Deserialize, Serialize};
use std::fmt;

//parsing and formatting for this is just CryGuid

#[derive(DekuRead, DekuWrite, PartialEq, Default)]
pub struct CigGuid {
    data: [u8; 16],
}

impl CigGuid {
    pub fn from_bytes(data: [u8; 16]) -> Self {
        CigGuid { data }
    }

    //should exactly match the format of the debug output
    pub fn parse_str(s: &str) -> Self {
        let mut data = [0; 16];
        assert_eq!(s.len(), 36);
        data[7] = u8::from_str_radix(&s[0..2], 16).unwrap();
        data[6] = u8::from_str_radix(&s[2..4], 16).unwrap();
        data[5] = u8::from_str_radix(&s[4..6], 16).unwrap();
        data[4] = u8::from_str_radix(&s[6..8], 16).unwrap();
        //-
        data[3] = u8::from_str_radix(&s[9..11], 16).unwrap();
        data[2] = u8::from_str_radix(&s[11..13], 16).unwrap();
        //-
        data[1] = u8::from_str_radix(&s[14..16], 16).unwrap();
        data[0] = u8::from_str_radix(&s[16..18], 16).unwrap();
        //-
        data[15] = u8::from_str_radix(&s[19..21], 16).unwrap();
        data[14] = u8::from_str_radix(&s[21..23], 16).unwrap();
        //-
        data[13] = u8::from_str_radix(&s[24..26], 16).unwrap();
        data[12] = u8::from_str_radix(&s[26..28], 16).unwrap();
        data[11] = u8::from_str_radix(&s[28..30], 16).unwrap();
        data[10] = u8::from_str_radix(&s[30..32], 16).unwrap();
        data[9] = u8::from_str_radix(&s[32..34], 16).unwrap();
        data[8] = u8::from_str_radix(&s[34..36], 16).unwrap();
        CigGuid { data }
    }

    pub fn is_empty(&self) -> bool {
        self.data.iter().all(|&x| x == 0)
    }
}

impl fmt::Debug for CigGuid {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:02x}", self.data[7])?;
        write!(f, "{:02x}", self.data[6])?;
        write!(f, "{:02x}", self.data[5])?;
        write!(f, "{:02x}", self.data[4])?;
        write!(f, "-")?;
        write!(f, "{:02x}", self.data[3])?;
        write!(f, "{:02x}", self.data[2])?;
        write!(f, "-")?;
        write!(f, "{:02x}", self.data[1])?;
        write!(f, "{:02x}", self.data[0])?;
        write!(f, "-")?;
        write!(f, "{:02x}", self.data[15])?;
        write!(f, "{:02x}", self.data[14])?;
        write!(f, "-")?;
        write!(f, "{:02x}", self.data[13])?;
        write!(f, "{:02x}", self.data[12])?;
        write!(f, "{:02x}", self.data[11])?;
        write!(f, "{:02x}", self.data[10])?;
        write!(f, "{:02x}", self.data[9])?;
        write!(f, "{:02x}", self.data[8])
    }
}

impl Serialize for CigGuid {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&format!("{:?}", self))
    }
}

impl<'de> Deserialize<'de> for CigGuid {
    fn deserialize<D>(deserializer: D) -> Result<CigGuid, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        Ok(CigGuid::parse_str(&s))
    }
}
