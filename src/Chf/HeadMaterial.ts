import { BufferReader } from "../Utils/BufferReader";

export type HeadMaterial = {
  materialType: HeadMaterialType;
  additionalParams: number;
};
export function readHeadMaterial(reader: BufferReader): HeadMaterial {
  reader.expectUint32(0xa98beb34);
  const materialTypeGuid = reader.readGuid();
  const additionalParams = reader.readUint32();

  const materialType = headMaterialTypeMap[materialTypeGuid];
  if (materialType === undefined) {
    throw new Error(`Unknown head material type: ${materialTypeGuid}`);
  }

  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(1);
  reader.expectUint32(5);

  return { materialType, additionalParams };
}

export enum HeadMaterialType {
  HeadMaterialM01,
  HeadMaterialM02,
  HeadMaterialM04,
  HeadMaterialM05,
  HeadMaterialM06,
  HeadMaterialM07,
  HeadMaterialM08,
  HeadMaterialM09,
  HeadMaterialM10,
  HeadMaterialM11,
  HeadMaterialM12,
  HeadMaterialM13,
  HeadMaterialM14,
  HeadMaterialM15,
  HeadMaterialF01,
  HeadMaterialF02,
  HeadMaterialF03,
  HeadMaterialF04,
  HeadMaterialF05,
  HeadMaterialF06,
  HeadMaterialF07,
  HeadMaterialF08,
  HeadMaterialF09,
  HeadMaterialF10,
  HeadMaterialF11,
  HeadMaterialF12,
  HeadMaterialF13,
  HeadMaterialF14,
}

const headMaterialTypeMap: Record<string, HeadMaterialType> = {
  "bc56197f-ec97-43fb-b047-aaf51c8eb3b6": HeadMaterialType.HeadMaterialM01,
  "2fcd7cc1-a46d-4065-84ba-bfabf9d567ce": HeadMaterialType.HeadMaterialM02,
  "9c55cd1d-b397-4886-b1a4-bc38575916fd": HeadMaterialType.HeadMaterialM04,
  "d9c34b15-40cd-49b1-84bb-a6161bfa5240": HeadMaterialType.HeadMaterialM05,
  "538ab6c3-8bb6-4768-9ad1-cc6387e9c65f": HeadMaterialType.HeadMaterialM06,
  "e6cb61c7-7740-46b9-9f9c-fd5eb3498e75": HeadMaterialType.HeadMaterialM07,
  "e76ed31e-9ef4-4fe0-8a46-2c3ed8c6ab1b": HeadMaterialType.HeadMaterialM08,
  "1d33cab4-50bf-4e7d-8c75-ef56e5e8a1b1": HeadMaterialType.HeadMaterialM09,
  "6a7a8295-f9e4-4d98-82aa-7443adc3c6e2": HeadMaterialType.HeadMaterialM10,
  "9a66730e-512e-4d21-8ba3-d3ce2c3ebfe6": HeadMaterialType.HeadMaterialM11,
  "003367a7-9873-4a8f-9a27-9b8def193b43": HeadMaterialType.HeadMaterialM12,
  "7e033967-fa65-423e-ba74-af2e810e4cac": HeadMaterialType.HeadMaterialM13,
  "38219031-5c5a-4d44-9cb1-da8bdc0f2089": HeadMaterialType.HeadMaterialM14,
  "4f79d0fb-389f-48c5-ba3b-9f290b8b4dc2": HeadMaterialType.HeadMaterialM15,
  "6bf5cf88-c6bf-44ec-8e98-fd513c588886": HeadMaterialType.HeadMaterialF01,
  "023bd1d1-6700-4889-b235-d3254db0cec1": HeadMaterialType.HeadMaterialF02,
  "23795209-f1c8-42f3-8f93-5eee45c3ea34": HeadMaterialType.HeadMaterialF03,
  "aa8cb288-e754-446a-b8f0-98107ad9914e": HeadMaterialType.HeadMaterialF04,
  "9c6a7a36-f952-4cdc-8264-c9b83393ee2e": HeadMaterialType.HeadMaterialF05,
  "2b23bbfa-aa4b-47e9-9bc8-2af7a2fc39ba": HeadMaterialType.HeadMaterialF06,
  "c5b4f677-be97-4827-95b0-ffcef7b77ba8": HeadMaterialType.HeadMaterialF07,
  "6739da5b-8d22-4114-acc1-4f333f983101": HeadMaterialType.HeadMaterialF08,
  "983f7a30-0528-409a-9e33-1eb81a65f0e6": HeadMaterialType.HeadMaterialF09,
  "79adf215-136a-4fc5-9dd7-9e03879e3bd8": HeadMaterialType.HeadMaterialF10,
  "5d629e70-ff2f-4fc8-829c-b989f5494d4d": HeadMaterialType.HeadMaterialF11,
  "24c9f393-3240-4bd3-a13a-078abd68375b": HeadMaterialType.HeadMaterialF12,
  "35b1f87f-14e7-4ece-acf0-6d8d436941b9": HeadMaterialType.HeadMaterialF13,
  "e186048a-9a81-47b3-828e-71e957c65762": HeadMaterialType.HeadMaterialF14,
};
