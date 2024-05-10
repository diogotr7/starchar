import { Group, Stack } from '@mantine/core'
import SkinColorPicker from './SkinColorPicker'
import MakeupColorPicker from './MakeupColorPicker'
import { CharacterJsonDisplay } from './CharacterJsonDisplay'
import { FaceProperties } from './FaceProperties'

function CharacterEditor() {
  return (
    <Stack justify="flex-start">
      <Group justify="space-evenly">
        <SkinColorPicker />
        <FaceProperties />
        <MakeupColorPicker />
      </Group>
      <CharacterJsonDisplay />
    </Stack>
  )
}
export default CharacterEditor
