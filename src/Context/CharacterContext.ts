import { createContext, useContext } from 'react'
import type { Updater } from 'use-immer'
import type { Character } from '../Chf/Character'

export interface CharacterContextType {
  character: Character
  updateCharacter: Updater<Character>
}

export const CharacterContext = createContext<CharacterContextType | undefined>(undefined)

export function useCharacter() {
  const ctx = useContext(CharacterContext)

  if (ctx === undefined)
    throw new Error('useCharacter must be used within a CharacterProvider')

  return ctx
}

export default CharacterContext
