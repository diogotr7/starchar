use crate::hash::Hash;
use deku::prelude::*;
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, fmt};

#[derive(DekuRead, DekuWrite, Serialize, Deserialize, Default, Copy, Clone)]
pub struct DnaBlend {
    value: u16,
    head_id: u16,
}

impl fmt::Debug for DnaBlend {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{{ id: {:2}, {:.3} }}",
            self.head_id,
            (self.value as f32) / (std::u16::MAX as f32),
        )
    }
}

#[derive(Debug, Serialize, Deserialize, Eq, PartialEq, Hash)]
#[serde(rename_all = "camelCase")]
pub enum FacePart {
    EyebrowLeft,
    EyebrowRight,
    EyeLeft,
    EyeRight,
    Nose,
    EarLeft,
    EarRight,
    CheekLeft,
    CheekRight,
    Mouth,
    Jaw,
    Crown,
}

impl Into<usize> for FacePart {
    fn into(self) -> usize {
        self as usize
    }
}

impl From<usize> for FacePart {
    fn from(value: usize) -> Self {
        match value {
            0 => FacePart::EyebrowLeft,
            1 => FacePart::EyebrowRight,
            2 => FacePart::EyeLeft,
            3 => FacePart::EyeRight,
            4 => FacePart::Nose,
            5 => FacePart::EarLeft,
            6 => FacePart::EarRight,
            7 => FacePart::CheekLeft,
            8 => FacePart::CheekRight,
            9 => FacePart::Mouth,
            10 => FacePart::Jaw,
            11 => FacePart::Crown,
            _ => unreachable!(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DnaFaceParts2(HashMap<FacePart, [DnaBlend; 4]>);

impl DnaFaceParts2 {
    fn read<R: std::io::Read + std::io::Seek>(
        reader: &mut deku::reader::Reader<R>,
    ) -> Result<DnaFaceParts2, DekuError> {
        let mut dna_face_parts: HashMap<FacePart, [DnaBlend; 4]> = HashMap::new();
        for i in 0..(12 * 4) {
            let part = DnaBlend::from_reader_with_ctx(reader, ())?;

            let face_part: FacePart = (i % 12).into();
            let face_index = i / 12;

            // Get or initialize the array for this face part
            let parts = dna_face_parts.entry(face_part).or_insert(
                [DnaBlend {
                    value: 0,
                    head_id: 0,
                }; 4],
            );

            // Store the newly read part at the correct index
            parts[face_index] = part;
        }
        Ok(DnaFaceParts2(dna_face_parts))
    }

    fn write<W: std::io::Write + std::io::Seek>(
        writer: &mut Writer<W>,
        field_a: &DnaFaceParts2,
    ) -> Result<(), DekuError> {
        for i in 0..(12 * 4) {
            let face_part: FacePart = (i % 12).into();
            let face_index = i / 12;
            field_a.0[&face_part][face_index].to_writer(writer, ())?;
        }
        Ok(())
    }
}

#[derive(Debug, DekuRead, DekuWrite, Serialize, Deserialize)]
pub struct Dna {
    pub size: u64,
    #[deku(assert_eq = "Hash::from_str(b\"dna matrix 1.0\")")]
    pub dna_hash1: Hash,

    #[deku(assert = "[
        Hash::from_str(b\"protos_human_male_face_t1_pu\"),
        Hash::from_str(b\"protos_human_female_face_t1_pu\")
    ].contains(&dna_hash2)")]
    pub dna_hash2: Hash,

    #[deku(assert = "[
        // any of these when hash2 is male
        Hash(0x65e740d3),
        Hash(0x66df165f),
        Hash(0x674986d1),
        // any of these when hash2 is female
        Hash(0x65d75204),
        Hash(0x66ebfad1),
        Hash(0x67448f99),
    ].contains(&dna_hash3)")]
    pub dna_hash3: Hash,

    #[deku(assert_eq = "0")]
    pub zero: u32,

    #[deku(assert_eq = "12")]
    pub part_count: u16,

    #[deku(assert_eq = "4")]
    pub blends_per_part: u16,

    #[deku(assert_eq = "4")]
    pub four: u16,

    #[deku(assert = "*max_head_id < 60")]
    pub max_head_id: u16,

    #[deku(
        reader = "DnaFaceParts2::read(deku::reader)",
        writer = "DnaFaceParts2::write(deku::writer, &self.face_parts)"
    )]
    pub face_parts: DnaFaceParts2,
}
