import { createContext } from "react";
import { Character } from "../Chf/Character";

export const CharacterContext = createContext<Character | null>(null);

export default CharacterContext;
