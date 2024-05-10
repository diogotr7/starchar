import { Skeleton } from '@mantine/core'
import { useEffect, useReducer } from 'react'
import { readCharacter } from '../Chf/Character'
import { extractChf } from '../Utils/ChfFile'
import CharacterEditor from '../Components/CharacterEditor'
import CharacterContext from './CharacterContext'
import { reducer } from './reducer'

interface Props {
  chf: File
}

function CharacterContextProvider({ chf }: Props) {
  const [character, dispatch] = useReducer(reducer, undefined!)

  useEffect(() => {
    chf.arrayBuffer().then((buffer) => {
      const c = readCharacter(extractChf(new Uint8Array(buffer)))
      console.log(c)
      dispatch({ type: 'setCharacter', payload: c })
    }).catch((e) => {
      console.error(e)
    })
  }, [chf])

  return character
    ? (
      <CharacterContext.Provider value={[character, dispatch]}>
        <CharacterEditor />
      </CharacterContext.Provider>
      )
    : (
      <Skeleton height={300} />
      )
}

export default CharacterContextProvider
