use crate::hash::Hash;
use crate::{cig_guid::CigGuid, color::Color};
use deku::prelude::*;
use deku::{DekuRead, DekuWrite};
use serde::{Deserialize, Serialize};

#[derive(Debug, DekuRead, DekuWrite, Serialize, Deserialize)]
pub struct Texture {
    #[deku(assert_eq = "0")]
    pub zero: u32,

    #[deku(assert = "*tex_index < 15")]
    pub tex_index: u8,

    //from CustomMaterialsLookupTable datacore 88b8d555-9b48-4a0a-b814-dcad9a2ee573
    #[deku(assert = "[
        CigGuid::parse_str(\"00000000-0000-0000-0000-000000000000\"),
        CigGuid::parse_str(\"02441de3-0e7e-417b-934f-48c085c54c1e\"),
        CigGuid::parse_str(\"13cfead6-5662-4dea-995a-5e3f42460e20\"),
        CigGuid::parse_str(\"229a46c9-b9e5-4da2-875e-8f007642e52c\"),
        CigGuid::parse_str(\"2bc80f35-18ea-4522-b3dc-6b4ee2814fe7\"),
        CigGuid::parse_str(\"2d8cdf2c-5e5b-482f-ab7c-67e56e2115ae\"),
        CigGuid::parse_str(\"318114ee-f184-42f5-86cb-19a321bcb513\"),
        CigGuid::parse_str(\"34e882d0-ae6b-4747-acf1-0a86ef8a64bb\"),
        CigGuid::parse_str(\"35879afc-1855-43f2-9eed-98ad6ed9da45\"),
        CigGuid::parse_str(\"3ea0b7c5-600a-45a8-a9f5-c51b1b14ddca\"),
        CigGuid::parse_str(\"438aa947-2c7b-41ea-86a9-71046ca59037\"),
        CigGuid::parse_str(\"47f5756e-e348-471f-a2e9-36b864b5b6f9\"),
        CigGuid::parse_str(\"51ae4f21-7479-42e1-8139-43338f65287e\"),
        CigGuid::parse_str(\"521a1b21-8bb7-44ef-91b5-74d9a3f0cf1b\"),
        CigGuid::parse_str(\"57fe3106-b5be-437f-b959-edca37c99557\"),
        CigGuid::parse_str(\"5cd7bfb4-1952-436b-aec4-569713d450ec\"),
        CigGuid::parse_str(\"5f213adc-04e0-44c4-bd5a-fb6a07022c70\"),
        CigGuid::parse_str(\"63d0a0c7-924e-4274-af62-765d4ca4d2b4\"),
        CigGuid::parse_str(\"72da09ab-ba4a-4926-bc84-963d8f4d1357\"),
        CigGuid::parse_str(\"75f4bbf1-2467-4114-9aec-8b3669e154af\"),
        CigGuid::parse_str(\"78ea55e9-4ae0-4ac5-acc9-4852e5616dba\"),
        CigGuid::parse_str(\"8232777c-e50d-4185-84ca-d03e56df524e\"),
        CigGuid::parse_str(\"846d7afe-2725-47ff-a4b0-c6bdb0aaeade\"),
        CigGuid::parse_str(\"877f2426-ad71-48ca-85fd-6e2583d42d55\"),
        CigGuid::parse_str(\"8f19d3cd-2bf4-45ec-8189-7780a82c6e48\"),
        CigGuid::parse_str(\"9254513e-8996-4ffb-84f0-7eb6162dddf5\"),
        CigGuid::parse_str(\"9b14d101-e205-454a-b3bc-22314f694572\"),
        CigGuid::parse_str(\"a5318796-9a0e-4ae5-bc7f-735c7b7461ec\"),
        CigGuid::parse_str(\"a817c68e-8a9b-4887-b8be-1760a2a42b4d\"),
        CigGuid::parse_str(\"b5e53e65-bd4a-4f50-bcd1-843ce5fc231b\"),
        CigGuid::parse_str(\"b643f3b3-21bc-4f44-95e5-0de140fd7954\"),
        CigGuid::parse_str(\"bac3113a-9239-4e41-84b9-b8206d7dd1af\"),
        CigGuid::parse_str(\"c2b7ed00-5907-4f10-8d3c-9386035776ca\"),
        CigGuid::parse_str(\"d07ec343-f682-44f7-bea2-7c9af50a3d78\"),
        CigGuid::parse_str(\"db723134-9142-43c1-84c0-ace36c176135\"),
        CigGuid::parse_str(\"dc333502-fee2-40e4-881d-b60820d297e2\"),
        CigGuid::parse_str(\"df9c7e8f-10c9-41dc-a454-e452caed94ab\"),
        CigGuid::parse_str(\"e2c796d1-4e9e-46c1-b784-dec18cfd0c71\"),
        CigGuid::parse_str(\"f42b84af-0eb6-412c-a66c-1807ba0f596c\"),
    ].contains(&tex_id)")]
    pub tex_id: CigGuid,
}

#[derive(Debug, DekuRead, DekuWrite, Serialize, Deserialize)]
pub struct HashedValue<T>
where
    T: for<'a> DekuReader<'a> + DekuWriter,
{
    #[deku(assert = "[
        Hash::from_str(b\"BaseMelanin\"),
        Hash::from_str(b\"BaseMelaninRedness\"),
        Hash::from_str(b\"BaseMelaninVariation\"),
        Hash::from_str(b\"DyeAmount\"),
        Hash::from_str(b\"DyeFadeout\"),
        Hash::from_str(b\"DyePigmentVariation\"),
        Hash::from_str(b\"DyeShift\"),
        Hash::from_str(b\"FrecklesAmount\"),
        Hash::from_str(b\"FrecklesOpacity\"),
        Hash::from_str(b\"Makeup1MetalnessB\"),
        Hash::from_str(b\"Makeup1MetalnessG\"),
        Hash::from_str(b\"Makeup1MetalnessR\"),
        Hash::from_str(b\"Makeup1NumTilesU\"),
        Hash::from_str(b\"Makeup1NumTilesV\"),
        Hash::from_str(b\"Makeup1OffsetU\"),
        Hash::from_str(b\"Makeup1OffsetV\"),
        Hash::from_str(b\"Makeup1Opacity\"),
        Hash::from_str(b\"Makeup1SmoothnessB\"),
        Hash::from_str(b\"Makeup1SmoothnessG\"),
        Hash::from_str(b\"Makeup1SmoothnessR\"),
        Hash::from_str(b\"Makeup2MetalnessB\"),
        Hash::from_str(b\"Makeup2MetalnessG\"),
        Hash::from_str(b\"Makeup2MetalnessR\"),
        Hash::from_str(b\"Makeup2NumTilesU\"),
        Hash::from_str(b\"Makeup2NumTilesV\"),
        Hash::from_str(b\"Makeup2OffsetU\"),
        Hash::from_str(b\"Makeup2OffsetV\"),
        Hash::from_str(b\"Makeup2Opacity\"),
        Hash::from_str(b\"Makeup2SmoothnessB\"),
        Hash::from_str(b\"Makeup2SmoothnessG\"),
        Hash::from_str(b\"Makeup2SmoothnessR\"),
        Hash::from_str(b\"Makeup3MetalnessB\"),
        Hash::from_str(b\"Makeup3MetalnessG\"),
        Hash::from_str(b\"Makeup3MetalnessR\"),
        Hash::from_str(b\"Makeup3NumTilesU\"),
        Hash::from_str(b\"Makeup3NumTilesV\"),
        Hash::from_str(b\"Makeup3OffsetU\"),
        Hash::from_str(b\"Makeup3OffsetV\"),
        Hash::from_str(b\"Makeup3Opacity\"),
        Hash::from_str(b\"Makeup3SmoothnessB\"),
        Hash::from_str(b\"Makeup3SmoothnessG\"),
        Hash::from_str(b\"Makeup3SmoothnessR\"),
        Hash::from_str(b\"SunSpotsAmount\"),
        Hash::from_str(b\"SunSpotsOpacity\"),
        Hash::from_str(b\"TattooAge\"),
        Hash::from_str(b\"TattooHueRotation\"),

        //I haven't decoded these exact strings yet
        
        //limb/body/head color
        Hash(0xbd530797),

        //eye makeup color 1
        Hash(0xb29b1d90),
        //eye makeup color 2
        Hash(0xe3230e2f),
        //eye makeup color 3
        Hash(0x2ec0e736),

        //cheek makeup color 1
        Hash(0x1a081a93),
        //cheek makeup color 2
        Hash(0x4bb0092c),
        //cheek makeup color 3
        Hash(0x8653e035),

        //lip makeup color 1
        Hash(0x7d86e792),
        //lip makeup color 2
        Hash(0x2c3ef42d),
        //lip makeup color 3
        Hash(0xe1dd1d34),

        //eye color
        Hash(0x442a34ac),

        //hair dye color 1?
        Hash(0x15e90814),
        //hair dye color 2?
        Hash(0xa2c7c909),
    ].contains(&value_hash)")]
    pub value_hash: Hash,

    //sometimes a float, sometimes a u32, sometimes a color. Always 4 bytes.
    pub value: T,

    #[deku(assert_eq = "0")]
    pub zero: u32,
}

#[derive(Debug, DekuRead, DekuWrite, Serialize, Deserialize)]
pub struct SubMaterial {
    #[deku(assert = "[
        Hash::from_str(b\"body_m\"),
        Hash::from_str(b\"f_limbs_m\"),
        Hash::from_str(b\"f_torso_m\"),
        Hash::from_str(b\"female23\"),
        Hash::from_str(b\"female26\"),
        Hash::from_str(b\"female27\"),
        Hash::from_str(b\"limbs_m\"),
        Hash::from_str(b\"shader_eyeinner\"),
        Hash::from_str(b\"shader_eyeInner\"),
        Hash::from_str(b\"shader_head\"),
        Hash::from_str(b\"shader_Head\"),

        //I haven't decoded these exact strings yet
        Hash(0x28876b0a),
        Hash(0x9f37ad63),
        Hash(0x1f1fad17),
        Hash(0x9b589c4f),
        Hash(0xb6f6d03c),
        Hash(0xfa705fc6),
        Hash(0x0565af12),
        Hash(0x0e6ba1fa),
        Hash(0x13170b02),
        Hash(0x4a0afd1f),
        Hash(0x8792319b),
        Hash(0x9bbb0b08),
        Hash(0xacd061c3),
        Hash(0xbf58c51f),
        Hash(0xcef2e8fa),
        Hash(0xd51cd1d5),
        Hash(0x5c78590f),
        Hash(0x67982e62),
        Hash(0xbe8f0b08),
        Hash(0x2c6279e6),
        Hash(0x4e865b74),
        Hash(0x316b6e4c),
        Hash(0x0d4b6954),
        Hash(0x3a763f1d),
        Hash(0x1ee9f123),
        Hash(0x750bd91b),
        Hash(0x94c2c26f),
        Hash(0xf89ee51a),
        Hash(0xa0d70175),
        Hash(0xec827220),
        Hash(0x741d659e),
        Hash(0x01e90979),
        Hash(0x411e1a01),
        Hash(0x53aa3ef3),
        Hash(0x66a9416c),
        Hash(0x75196d10),
        Hash(0x87605a18),
        Hash(0xd865dab9),
        Hash(0xebc7c90a),
        Hash(0x4008a684),
        Hash(0x40facd07),
        Hash(0x8676e69d),
        Hash(0x2a0e59ba),
        Hash(0x41ec7182),
        Hash(0x665b2aef),
        Hash(0x674d966a),
        Hash(0x95261569),
        Hash(0xa1c1bdf0),
        Hash(0xb2632587),
        Hash(0xb387f281),
        Hash(0xff20ea57),
        Hash(0x282320b0),
        Hash(0xa133d673),
        Hash(0xb2914e04),
        Hash(0x53585570),
        Hash(0x3b73d344),
        Hash(0xa7de6f2b),
        Hash(0xd32e0b42),
        Hash(0xb9058eb0),
        Hash(0xe8b13d26),
        Hash(0xfce9445b),
        Hash(0xfa9e8012),
        Hash(0x937b0d41),
        Hash(0x0e82c758),
        Hash(0xda48a3b3),
        Hash(0x9430a9ec),
        Hash(0x9c41594f),
    ].contains(&submaterial_hash)")]
    pub submaterial_hash: Hash,

    #[deku(update = "self.textures.len() as u32")]
    pub texture_count: u32,
    #[deku(count = "texture_count")]
    pub textures: Vec<Texture>,

    #[deku(update = "self.material_params.len() as u32")]
    pub material_param_count: u64,
    #[deku(count = "material_param_count")]
    pub material_params: Vec<HashedValue<f32>>,

    #[deku(update = "self.material_colors.len() as u64")]
    pub material_color_count: u64,
    #[deku(count = "material_color_count")]
    pub material_colors: Vec<HashedValue<Color>>,

    #[deku(cond = "!deku::reader.end()")]
    pub submat_five: Option<u32>,
}

#[derive(Debug, DekuRead, DekuWrite, Serialize, Deserialize)]
pub struct MaterialDefinition {
    #[deku(assert = "[
        //I haven't decoded these
        Hash(0xa98beb34),//head material?
        Hash(0x6c836947),//hair dye material?
        Hash(0x078ac8bd),//eyebrow dye material?
        Hash(0xa047885e),//eye material?
        Hash(0x9b274d93),//beard dye material?
        Hash(0x27424d58),//body material?
        Hash(0xa8770416),//dye??
    ].contains(&material_hash)")]
    pub material_hash: Hash,

    //from CustomMaterialsLookupTable datacore 88b8d555-9b48-4a0a-b814-dcad9a2ee573
    #[deku(assert = "[
        CigGuid::parse_str(\"00000000-0000-0000-0000-000000000000\"),
        CigGuid::parse_str(\"003367a7-9873-4a8f-9a27-9b8def193b43\"),
        CigGuid::parse_str(\"01cc7def-56e2-4409-a01d-6e9ab2f9e8d5\"),
        CigGuid::parse_str(\"023bd1d1-6700-4889-b235-d3254db0cec1\"),
        CigGuid::parse_str(\"06b5872c-214b-4f2c-ae64-60ee0f8349b4\"),
        CigGuid::parse_str(\"080a30ca-406e-4a96-b8fe-c7a2a9401351\"),
        CigGuid::parse_str(\"10fe0e67-2581-4153-b629-f3fa38c196b8\"),
        CigGuid::parse_str(\"12da06e9-7c60-466d-af80-ddc176a974d3\"),
        CigGuid::parse_str(\"19f31c9d-7096-4fdb-9167-71188e892930\"),
        CigGuid::parse_str(\"1d33cab4-50bf-4e7d-8c75-ef56e5e8a1b1\"),
        CigGuid::parse_str(\"2332cd8d-cccc-4623-ade6-bacd2805a831\"),
        CigGuid::parse_str(\"23795209-f1c8-42f3-8f93-5eee45c3ea34\"),
        CigGuid::parse_str(\"24c9f393-3240-4bd3-a13a-078abd68375b\"),
        CigGuid::parse_str(\"2681d02b-7755-4658-a5b5-eb491054a9c6\"),
        CigGuid::parse_str(\"279e7c54-cffc-45e2-b96f-40d51a558cbb\"),
        CigGuid::parse_str(\"2b23bbfa-aa4b-47e9-9bc8-2af7a2fc39ba\"),
        CigGuid::parse_str(\"2cdd4ddc-fa9b-412a-8887-1e39954d2a94\"),
        CigGuid::parse_str(\"2fcd7cc1-a46d-4065-84ba-bfabf9d567ce\"),
        CigGuid::parse_str(\"34088039-e59b-4903-a044-805e316d6142\"),
        CigGuid::parse_str(\"35b1f87f-14e7-4ece-acf0-6d8d436941b9\"),
        CigGuid::parse_str(\"36cb2a29-f371-44da-a966-af8ecfd32468\"),
        CigGuid::parse_str(\"38219031-5c5a-4d44-9cb1-da8bdc0f2089\"),
        CigGuid::parse_str(\"402e5561-b1e6-461e-8c90-5d0765e7fef7\"),
        CigGuid::parse_str(\"408f44d7-6b1e-4cf8-8bac-9a25b4064678\"),
        CigGuid::parse_str(\"40dcb796-d128-4a8f-ac8a-493da9d91269\"),
        CigGuid::parse_str(\"4188d34d-f1cf-47ad-b67d-1280304ded3d\"),
        CigGuid::parse_str(\"4683a896-9b15-4274-8fbe-4488199dd594\"),
        CigGuid::parse_str(\"4f79d0fb-389f-48c5-ba3b-9f290b8b4dc2\"),
        CigGuid::parse_str(\"538ab6c3-8bb6-4768-9ad1-cc6387e9c65f\"),
        CigGuid::parse_str(\"54a23d77-e1e6-49c6-942f-889e64be9768\"),
        CigGuid::parse_str(\"56a74d40-a638-477a-8fb5-615b9e9188ea\"),
        CigGuid::parse_str(\"5c4eda2d-1f2f-4f54-83d7-08ff4c89cbc7\"),
        CigGuid::parse_str(\"5d629e70-ff2f-4fc8-829c-b989f5494d4d\"),
        CigGuid::parse_str(\"6593ef6e-f7e1-4369-a9fc-ba79883b5413\"),
        CigGuid::parse_str(\"6739da5b-8d22-4114-acc1-4f333f983101\"),
        CigGuid::parse_str(\"6791f2ac-001a-4c7b-8910-e4b185a4c2ec\"),
        CigGuid::parse_str(\"67976d52-3c13-479d-bc36-fd09adddf6fc\"),
        CigGuid::parse_str(\"687f90a6-8041-41c5-8ce5-cb61063bc7ea\"),
        CigGuid::parse_str(\"6a210e9c-ab0c-4873-a5cb-ee5e7348c2a5\"),
        CigGuid::parse_str(\"6a7a8295-f9e4-4d98-82aa-7443adc3c6e2\"),
        CigGuid::parse_str(\"6aabb5fd-6bc5-4331-ad7d-e0d98f633ecc\"),
        CigGuid::parse_str(\"6bf5cf88-c6bf-44ec-8e98-fd513c588886\"),
        CigGuid::parse_str(\"6d27a39d-1388-4e58-af33-e284af5633d2\"),
        CigGuid::parse_str(\"6d816778-5a2c-4fbc-8805-82922c40edd6\"),
        CigGuid::parse_str(\"70b829c0-113b-4939-ae58-bed999b9b0d0\"),
        CigGuid::parse_str(\"74c68210-0bc6-42c4-9992-29ff6aa54349\"),
        CigGuid::parse_str(\"75f7b437-77fe-4533-8ba4-12075f63b164\"),
        CigGuid::parse_str(\"760cdbe1-63b6-4102-9546-7f68aea6a301\"),
        CigGuid::parse_str(\"79adf215-136a-4fc5-9dd7-9e03879e3bd8\"),
        CigGuid::parse_str(\"7e033967-fa65-423e-ba74-af2e810e4cac\"),
        CigGuid::parse_str(\"85c55bfd-d554-409e-bc78-00e8dfc95b91\"),
        CigGuid::parse_str(\"87ac8d39-cc04-4c1b-954c-3b9467c0dee2\"),
        CigGuid::parse_str(\"8849b7a9-7678-4314-bc54-b565f7a1eb87\"),
        CigGuid::parse_str(\"8a3f884e-4cbf-4c49-a64d-3170e95e54b8\"),
        CigGuid::parse_str(\"8b8b96d6-18fc-4f72-89dd-e54e1e38e76e\"),
        CigGuid::parse_str(\"8df401c4-832f-4864-9ecd-e1977b1fa17a\"),
        CigGuid::parse_str(\"94c22936-a30f-4fd7-a29e-6e19df5f082b\"),
        CigGuid::parse_str(\"978da3f6-ec48-4ce2-b77d-fef670fc3a5a\"),
        CigGuid::parse_str(\"983f7a30-0528-409a-9e33-1eb81a65f0e6\"),
        CigGuid::parse_str(\"98709361-7de9-4c1e-9f5a-df9be994e5b7\"),
        CigGuid::parse_str(\"9a66730e-512e-4d21-8ba3-d3ce2c3ebfe6\"),
        CigGuid::parse_str(\"9c55cd1d-b397-4886-b1a4-bc38575916fd\"),
        CigGuid::parse_str(\"9c6a7a36-f952-4cdc-8264-c9b83393ee2e\"),
        CigGuid::parse_str(\"a15d9f5a-8bea-414f-ba21-03eabdb75d36\"),
        CigGuid::parse_str(\"a65ec4c6-bd5d-4d6b-a51e-fd7b087d3c8d\"),
        CigGuid::parse_str(\"a69f3e86-e65f-4dca-bd39-27cb33fecc06\"),
        CigGuid::parse_str(\"aa8cb288-e754-446a-b8f0-98107ad9914e\"),
        CigGuid::parse_str(\"adf66aaf-7224-4010-a47e-17ecdc79bbbd\"),
        CigGuid::parse_str(\"b05b1fc8-34e3-43e2-b676-b66546954eba\"),
        CigGuid::parse_str(\"b33f4298-2510-4ba6-bb40-9573c059dea4\"),
        CigGuid::parse_str(\"ba23de00-dc5d-4a51-92df-6952921022e3\"),
        CigGuid::parse_str(\"bc56197f-ec97-43fb-b047-aaf51c8eb3b6\"),
        CigGuid::parse_str(\"bd4a9a29-c3bf-4f2a-afe4-a0b886d43f97\"),
        CigGuid::parse_str(\"c1251ef7-9f4d-44e5-8f7b-e92178c18ae3\"),
        CigGuid::parse_str(\"c5b4f677-be97-4827-95b0-ffcef7b77ba8\"),
        CigGuid::parse_str(\"cd093f80-e17f-4060-aad3-e261922b94a3\"),
        CigGuid::parse_str(\"d13c6164-f2c5-482f-bc24-5c2aaa81e742\"),
        CigGuid::parse_str(\"d380a9f6-0da1-4c27-8715-0eab669da54d\"),
        CigGuid::parse_str(\"d52978c5-c999-41a6-80dc-571770fc5b57\"),
        CigGuid::parse_str(\"d6d4ce68-e06e-4764-a073-fda97679b1a3\"),
        CigGuid::parse_str(\"d9c34b15-40cd-49b1-84bb-a6161bfa5240\"),
        CigGuid::parse_str(\"dcff8cf5-2121-4130-8ca7-5d3d438fc1b2\"),
        CigGuid::parse_str(\"dd4ebd70-cd6d-4b8f-8fb1-7c1777e135f1\"),
        CigGuid::parse_str(\"e186048a-9a81-47b3-828e-71e957c65762\"),
        CigGuid::parse_str(\"e2c5df62-4712-4fec-bbdc-4828da4ffd6f\"),
        CigGuid::parse_str(\"e6cb61c7-7740-46b9-9f9c-fd5eb3498e75\"),
        CigGuid::parse_str(\"e76ed31e-9ef4-4fe0-8a46-2c3ed8c6ab1b\"),
        CigGuid::parse_str(\"eac6b3ed-e516-482c-8967-5fe777765522\"),
        CigGuid::parse_str(\"ede6e28a-1f44-402b-8b8f-8eb5174f887f\"),
        CigGuid::parse_str(\"f0153262-588d-4ae8-8c06-53bf98cf80a5\"),
        CigGuid::parse_str(\"f1f761d6-4fc9-4864-acb2-5d42b9bf3f53\"),
        CigGuid::parse_str(\"f4cf9292-3810-4eda-a88e-9e52c7865d48\"),
        CigGuid::parse_str(\"fa5042a3-8568-48f5-bf36-02dc98191b2d\"),
        CigGuid::parse_str(\"fd432f05-e731-4a53-a92b-7eaf4c7ceb66\"),
        CigGuid::parse_str(\"ff29c41b-e213-4000-acdc-35209581c0a4\"),
    ].contains(&material_id)")]
    pub material_id: CigGuid,

    pub mtl_flags_maybe: u32,

    #[deku(assert = "empty_guid.is_empty()")]
    pub empty_guid: CigGuid,

    #[deku(update = "self.sub_materials.len() as u32")]
    pub sub_material_count: u32,

    #[deku(assert_eq = "5")]
    pub five: u32,

    #[deku(count = "sub_material_count")]
    pub sub_materials: Vec<SubMaterial>,
}
