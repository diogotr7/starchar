import type React from 'react'
import { createContext, useContext } from 'react'
import type { Character } from '../Chf/Character'
import type { SetCharacterAction } from './reducer'

export type CharacterContextType = [Character, React.Dispatch<SetCharacterAction>]

export const CharacterContext = createContext<CharacterContextType | undefined>(undefined)

export function useCharacter() {
  const ctx = useContext(CharacterContext)
  if (ctx === undefined)
    throw new Error('useCharacter must be used within a CharacterProvider')

  return ctx
}

export default CharacterContext
