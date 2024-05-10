import { Skeleton } from '@mantine/core'
import { useEffect, useState } from 'react'
import CharacterContext from '../Context/CharacterContext'
import type { Character } from '../Chf/Character'
import { readCharacter } from '../Chf/Character'
import { extractChf } from '../Utils/ChfFile'
import CharacterEditor from './CharacterEditor'

interface Props {
  chf: File
}

function ChfViewer({ chf }: Props) {
  const [character, setCharacter] = useState<Character>()

  useEffect(() => {
    chf.arrayBuffer().then((buffer) => {
      const c = readCharacter(extractChf(new Uint8Array(buffer)))
      // eslint-disable-next-line no-console
      console.log(c)
      setCharacter(c)
    }).catch((e) => {
      console.error(e)
    })
  }, [chf])

  return character
    ? (
      <CharacterContext.Provider value={[character, setCharacter as any]}>
        <CharacterEditor />
      </CharacterContext.Provider>
      )
    : (
      <Skeleton height={300} />
      )
}

export default ChfViewer
