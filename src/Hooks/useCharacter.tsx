import { extractChf } from "../Utils/ChfFile";
import { useEffect, useState } from "react";
import { Character, readCharacter } from "../Chf/Character";

function useCharacter(chf: File) {
  const [character, setCharacter] = useState<Character | null>();

  useEffect(() => {
    chf.arrayBuffer().then((buffer) => {
      const c = readCharacter(extractChf(new Uint8Array(buffer)));
      console.log(c);
      setCharacter(c);
    });
  }, [chf]);

  return character;
}

export { useCharacter };
