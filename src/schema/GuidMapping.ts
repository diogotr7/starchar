export function getBodyType(guid: string): "male" | "female" {
  const bodyType = Object.entries(bodyTypeMapping).find(
    ([_, value]) => value === guid
  )?.[0] as keyof typeof bodyTypeMapping;

  if (!bodyType) throw new Error(`Unknown Body Type`);

  return bodyType;
}

export const bodyTypeMapping = {
  male: "25f439d5-146b-4a61-a999-a486dfb68a49",
  female: "d0794a94-efb0-4cad-ad38-2558b4d3c253",
} as const;

//body
export const bodyItemPortGuid = "dbaa8a7d-755f-4104-8b24-7b58fd1e76f6";

export const materialGuids = [
  {
    guid: "fa5042a3-8568-48f5-bf36-02dc98191b2d",
    filePath:
      "Objects/Characters/Human/male_v7/body/m_body_character_customizer.mtl",
  },
  {
    guid: "f0153262-588d-4ae8-8c06-53bf98cf80a5",
    filePath:
      "Objects/Characters/Human/female_v2/body/f_body_character_customizer.mtl",
  },
  {
    guid: "bc56197f-ec97-43fb-b047-aaf51c8eb3b6",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male01/male01_t2_head_material.mtl",
  },
  {
    guid: "2fcd7cc1-a46d-4065-84ba-bfabf9d567ce",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male02/male02_t2_head_material.mtl",
  },
  {
    guid: "f4cf9292-3810-4eda-a88e-9e52c7865d48",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male03/male03_t2_head_material.mtl",
  },
  {
    guid: "9c55cd1d-b397-4886-b1a4-bc38575916fd",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male04/male04_t2_head_material.mtl",
  },
  {
    guid: "d9c34b15-40cd-49b1-84bb-a6161bfa5240",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male05/male05_t2_head_material.mtl",
  },
  {
    guid: "538ab6c3-8bb6-4768-9ad1-cc6387e9c65f",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male06/male06_t2_head_material.mtl",
  },
  {
    guid: "e6cb61c7-7740-46b9-9f9c-fd5eb3498e75",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male07/male07_t2_head_material.mtl",
  },
  {
    guid: "e76ed31e-9ef4-4fe0-8a46-2c3ed8c6ab1b",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male08/male08_t2_head_material.mtl",
  },
  {
    guid: "1d33cab4-50bf-4e7d-8c75-ef56e5e8a1b1",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male09/male09_t1_head_material.mtl",
  },
  {
    guid: "8a3f884e-4cbf-4c49-a64d-3170e95e54b8",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male10/male10_t2_head_material.mtl",
  },
  {
    guid: "6a7a8295-f9e4-4d98-82aa-7443adc3c6e2",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male10/male10_t2_head_material.mtl",
  },
  {
    guid: "9a66730e-512e-4d21-8ba3-d3ce2c3ebfe6",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male11/male11_t2_head_material.mtl",
  },
  {
    guid: "003367a7-9873-4a8f-9a27-9b8def193b43",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male12/male12_t2_head_material.mtl",
  },
  {
    guid: "7e033967-fa65-423e-ba74-af2e810e4cac",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male13/male13_t1_head_material.mtl",
  },
  {
    guid: "38219031-5c5a-4d44-9cb1-da8bdc0f2089",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male14/male14_t1_head_material.mtl",
  },
  {
    guid: "4f79d0fb-389f-48c5-ba3b-9f290b8b4dc2",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male15/male15_t2_head_material.mtl",
  },
  {
    guid: "d380a9f6-0da1-4c27-8715-0eab669da54d",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male16/male16_t1_head_material.mtl",
  },
  {
    guid: "adf66aaf-7224-4010-a47e-17ecdc79bbbd",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male17/male17_t1_head_material.mtl",
  },
  {
    guid: "b33f4298-2510-4ba6-bb40-9573c059dea4",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male18/male18_t1_head_material.mtl",
  },
  {
    guid: "6a210e9c-ab0c-4873-a5cb-ee5e7348c2a5",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male19/male19_t1_head_material.mtl",
  },
  {
    guid: "54a23d77-e1e6-49c6-942f-889e64be9768",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male20/male20_t1_head_material.mtl",
  },
  {
    guid: "56a74d40-a638-477a-8fb5-615b9e9188ea",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male21/male21_t1_head_material.mtl",
  },
  {
    guid: "2681d02b-7755-4658-a5b5-eb491054a9c6",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male22/male22_t1_head_material.mtl",
  },
  {
    guid: "687f90a6-8041-41c5-8ce5-cb61063bc7ea",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male23/male23_t1_head_material.mtl",
  },
  {
    guid: "080a30ca-406e-4a96-b8fe-c7a2a9401351",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male24/male24_t1_head_material.mtl",
  },
  {
    guid: "8df401c4-832f-4864-9ecd-e1977b1fa17a",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male25/male25_t1_head_material.mtl",
  },
  {
    guid: "75f7b437-77fe-4533-8ba4-12075f63b164",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male26/male26_t1_head_material.mtl",
  },
  {
    guid: "74c68210-0bc6-42c4-9992-29ff6aa54349",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male27/male27_t1_head_material.mtl",
  },
  {
    guid: "4188d34d-f1cf-47ad-b67d-1280304ded3d",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male28/male28_t1_head_material.mtl",
  },
  {
    guid: "c1251ef7-9f4d-44e5-8f7b-e92178c18ae3",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male29/male29_t1_head_material.mtl",
  },
  {
    guid: "6d816778-5a2c-4fbc-8805-82922c40edd6",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male30/male30_t1_head_material.mtl",
  },
  {
    guid: "a69f3e86-e65f-4dca-bd39-27cb33fecc06",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male31/male31_t1_head_material.mtl",
  },
  {
    guid: "fd432f05-e731-4a53-a92b-7eaf4c7ceb66",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male32/male32_t1_head_material.mtl",
  },
  {
    guid: "70b829c0-113b-4939-ae58-bed999b9b0d0",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male33/male33_t1_head_material.mtl",
  },
  {
    guid: "bd4a9a29-c3bf-4f2a-afe4-a0b886d43f97",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male34/male34_t1_head_material.mtl",
  },
  {
    guid: "e2c5df62-4712-4fec-bbdc-4828da4ffd6f",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male35/male35_t1_head_material.mtl",
  },
  {
    guid: "34088039-e59b-4903-a044-805e316d6142",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male36/male36_t1_head_material.mtl",
  },
  {
    guid: "67976d52-3c13-479d-bc36-fd09adddf6fc",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male37/male37_t1_head_material.mtl",
  },
  {
    guid: "eac6b3ed-e516-482c-8967-5fe777765522",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male38/male38_t1_head_material.mtl",
  },
  {
    guid: "8b8b96d6-18fc-4f72-89dd-e54e1e38e76e",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male39/male39_t1_head_material.mtl",
  },
  {
    guid: "6593ef6e-f7e1-4369-a9fc-ba79883b5413",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male40/male40_t1_head_material.mtl",
  },
  {
    guid: "d52978c5-c999-41a6-80dc-571770fc5b57",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male41/male41_t1_head_material.mtl",
  },
  {
    guid: "06b5872c-214b-4f2c-ae64-60ee0f8349b4",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male42/male42_t1_head_material.mtl",
  },
  {
    guid: "2332cd8d-cccc-4623-ade6-bacd2805a831",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male43/male43_t1_head_material.mtl",
  },
  {
    guid: "10fe0e67-2581-4153-b629-f3fa38c196b8",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male44/male44_t1_head_material.mtl",
  },
  {
    guid: "4683a896-9b15-4274-8fbe-4488199dd594",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male45/male45_t1_head_material.mtl",
  },
  {
    guid: "94c22936-a30f-4fd7-a29e-6e19df5f082b",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male46/male46_t1_head_material.mtl",
  },
  {
    guid: "978da3f6-ec48-4ce2-b77d-fef670fc3a5a",
    filePath:
      "Objects/Characters/Human/heads/male/npc/male47/male47_t1_head_material.mtl",
  },
  {
    guid: "6bf5cf88-c6bf-44ec-8e98-fd513c588886",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female01/female01_t2_head_material.mtl",
  },
  {
    guid: "023bd1d1-6700-4889-b235-d3254db0cec1",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female02/female02_t2_head_material.mtl",
  },
  {
    guid: "23795209-f1c8-42f3-8f93-5eee45c3ea34",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female03/female03_t2_head_material.mtl",
  },
  {
    guid: "aa8cb288-e754-446a-b8f0-98107ad9914e",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female04/female04_t2_head_material.mtl",
  },
  {
    guid: "9c6a7a36-f952-4cdc-8264-c9b83393ee2e",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female05/female05_t2_head_material.mtl",
  },
  {
    guid: "2b23bbfa-aa4b-47e9-9bc8-2af7a2fc39ba",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female06/female06_t2_head_material.mtl",
  },
  {
    guid: "c5b4f677-be97-4827-95b0-ffcef7b77ba8",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female07/female07_t2_head_material.mtl",
  },
  {
    guid: "6739da5b-8d22-4114-acc1-4f333f983101",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female08/female08_t2_head_material.mtl",
  },
  {
    guid: "983f7a30-0528-409a-9e33-1eb81a65f0e6",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female09/female09_t1_head_material.mtl",
  },
  {
    guid: "79adf215-136a-4fc5-9dd7-9e03879e3bd8",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female10/female10_t2_head_material.mtl",
  },
  {
    guid: "5d629e70-ff2f-4fc8-829c-b989f5494d4d",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female11/female11_t2_head_material.mtl",
  },
  {
    guid: "24c9f393-3240-4bd3-a13a-078abd68375b",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female12/female12_t2_head_material.mtl",
  },
  {
    guid: "35b1f87f-14e7-4ece-acf0-6d8d436941b9",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female13/female13_t2_head_material.mtl",
  },
  {
    guid: "e186048a-9a81-47b3-828e-71e957c65762",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female14/female14_t2_head_material.mtl",
  },
  {
    guid: "40dcb796-d128-4a8f-ac8a-493da9d91269",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female15/female15_t1_head_material.mtl",
  },
  {
    guid: "402e5561-b1e6-461e-8c90-5d0765e7fef7",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female16/female16_t1_head_material.mtl",
  },
  {
    guid: "36cb2a29-f371-44da-a966-af8ecfd32468",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female17/female17_t1_head_material.mtl",
  },
  {
    guid: "ff29c41b-e213-4000-acdc-35209581c0a4",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female18/female18_t1_head_material.mtl",
  },
  {
    guid: "a65ec4c6-bd5d-4d6b-a51e-fd7b087d3c8d",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female19/female19_t1_head_material.mtl",
  },
  {
    guid: "dcff8cf5-2121-4130-8ca7-5d3d438fc1b2",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female20/female20_t1_head_material.mtl",
  },
  {
    guid: "2cdd4ddc-fa9b-412a-8887-1e39954d2a94",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female21/female21_t1_head_material.mtl",
  },
  {
    guid: "dd4ebd70-cd6d-4b8f-8fb1-7c1777e135f1",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female22/female22_t1_head_material.mtl",
  },
  {
    guid: "8849b7a9-7678-4314-bc54-b565f7a1eb87",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female23/female23_t1_head_material.mtl",
  },
  {
    guid: "d6d4ce68-e06e-4764-a073-fda97679b1a3",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female24/female24_t1_head_material.mtl",
  },
  {
    guid: "85c55bfd-d554-409e-bc78-00e8dfc95b91",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female25/female25_t1_head_material.mtl",
  },
  {
    guid: "760cdbe1-63b6-4102-9546-7f68aea6a301",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female26/female26_t1_head_material.mtl",
  },
  {
    guid: "87ac8d39-cc04-4c1b-954c-3b9467c0dee2",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female27/female27_t1_head_material.mtl",
  },
  {
    guid: "b05b1fc8-34e3-43e2-b676-b66546954eba",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female28/female28_t1_head_material.mtl",
  },
  {
    guid: "a15d9f5a-8bea-414f-ba21-03eabdb75d36",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female29/female29_t1_head_material.mtl",
  },
  {
    guid: "12da06e9-7c60-466d-af80-ddc176a974d3",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female30/female30_t1_head_material.mtl",
  },
  {
    guid: "98709361-7de9-4c1e-9f5a-df9be994e5b7",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female31/female31_t1_head_material.mtl",
  },
  {
    guid: "d13c6164-f2c5-482f-bc24-5c2aaa81e742",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female32/female32_t1_head_material.mtl",
  },
  {
    guid: "01cc7def-56e2-4409-a01d-6e9ab2f9e8d5",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female33/female33_t1_head_material.mtl",
  },
  {
    guid: "279e7c54-cffc-45e2-b96f-40d51a558cbb",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female34/female34_t1_head_material.mtl",
  },
  {
    guid: "ba23de00-dc5d-4a51-92df-6952921022e3",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female35/female35_t1_head_material.mtl",
  },
  {
    guid: "6791f2ac-001a-4c7b-8910-e4b185a4c2ec",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female36/female36_t1_head_material.mtl",
  },
  {
    guid: "f1f761d6-4fc9-4864-acb2-5d42b9bf3f53",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female37/female37_t1_head_material.mtl",
  },
  {
    guid: "6aabb5fd-6bc5-4331-ad7d-e0d98f633ecc",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female38/female38_t1_head_material.mtl",
  },
  {
    guid: "5c4eda2d-1f2f-4f54-83d7-08ff4c89cbc7",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female39/female39_t1_head_material.mtl",
  },
  {
    guid: "19f31c9d-7096-4fdb-9167-71188e892930",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female40/female40_t1_head_material.mtl",
  },
  {
    guid: "6d27a39d-1388-4e58-af33-e284af5633d2",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female41/female41_t1_head_material.mtl",
  },
  {
    guid: "cd093f80-e17f-4060-aad3-e261922b94a3",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female42/female42_t1_head_material.mtl",
  },
  {
    guid: "408f44d7-6b1e-4cf8-8bac-9a25b4064678",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female43/female43_t1_head_material.mtl",
  },
  {
    guid: "ede6e28a-1f44-402b-8b8f-8eb5174f887f",
    filePath:
      "Objects/Characters/Human/heads/female/npc/female44/female44_t1_head_material.mtl",
  },
] as const;

