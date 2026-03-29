import { z } from "zod";

const textureSchema = z.object({
  index: z.number(),
  guid: z.string(),
});

const materialParamSchema = z.object({
  name: z.string(),
  value: z.number(),
});

const materialColorSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const subMaterialSchema = z.object({
  name: z.string(),
  textures: z.array(textureSchema),
  material_params: z.array(materialParamSchema),
  material_colors: z.array(materialColorSchema),
});

export type SubMaterial = z.infer<typeof subMaterialSchema>;

export const materialSchema = z.object({
  name: z.string(),
  guid: z.string(),
  mtl_flags: z.number(),
  sub_materials: z.array(subMaterialSchema),
});

export type Material = z.infer<typeof materialSchema>;
