import { useEffect, useState } from 'react'
import { extractChf } from '../Utils/ChfFile'
import type { Character } from '../Chf/Character'
import { readCharacter } from '../Chf/Character'

function useCharacter(chf: File) {
  const [character, setCharacter] = useState<Character | null>()

  useEffect(() => {
    chf.arrayBuffer().then((buffer) => {
      const c = readCharacter(extractChf(new Uint8Array(buffer)))
      console.log(c)
      setCharacter(c)
    }).catch((e) => {
      console.error(e)
    })
  }, [chf])

  return character
}

export { useCharacter }
