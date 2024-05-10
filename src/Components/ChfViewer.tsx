import { Skeleton } from '@mantine/core'
import { useCharacter } from '../Hooks/useCharacter'
import CharacterContext from '../Context/CharacterContext'
import CharacterEditor from './CharacterEditor'

interface Props {
  chf: File
}

function ChfViewer({ chf }: Props) {
  const character = useCharacter(chf)

  return character
    ? (
      <CharacterContext.Provider value={character}>
        <CharacterEditor />
      </CharacterContext.Provider>
      )
    : (
      <Skeleton height={300} />
      )
}

export default ChfViewer
