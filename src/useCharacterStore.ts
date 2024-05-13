import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import type { Character } from './chf/Character'
import { createChf } from './chf/ChfFile'
import { dnaToString } from './chf/Dna'

interface CharacterState {
  isCharacterLoaded: boolean
  character: Character
  getChf: () => ArrayBuffer
  getDnaString: () => string
  updateCharacter: (fn: (draft: Character) => void) => void
  loadCharacter: (character: Character) => void
  resetCharacter: () => void
}

export const useCharacterStore = create<CharacterState>()(devtools(
  immer((set, get) => ({
    isCharacterLoaded: false,
    character: undefined!,
    getChf: () => createChf(get().character),
    getDnaString: () => {
      const character = get().character
      return dnaToString(character.dna, character.bodyType)
    },
    updateCharacter: fn => set(state => fn(state.character), false, 'updateCharacter'),
    loadCharacter: character => set({ isCharacterLoaded: true, character }, false, 'resetCharacter'),
    resetCharacter: () => set({ isCharacterLoaded: false, character: undefined! }, false, 'resetCharacter'),
  })),
))
