import { z } from "zod";

export const subMaterialSchema = z.object({
  submaterial_hash: z.string(),
  texture_count: z.number(),
  textures: z.array(
    z.object({
      tex_index: z.number(),
      zero: z.number(),
      tex_id: z.string().uuid(),
    })
  ),
  material_param_count: z.number(),
  material_params: z.array(
    z.object({
      value_hash: z.string(),
      value: z.number(),
      zero: z.number(),
    })
  ),
  material_color_count: z.number(),
  material_colors: z.array(
    z.object({
      value_hash: z.string(),
      value: z.string(),
      zero: z.number(),
    })
  ),
  submat_five: z.nullable(z.number()),
});

export type SubMaterial = z.infer<typeof subMaterialSchema>;

export const materialSchema = z.object({
  material_hash: z.string(),
  material_id: z.string().uuid(),
  mtl_flags_maybe: z.number(),
  empty_guid: z.string().uuid(),
  sub_material_count: z.number(),
  five: z.number(),
  sub_materials: z.array(subMaterialSchema),
});

export type Material = z.infer<typeof materialSchema>;
