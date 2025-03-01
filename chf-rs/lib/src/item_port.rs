use deku::{DekuRead, DekuWrite};
use serde::{Deserialize, Serialize};

use crate::{cig_guid::CigGuid, hash::Hash};

#[derive(Debug, DekuRead, DekuWrite, Serialize, Deserialize)]
pub struct ItemPort {
    #[deku(assert = "[
        Hash::from_str(b\"beard_itemport\"),
        Hash::from_str(b\"body_itemport\"),
        Hash::from_str(b\"eyebrow_itemport\"),
        Hash::from_str(b\"eyelashes_itemport\"),
        Hash::from_str(b\"eyes_itemport\"),
        Hash::from_str(b\"hair_itemport\"),
        Hash::from_str(b\"head_itemport\"),
        Hash::from_str(b\"material_variant\"),
        Hash::from_str(b\"piercings_eyebrows_itemport\"),
        Hash::from_str(b\"piercings_l_ear_itemport\"),
        Hash::from_str(b\"piercings_mouth_itemport\"),
        Hash::from_str(b\"piercings_nose_itemport\"),
        Hash::from_str(b\"piercings_r_ear_itemport\"),
        Hash::from_str(b\"stubble_itemport\"),
        Hash::from_str(b\"universal_scalp_itemport\"),
    ].contains(&itemport_hash)")]
    pub itemport_hash: Hash,

    #[deku(assert = "!id.is_empty()")]
    pub id: CigGuid,

    #[deku(assert = "*child_count < 16")]
    pub child_count: u32,

    //the last itemport in a list *always* has a non-zero port_count2. All others have 0. Why?
    pub item_port_count_2: u32,

    #[deku(count = "child_count")]
    pub children: Vec<ItemPort>,
}

impl ItemPort {
    pub fn total_count(&self) -> u32 {
        self.child_count + self.children.iter().map(|x| x.total_count()).sum::<u32>()
    }
}
