import { z } from "zod";
import {
  get_bytes_from_dna,
  get_dna_from_bytes,
} from "../../chf-rs/wasm/pkg/chf_rs_wasm";
import { fromHexStr, toHexStr } from "../utils";

const dnaBlendSchema = z.object({
  head_id: z.number(),
  value: z.number(),
});

const dnaFacePartSchema = z.array(dnaBlendSchema).length(4);

export type DnaFacePart = z.infer<typeof dnaFacePartSchema>;

const dnaFaceSchema = z.object({
  eyebrowLeft: dnaFacePartSchema,
  eyebrowRight: dnaFacePartSchema,
  eyeLeft: dnaFacePartSchema,
  eyeRight: dnaFacePartSchema,
  nose: dnaFacePartSchema,
  earLeft: dnaFacePartSchema,
  earRight: dnaFacePartSchema,
  cheekLeft: dnaFacePartSchema,
  cheekRight: dnaFacePartSchema,
  mouth: dnaFacePartSchema,
  jaw: dnaFacePartSchema,
  crown: dnaFacePartSchema,
});

export type DnaFace = z.infer<typeof dnaFaceSchema>;

export const dnaSchema = z.object({
  dna_hash1: z.string(),
  dna_hash2: z.string(),
  dna_hash3: z.string(),
  zero: z.number(),
  part_count: z.number(),
  blends_per_part: z.number(),
  four: z.number(),
  max_head_id: z.number(),
  face_parts: dnaFaceSchema,
});

export type Dna = z.infer<typeof dnaSchema>;

export function dnaFromString(dnaString: string): Dna {
  let bytes: Uint8Array = fromHexStr(dnaString);

  //add 8 bytes to the start of the dna string, they represent the length and are not part of the dna string
  const lengthBytes = [0xd8, 0, 0, 0, 0, 0, 0, 0];
  if (!bytes.slice(0, 8).every((v, i) => v === lengthBytes[i])) {
    //if the first 8 bytes are not the length bytes, add them
    const newBytes = new Uint8Array(bytes.length + 8);
    newBytes.set(lengthBytes);
    newBytes.set(bytes, 8);
    bytes = newBytes;
  }

  const dna = JSON.parse(get_dna_from_bytes(bytes));
  return dnaSchema.parse(dna);
}

export function dnaToString(_dna: Dna): string {
  const dna = dnaSchema.parse(_dna);
  const json = JSON.stringify(dna);
  const bytes = get_bytes_from_dna(json);

  //Chop off the first 8 bytes, they represent the length and are not part of a dna string
  return toHexStr(bytes.slice(8));
}

export const teciaPacheco =
  "9493D0FC54EBF49E9CE19B65000000000C0004000400FFFF00000D0000000D00000000000000000000000B00000004000000040000000B0000000B0000000C0000001D00000019000000210000002100000008000000080000000200000002000000020000000D0000000D0000000A0000000C0000001100FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
export const ruto =
  "9493D0FCF6676CDDD4F8CC65000000000C0004000400FFFF000001000000010000000A0000000A0000000B0000000D0000000D0000000400000004000000020000000000000009000000000000000000000006000000060000000A0000000A0000000A00000009000000090000000E0000000C0000000F00FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
export const hurston =
  "9493D0FCF6676CDD048AE565000000000C0004000400FFFFFFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100000020000000200000002000000020000000200000002000000020000000200000002000000020000000200000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

export const dnaStrings = [
  { name: "Tecia Pacheco", dna: teciaPacheco },
  { name: "Ruto", dna: ruto },
  { name: "Hurston", dna: hurston },
];

export const allFaceParts: (keyof DnaFace)[] = [
  "eyebrowLeft",
  "eyebrowRight",
  "eyeLeft",
  "eyeRight",
  "nose",
  "earLeft",
  "earRight",
  "cheekLeft",
  "cheekRight",
  "mouth",
  "jaw",
  "crown",
];

export function getFaceDna(dna: Dna, faceId: number): Dna {
  const newParts = Object.fromEntries(
    allFaceParts.map((key) => [
      key,
      [
        { head_id: faceId, value: 65534 },
        { head_id: 0, value: 0 },
        { head_id: 0, value: 0 },
        { head_id: 0, value: 0 },
      ],
    ])
  );

  const verified = dnaFaceSchema.parse(newParts);

  return {
    ...dna,
    max_head_id: faceId,
    face_parts: verified,
  };
}

export function getRandDna(
  dna: Dna,
  maxId: number,
  mirror: boolean = true
): Dna {
  // Gets a random face part such that the sum of the values is 65534
  function randomizePart(): DnaFacePart {
    let total = 65534;
    let parts = [];
    for (let i = 0; i < 4; i++) {
      let value = Math.floor(Math.random() * total);
      parts.push({
        head_id: Math.floor(Math.random() * maxId),
        value: i === 3 ? total : value,
      });
      total -= value;
    }
    return parts;
  }

  const newParts = Object.fromEntries(
    allFaceParts.map((key) => [key, randomizePart()])
  );

  const verified = dnaFaceSchema.parse(newParts);

  if (mirror) {
    verified.cheekLeft = verified.cheekRight;
    verified.earLeft = verified.earRight;
    verified.eyebrowLeft = verified.eyebrowRight;
    verified.eyeLeft = verified.eyeRight;
  }

  return {
    ...dna,
    max_head_id: maxId,
    face_parts: verified,
  };
}
export const blendTotal = 65534;
export const dnaHeadIdMaxF = 47;
export const dnaHeadIdMaxM = 59;

export function getMaxHeadId(bodyType: "Male" | "Female"): number {
  return bodyType === "Male" ? dnaHeadIdMaxM : dnaHeadIdMaxF;
}
