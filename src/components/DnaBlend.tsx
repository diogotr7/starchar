import { Group, NumberInput, Slider } from "@mantine/core";

export function DnaBlend({
  headId,
  value,
  onChangeSlider,
  onChangeNumber,
}: {
  headId: number;
  value: number;
  onChangeSlider: (value: number) => void;
  onChangeNumber: (value: number | string) => void;
}) {
  return (
    <Group wrap="nowrap">
      <NumberInput
        allowDecimal={false}
        allowLeadingZeros={false}
        inputMode="numeric"
        allowNegative={false}
        size="xs"
        w={50}
        min={0}
        max={51} //technically incorrect, for males and females it's different.
        value={headId}
        onChange={onChangeNumber}
      />
      <Slider
        w="100"
        min={1}
        max={65535}
        step={1}
        label={(value) => `${Math.round((value / 65535) * 100)}%`}
        value={value}
        onChange={onChangeSlider}
      />
    </Group>
  );
}
