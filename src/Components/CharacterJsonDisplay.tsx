import { Code } from '@mantine/core'
import { useCharacter } from '../Context/CharacterContext'

export function CharacterJsonDisplay() {
  const { character } = useCharacter()

  return <Code block>{JSON.stringify(character, null, 2)}</Code>
}
