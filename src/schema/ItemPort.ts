import { z } from "zod";

//https://github.com/colinhacks/zod#recursive-types
const baseItemportSchema = z.object({
  itemport_hash: z.string(),
  id: z.string(),
  child_count: z.number(),
  item_port_count_2: z.number(),
});

export type ItemPort = z.infer<typeof baseItemportSchema> & {
  children: ItemPort[];
};

export const itemPortSchema: z.ZodType<ItemPort> = baseItemportSchema.extend({
  children: z.lazy(() => itemPortSchema.array()),
});
