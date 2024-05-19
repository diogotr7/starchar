import type { ColorInputProps } from "@mantine/core";
import { ColorInput } from "@mantine/core";

export function SmallColorInput(props: ColorInputProps) {
  return <ColorInput withEyeDropper={false} size="sm" w={130} {...props} />;
}
