import { z } from "zod";
import { chf_to_json, json_to_chf } from "../../chf-rs/wasm/pkg/chf_rs_wasm";
import { dnaSchema } from "./Dna";
import { itemPortSchema } from "./ItemPort";
import { materialSchema } from "./Materials";

const chfSchema = z.object({
  female_version: z.number(),
  male_version: z.number(),
  body_type_id: z.string().uuid(),
  zero_id: z.string().uuid(),
  dna: dnaSchema,
  total_itemport_count: z.number(),
  itemport: itemPortSchema,
  materials_five: z.number(),
  materials: z.array(materialSchema),
});

export type Chf = z.infer<typeof chfSchema>;

export function chfFromBytes(buffer: Uint8Array): Chf {
  const json = JSON.parse(chf_to_json(buffer));
  //console.debug(json);
  return chfSchema.parse(json);
}

export function chfToBytes(chf: Chf): Uint8Array {
  return json_to_chf(JSON.stringify(chfSchema.parse(chf)));
}