export const textures = [
  {
    guid: "13cfead6-5662-4dea-995a-5e3f42460e20",
    filePath: "Objects/Characters/Human/heads/Blemish/Blemish_Mask_mask.tif",
  },
  {
    guid: "2d8cdf2c-5e5b-482f-ab7c-67e56e2115ae",
    filePath: "Objects/Characters/Human/heads/Blemish/Blemish_ID_mask.tif",
  },
  {
    guid: "b643f3b3-21bc-4f44-95e5-0de140fd7954",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_eyes_01.tif",
  },
  {
    guid: "229a46c9-b9e5-4da2-875e-8f007642e52c",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_eyes_02.tif",
  },
  {
    guid: "34e882d0-ae6b-4747-acf1-0a86ef8a64bb",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_eyes_03.tif",
  },
  {
    guid: "a817c68e-8a9b-4887-b8be-1760a2a42b4d",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_eyes_04.tif",
  },
  {
    guid: "438aa947-2c7b-41ea-86a9-71046ca59037",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_eyes_05.tif",
  },
  {
    guid: "b5e53e65-bd4a-4f50-bcd1-843ce5fc231b",
    filePath:
      "Objects/Characters/Human/heads/shared/makeup/makeup_foundation_01.tif",
  },
  {
    guid: "318114ee-f184-42f5-86cb-19a321bcb513",
    filePath:
      "Objects/Characters/Human/heads/shared/makeup/makeup_foundation_02.tif",
  },
  {
    guid: "9254513e-8996-4ffb-84f0-7eb6162dddf5",
    filePath:
      "Objects/Characters/Human/heads/shared/makeup/makeup_foundation_03.tif",
  },
  {
    guid: "846d7afe-2725-47ff-a4b0-c6bdb0aaeade",
    filePath:
      "Objects/Characters/Human/heads/shared/makeup/makeup_foundation_04.tif",
  },
  {
    guid: "8f19d3cd-2bf4-45ec-8189-7780a82c6e48",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_lips_01.tif",
  },
  {
    guid: "63d0a0c7-924e-4274-af62-765d4ca4d2b4",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_lips_02.tif",
  },
  {
    guid: "521a1b21-8bb7-44ef-91b5-74d9a3f0cf1b",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_lips_03.tif",
  },
  {
    guid: "5f213adc-04e0-44c4-bd5a-fb6a07022c70",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_lips_04.tif",
  },
  {
    guid: "db723134-9142-43c1-84c0-ace36c176135",
    filePath: "Objects/Characters/Human/heads/shared/makeup/makeup_lips_05.tif",
  },
  {
    guid: "8232777c-e50d-4185-84ca-d03e56df524e",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/libertas/tattoo_libertas_01_decal.tif",
  },
  {
    guid: "72da09ab-ba4a-4926-bc84-963d8f4d1357",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/cherry/tattoo_cherry_01_decal.tif",
  },
  {
    guid: "c2b7ed00-5907-4f10-8d3c-9386035776ca",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/flowers_01/tattoo_flowers_01_decal.tif",
  },
  {
    guid: "75f4bbf1-2467-4114-9aec-8b3669e154af",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/geometry/tattoo_geometry_01_decal.tif",
  },
  {
    guid: "57fe3106-b5be-437f-b959-edca37c99557",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/javelin/tattoo_javelin_01_decal.tif",
  },
  {
    guid: "d07ec343-f682-44f7-bea2-7c9af50a3d78",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/kopion_01/tattoo_kopion_01_decal.tif",
  },
  {
    guid: "2bc80f35-18ea-4522-b3dc-6b4ee2814fe7",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/kopion_02/tattoo_kopion_02_decal.tif",
  },
  {
    guid: "df9c7e8f-10c9-41dc-a454-e452caed94ab",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/marok/tattoo_marok_01_decal.tif",
  },
  {
    guid: "47f5756e-e348-471f-a2e9-36b864b5b6f9",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/organic_01/tattoo_organic_01_decal.tif",
  },
  {
    guid: "9b14d101-e205-454a-b3bc-22314f694572",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/ornemental/tattoo_ornemental_01_decal.tif",
  },
  {
    guid: "35879afc-1855-43f2-9eed-98ad6ed9da45",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/pico/tattoo_pico_01_decal.tif",
  },
  {
    guid: "51ae4f21-7479-42e1-8139-43338f65287e",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/piratecomic/tattoo_piratecomic_01_decal.tif",
  },
  {
    guid: "dc333502-fee2-40e4-881d-b60820d297e2",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/skullface/tattoo_skullface_01_decal.tif",
  },
  {
    guid: "a5318796-9a0e-4ae5-bc7f-735c7b7461ec",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/small_heart/tattoo_small_heart_01_decal.tif",
  },
  {
    guid: "bac3113a-9239-4e41-84b9-b8206d7dd1af",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/solarsystem/tattoo_solarsystem_01_decal.tif",
  },
  {
    guid: "5cd7bfb4-1952-436b-aec4-569713d450ec",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/spaceman/tattoo_spaceman_01_decal.tif",
  },
  {
    guid: "3ea0b7c5-600a-45a8-a9f5-c51b1b14ddca",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/stormwal/tattoo_stormwal_01_decal.tif",
  },
  {
    guid: "02441de3-0e7e-417b-934f-48c085c54c1e",
    filePath:
      "Objects/Characters/Human/heads/shared/tattoos/sc/vlk/tattoo_vlk_01_decal.tif",
  },
  {
    guid: "78ea55e9-4ae0-4ac5-acc9-4852e5616dba",
    filePath:
      "Objects/Characters/Human/heads/shared/makeup/makeup_blush_4x8_01.tif",
  },
  {
    guid: "f42b84af-0eb6-412c-a66c-1807ba0f596c",
    filePath:
      "Objects/Characters/Human/heads/shared/makeup/makeup_blush_4x8_02.tif",
  },
  {
    guid: "e2c796d1-4e9e-46c1-b784-dec18cfd0c71",
    filePath:
      "Objects/Characters/Human/heads/shared/makeup/makeup_blush_4x8_03.tif",
  },
  {
    guid: "877f2426-ad71-48ca-85fd-6e2583d42d55",
    filePath:
      "Objects/Characters/Human/heads/shared/makeup/makeup_blush_4x8_04.tif",
  },
] as const;

