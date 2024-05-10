import { Fieldset, Group, NumberInput, Slider, Stack } from '@mantine/core'
import { useCallback } from 'react'
import type { NumberFormatValues } from 'react-number-format'
import { useCharacter } from '../Context/CharacterContext'
import type { DnaFacePart } from '../Chf/Dna'

export function DnaPanel() {
  return (
    <Fieldset legend="DNA">
      <Stack>
        <Group>
          <DnaPart label="Left Eyebrow" part="eyebrowLeft" />
          <DnaPart label="Right Eyebrow" part="eyebrowRight" />
          <DnaPart label="Left Eye" part="eyeLeft" />
          <DnaPart label="Right Eye" part="eyeRight" />
        </Group>
        <Group>
          <DnaPart label="Left Ear" part="earLeft" />
          <DnaPart label="Right Ear" part="earRight" />
          <DnaPart label="Left Cheek" part="cheekLeft" />
          <DnaPart label="Right Cheek" part="cheekRight" />
        </Group>
        <Group>
          <DnaPart label="Nose" part="nose" />
          <DnaPart label="Mouth" part="mouth" />
          <DnaPart label="Jaw" part="jaw" />
          <DnaPart label="Crown" part="crown" />
        </Group>
      </Stack>
    </Fieldset>
  )
}

function DnaPart({ label, part }: { label: string, part: DnaFacePart }) {
  const [character] = useCharacter()
  const blend = character.dna.blends[part]

  // make this work properly. We want the sum of all the blend percentages to be 100
  // and the others to be updated accordingly when one is changed
  // const updateBlend = useCallback((sliderIndex: number, newValue: number) => {

  // }, [blend, character, part, updateCharacter])

  const isValidHeadId = useCallback((headId: NumberFormatValues) => {
    const id = headId.floatValue ?? 0
    // double check this
    return id >= 0 && id <= 26 && Number.isInteger(id)
  }, [])

  function HeadPicker({ index }: { index: number }) {
    return (
      <NumberInput
        allowDecimal={false}
        allowLeadingZeros={false}
        allowNegative={false}
        isAllowed={isValidHeadId}
        size="xs"
        w={50}
        value={blend[index].headId}
        disabled
        // onValueChange={values => updateCharacter((d) => { d.dna.blends[part][index].headId = values.floatValue ?? 0 })}
      />
    )
  }

  function MySlider({ index }: { index: number }) {
    return (
      <Slider
        w="100"
        disabled
        value={blend[index].percent}
        // onChange={value => updateBlend(index, value)}
      />
    )
  }

  return (
    <Fieldset legend={label}>
      <Group>
        <HeadPicker index={0} />
        <MySlider index={0} />
      </Group>
      <Group>
        <HeadPicker index={1} />
        <MySlider index={1} />
      </Group>
      <Group>
        <HeadPicker index={2} />
        <MySlider index={2} />
      </Group>
      <Group>
        <HeadPicker index={3} />
        <MySlider index={3} />
      </Group>
    </Fieldset>
  )
}
