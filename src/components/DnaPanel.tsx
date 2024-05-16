import { Fieldset, Group, Stack, Text } from '@mantine/core'
import { DnaImportExport } from './DnaImportExport'
import { DnaPart } from './DnaPart'

export function DnaPanel() {
  return (
    <Fieldset legend="DNA">
      <Text maw="860" ta="center">
        This panel adjusts the overall face shape. Each face part can be changed fully independently unlike the game (you can have two different eyes for example). You can also import and export DNA strings to share your characters with others.
        <br />
        Each face part can be a blend of 4 different heads. The sliders control the blend amount and the dropdowns control which head is used.
      </Text>
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
          <DnaPart label="Crown" part="crown" />
          <DnaPart label="Nose" part="nose" />
          <DnaPart label="Mouth" part="mouth" />
          <DnaPart label="Jaw" part="jaw" />
        </Group>
        <DnaImportExport />
      </Stack>
    </Fieldset>
  )
}
