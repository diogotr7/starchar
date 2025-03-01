use crate::dna::*;
use crate::materials::MaterialDefinition;
use crate::{cig_guid::CigGuid, item_port::ItemPort};
use deku::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, DekuRead, DekuWrite, Serialize, Deserialize)]
pub struct Chf {
    //these first two might be wrong but they also sorta make sense
    #[deku(assert_eq = "2")]
    pub female_version: u32,

    #[deku(assert_eq = "7")]
    pub male_version: u32,

    //tag ids for male and female
    #[deku(assert = "[
            CigGuid::parse_str(\"25f439d5-146b-4a61-a999-a486dfb68a49\"),
            CigGuid::parse_str(\"d0794a94-efb0-4cad-ad38-2558b4d3c253\")
        ].contains(&body_type_id)")]
    pub body_type_id: CigGuid,

    #[deku(assert = "zero_id.is_empty()")]
    pub zero_id: CigGuid,

    pub dna: Dna,

    #[deku(update = "self.itemport.total_count() + 1")]
    pub total_itemport_count: u64,
    pub itemport: ItemPort,

    #[deku(assert_eq = "5")]
    pub materials_five: u32,
    #[deku(read_all)]
    pub materials: Vec<MaterialDefinition>,
}

#[derive(Debug, DekuRead, DekuWrite)]
pub struct ChfContainer {
    #[deku(assert_eq = "0x4242")]
    pub magic: u16,

    pub magic2: u16,

    pub crc32c: u32,

    pub compressed_size: u32,

    pub decompressed_size: u32,

    #[deku(count = "compressed_size")]
    pub data: Vec<u8>,

    #[deku(read_all)]
    pub rest: Vec<u8>,
}
