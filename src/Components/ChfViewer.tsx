import { Skeleton } from "@mantine/core";
import { useCharacter } from "../Hooks/useCharacter";
import CharacterEditor from "./CharacterEditor";
import CharacterContext from "../Context/CharacterContext";

type Props = {
  chf: File;
};

function ChfViewer({ chf }: Props) {
  const character = useCharacter(chf);

  return character ? (
    <CharacterContext.Provider value={character}>
      <CharacterEditor />
    </CharacterContext.Provider>
  ) : (
    <Skeleton height={300} />
  );
}

export default ChfViewer;