export const eyeBrowGuids = {
  "89ec0bbc-7daf-4b09-a98d-f8dd8df32305": "Brows01",
  "c40183e4-659c-4e4e-8f96-70b33a3b9d67": "Brows02",
  "6606176a-bfc4-4d24-a40a-b554fcfb8c7e": "Brows03",
  "41a65deb-4a4c-425c-8825-e6d264ecdd4b": "Brows04",
  "a074880a-6df2-4996-89e2-3e204a2790c2": "Brows05",
  "03270dfe-71be-45ee-b51a-fb1dd7e67ba1": "Brows06",
} as const;

export const eyeLashGuid = "6217c113-a448-443b-82aa-1bb108ba8e11";
export const eyeGuid = "6b4ca363-e160-4871-b709-e47467b40310";

export const beardGuids = {
  "3df7bdc3-ea80-47db-bbb7-8a6f28701c3e": "Beard01",
  "e6c2c999-3731-4163-9f1a-e37df9b9a267": "Beard02",
  "c9e19547-ba61-473f-b9b6-e5b8a14cb57e": "Beard03",
  "a55229ce-89bb-405c-a225-e507e7de07ef": "Beard04",
  "3545b83d-46c3-45d1-965a-3cfc15136ea3": "Beard05",
  "ffb50f1a-cf01-4275-8216-71df949a2a9c": "Beard06",
  "adc4a371-415f-4cbb-8873-569d4aec2b23": "Beard07",
  "6c77f900-4da0-4378-891a-387d4c2572d2": "Beard08",
  "15cc8f8d-2172-47d9-a94d-a7d504b9024d": "Beard09",
  "184e3d83-9a08-4a6a-afd0-311836cc760e": "Beard10",
  "59bb4f34-dd05-4f40-93f9-0161642598e0": "Beard11",
  "b075b2cf-16a4-4152-954b-02f9fdaf3ea5": "Beard12",
  "ee80bd3d-3b43-4ca3-b2de-e519efd4c9d7": "Beard13",
  "f3248be1-955f-429b-ab7b-9634a531e253": "Beard14",
  "e7eeecde-9633-481e-8b4c-f0e45a1a7e03": "Beard15",
  "34d313db-db6f-45b0-82d9-25ae51fa7df0": "Beard16",
  "2d459cc1-f95d-4baa-a118-cbc05bca9d97": "Beard17",
  "2dec0896-245b-4ab1-b13d-44b0046c6774": "Beard18",
  "547dcea1-2559-4f54-af6a-e7f025552e96": "Beard19",
  "7b5556a2-c331-4192-b1f9-0941d778b7e3": "Beard20",
  "8590e357-d3a7-4d39-88ff-d199ecb236c7": "Beard21",
  "c5b7f31a-f0b5-4229-91c3-be2f859966fa": "Beard22",
  "8ce83349-a151-4d98-ab07-d710bb8bc5fc": "Beard23",
  "92b25f3c-740d-47ec-aae6-f2f20b2ecf68": "Beard24",
  "88c8eee7-42cf-4baf-8286-c736a2c1bd93": "Beard25",
  "4e1f14bc-3db8-483b-ab97-c948d8e984b8": "Beard26",
  "bda4e041-2f54-4ec6-9bd8-6807e80ddfd6": "Beard27",
  "e27a835b-965f-487b-bef7-ac8be077cc62": "Beard28",
  "09b25ba2-4e5d-4135-8d27-5649227b7a74": "Beard29",
  "31de0f7c-a059-4a5c-8917-d699a79af303": "Beard30",
} as const;

