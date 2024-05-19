import { NumberInput, Slider } from "@mantine/core";
import { useCallback } from "react";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function SliderInput({ label, value: propValue, onChange }: SliderInputProps) {
  const handleValueChange = useCallback(
    (newValue: number | string) => {
      if (typeof newValue === "string") {
        onChange(0);
      } else {
        onChange(newValue);
      }
    },
    [onChange],
  );

  return (
    <div>
      <NumberInput
        suffix="%"
        allowNegative={false}
        decimalScale={2}
        w={130}
        size="sm"
        value={propValue}
        onChange={handleValueChange}
        label={label}
        min={0}
        max={100}
        hideControls={true}
      />
      <Slider max={100} min={0} label={null} value={typeof propValue === "string" ? 0 : propValue} onChange={handleValueChange} />
    </div>
  );
}
