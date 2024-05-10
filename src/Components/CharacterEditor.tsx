import { Group, Stack } from '@mantine/core'
import SkinColorPicker from './SkinColorPicker'
import MakeupColorPicker from './MakeupColorPicker'
import { CharacterJsonDisplay } from './CharacterJsonDisplay'

function CharacterEditor() {
  return (
    <Stack justify="flex-start">
      <Group justify="space-evenly">
        <SkinColorPicker />
        <MakeupColorPicker />
      </Group>
      <CharacterJsonDisplay />
    </Stack>
  )
}
export default CharacterEditor
