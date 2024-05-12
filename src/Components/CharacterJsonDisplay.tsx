import { Code } from '@mantine/core'
import { useCharacterStore } from '../useCharacterStore'

export function CharacterJsonDisplay() {
  const character = useCharacterStore(state => state.character)

  return <Code block>{JSON.stringify(character, null, 2)}</Code>
}
