import { devtools } from "zustand/middleware";
import type { Character } from "./chf/Character";
import { createChf } from "./chf/ChfFile";
import { dnaToString } from "./chf/Dna";
import { mutative } from "zustand-mutative";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

interface CharacterState {
  isCharacterLoaded: boolean;
  character: Character;
  getChf: () => ArrayBuffer;
  getDnaString: () => string;
  updateCharacter: (fn: (draft: Character) => void) => void;
  loadCharacter: (character: Character) => void;
  resetCharacter: () => void;
}

export const useCharacterStore = createWithEqualityFn<CharacterState>()(
  devtools(
    mutative((set, get) => ({
      isCharacterLoaded: false,
      character: undefined!,
      getChf: () => createChf(get().character),
      getDnaString: () => {
        const character = get().character;
        return dnaToString(character.dna, character.bodyType);
      },
      updateCharacter: (fn) => set((state) => fn(state.character), false, "updateCharacter"),
      loadCharacter: (character) => set({ isCharacterLoaded: true, character }, false, "loadCharacter"),
      resetCharacter: () => set({ isCharacterLoaded: false, character: undefined! }, false, "resetCharacter"),
    })),
  ),
  shallow,
);
