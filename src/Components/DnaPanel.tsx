import { Fieldset, Group, Stack } from '@mantine/core'
import { DnaImportExport } from './DnaImportExport'
import { DnaPart } from './DnaPart'

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
        <DnaImportExport />
      </Stack>
    </Fieldset>
  )
}