export const hairGuids = {
  "71dd6cea-e225-4aaf-b9d7-562d2083ae3b": "Bald01",
  "968d0d95-2224-47dc-a05a-da423a4a1c81": "Hair02",
  "a8beac2a-3a3a-455b-9d2b-cfcadf290419": "Hair03",
  "e35c9137-dc5b-457f-b86a-f4f47d4ea96a": "Hair04",
  "78ba4b65-a6a6-4c08-b78a-4d4b0adc020d": "Hair05",
  "041df6b0-2498-4799-a7a5-d2d40856c409": "Hair06",
  "57eedc17-d982-485f-98bc-161df3822022": "Hair07",
  "7222de26-f519-4d98-99f7-0aa602ae4c05": "Hair08",
  "ebd09681-1909-4047-8989-774974da71b7": "Hair09",
  "9b688d20-e494-4c80-b0b7-e2989ddd4cbc": "Hair10",
  "ad65b2a4-6ee8-4f9f-ac86-0b1725e3e5a1": "Hair11",
  "8b40a194-fc32-4668-bd77-dc7e54708725": "Hair12",
  "f2343738-d0bc-4a99-bd11-98aa9cd5063d": "Hair13",
  "b0ef56d6-fafb-4b52-8713-2c00577605a5": "Hair14",
  "bc8dbe98-2990-46ee-ac08-268dddb15bd7": "Hair15",
  "f6a28414-2326-41e1-a9f0-ad76600b4f5b": "Hair16",
  "74a0634c-0ca6-4e8c-a0fc-21cfa6a0663b": "Hair17",
  "854f7b6c-7054-4f51-867c-f5fe8247b884": "Hair18",
  "73005464-e866-44f6-a192-c091bcb15fb3": "Hair19",
  "c0ff663f-006f-4668-9a7a-2c125c55e291": "Hair20",
  "ce9137d2-9c06-412a-ab90-5da4e988902b": "Hair21",
  "d7cb9d99-2e76-43ab-b21e-7c0f9f1df419": "Hair22",
  "63a60790-fc1c-47bb-b0df-d1452e8cde2b": "Hair23",
  "03762539-c42e-4314-9710-97430c72da98": "Hair24",
} as const;

export const hairModifierGuid = "12ce4ce5-e49a-4dab-9d31-ad262faaddf2";
export const headGuid = "1d5cfab3-bf80-4550-b4ab-39e896a7086e";

export const makeupGuids = {
  "b643f3b3-21bc-4f44-95e5-0de140fd7954": "Eyes01",
  "229a46c9-b9e5-4da2-875e-8f007642e52c": "Eyes02",
  "34e882d0-ae6b-4747-acf1-0a86ef8a64bb": "Eyes03",
  "a817c68e-8a9b-4887-b8be-1760a2a42b4d": "Eyes04",
  "438aa947-2c7b-41ea-86a9-71046ca59037": "Eyes05",
  "8f19d3cd-2bf4-45ec-8189-7780a82c6e48": "Lips01",
  "63d0a0c7-924e-4274-af62-765d4ca4d2b4": "Lips02",
  "521a1b21-8bb7-44ef-91b5-74d9a3f0cf1b": "Lips03",
  "5f213adc-04e0-44c4-bd5a-fb6a07022c70": "Lips04",
  "db723134-9142-43c1-84c0-ace36c176135": "Lips05",
} as const;
