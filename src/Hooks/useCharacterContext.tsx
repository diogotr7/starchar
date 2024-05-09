import { useContext } from "react";
import { CharacterContext } from "../Context/CharacterContext";

export function useCharacterContext() {
  const character = useContext(CharacterContext);
  if (character === null) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return character;
}
