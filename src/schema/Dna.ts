import { z } from "zod";
import { parse_dna_hex, write_dna_hex } from "../../chf-rs/pkg/chf_rs_wasm";

const dnaBlendSchema = z.object({
  value: z.number(),
  head_id: z.number(),
});

export type DnaBlend = z.infer<typeof dnaBlendSchema>;

const dnaFacePartSchema = z.array(dnaBlendSchema).length(4);
export type DnaFacePart = z.infer<typeof dnaFacePartSchema>;

export const allFaceParts = [
  "EyebrowLeft",
  "EyebrowRight",
  "EyeLeft",
  "EyeRight",
  "Nose",
  "EarLeft",
  "EarRight",
  "CheekLeft",
  "CheekRight",
  "Mouth",
  "Jaw",
  "Crown",
  "Neck",
] as const;

export type FacePart = (typeof allFaceParts)[number];
export type FaceParts = Record<string, DnaFacePart>;

export const dnaSchema = z.object({
  raw_bytes: z.string(),
  gender_hash: z.string(),
  variant_hash: z.string(),
  part_count: z.number(),
  blends_per_part: z.number(),
  header_unknown: z.number(),
  max_head_id: z.number(),
  face_parts: z.record(z.string(), dnaFacePartSchema),
});

export type Dna = z.infer<typeof dnaSchema>;

export function dnaFromString(dnaString: string): Dna {
  const json = parse_dna_hex(dnaString);
  return dnaSchema.parse(JSON.parse(json));
}

export function dnaToString(dna: Dna): string {
  return write_dna_hex(JSON.stringify(dna));
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

export function getFaceDna(dna: Dna, faceId: number): Dna {
  const newParts: FaceParts = {};
  for (const key of Object.keys(dna.face_parts)) {
    newParts[key] = [
      { value: 65534, head_id: faceId },
      { value: 0, head_id: 0 },
      { value: 0, head_id: 0 },
      { value: 0, head_id: 0 },
    ];
  }
  return { ...dna, max_head_id: faceId, face_parts: newParts };
}

export function getRandDna(dna: Dna, maxId: number, mirror: boolean = true): Dna {
  function randomizePart(): DnaFacePart {
    let total = 65534;
    const parts: DnaBlend[] = [];
    for (let i = 0; i < 4; i++) {
      const value = Math.floor(Math.random() * total);
      parts.push({
        value: i === 3 ? total : value,
        head_id: Math.floor(Math.random() * maxId),
      });
      total -= value;
    }
    return parts;
  }

  const newParts: FaceParts = {};
  for (const key of Object.keys(dna.face_parts)) {
    newParts[key] = randomizePart();
  }
  if (mirror) {
    newParts.CheekLeft = newParts.CheekRight;
    newParts.EarLeft = newParts.EarRight;
    newParts.EyebrowLeft = newParts.EyebrowRight;
    newParts.EyeLeft = newParts.EyeRight;
  }
  return { ...dna, max_head_id: maxId, face_parts: newParts };
}

export const blendTotal = 65534;
export const dnaHeadIdMaxF = 47;
export const dnaHeadIdMaxM = 59;

export function getMaxHeadId(bodyType: "Male" | "Female"): number {
  return bodyType === "Male" ? dnaHeadIdMaxM : dnaHeadIdMaxF;
}
