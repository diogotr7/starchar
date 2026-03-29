import { z } from "zod";

const baseItemPortSchema = z.object({
  name: z.string(),
  id: z.string(),
  tail_count: z.number(),
});

export type ItemPort = z.infer<typeof baseItemPortSchema> & {
  children: ItemPort[];
};

export const itemPortSchema: z.ZodType<ItemPort> = baseItemPortSchema.extend({
  children: z.lazy(() => itemPortSchema.array()),
});
