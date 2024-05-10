import { Code } from '@mantine/core'
import { useCharacterContext } from '../Hooks/useCharacterContext'

export function CharacterJsonDisplay() {
  const character = useCharacterContext()

  return <Code block>{JSON.stringify(character, null, 2)}</Code>
}
