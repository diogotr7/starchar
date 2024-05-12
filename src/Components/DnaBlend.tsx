import { Group, NumberInput, Slider } from '@mantine/core'
import { useCharacterStore } from '../useCharacterStore'
import { maxHeadIdForBodyType } from '../Chf/Dna'

export interface DnaBlendProps {
  headId: number
  value: number
  onChangeSlider: (value: number) => void
  onChangeNumber: (value: number | string) => void
}

export function DnaBlend({ headId, value, onChangeSlider, onChangeNumber }: DnaBlendProps) {
  const bodyType = useCharacterStore(state => state.character.bodyType)
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
        max={maxHeadIdForBodyType(bodyType)}
        value={headId}
        onChange={onChangeNumber}
      />
      <Slider
        w="100"
        min={1}
        max={65535}
        step={1}
        label={value => `${Math.round(value / 65535 * 100)}%`}
        value={value}
        onChange={onChangeSlider}
      />
    </Group>
  )
}
