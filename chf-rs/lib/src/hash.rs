use deku::prelude::*;
use serde::{Deserialize, Serialize};
use std::fmt;

#[derive(DekuRead, DekuWrite, PartialEq)]
pub struct Hash(pub u32);

impl Hash {
    pub fn from_str(s: &[u8]) -> Self {
        Hash(crc32c::crc32c(s))
    }
}

impl fmt::Debug for Hash {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "0x{:08x}", self.0)
    }
}

impl Serialize for Hash {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&format!("{:?}", self))
    }
}

impl<'de> Deserialize<'de> for Hash {
    fn deserialize<D>(deserializer: D) -> Result<Hash, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let u32asstr = String::deserialize(deserializer)?;
        let u32 = u32::from_str_radix(&u32asstr[2..], 16).map_err(serde::de::Error::custom)?;
        Ok(Hash(u32))
    }
}
