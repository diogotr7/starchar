import { Skeleton } from '@mantine/core'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import type { Character } from '../Chf/Character'
import { readCharacter } from '../Chf/Character'
import { extractChf } from '../Chf/ChfFile'
import CharacterEditor from '../Components/CharacterEditor'
import CharacterContext from './CharacterContext'

interface Props {
  chf: File
}

function CharacterContextProvider({ chf }: Props) {
  // we only use the context after the character is loaded, we can force undefined here
  const [character, updateCharacter] = useImmer<Character>(undefined!)

  useEffect(() => {
    chf.arrayBuffer().then((buffer) => {
      let newCharacter: Character | undefined
      try {
        newCharacter = readCharacter(extractChf(new Uint8Array(buffer)))
      }
      catch {
        console.error('Failed to read character')
        newCharacter = undefined
      }

      updateCharacter(() => newCharacter)
    }).catch((e) => {
      console.error(e)
      updateCharacter(() => undefined)
    })
  }, [chf])

  return character
    ? (
      <CharacterContext.Provider value={[character, updateCharacter]}>
        <CharacterEditor />
      </CharacterContext.Provider>
      )
    : (
      <></>
      )
}

export default CharacterContextProvider
