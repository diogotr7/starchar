import { Code, Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";
import { extractChf } from "./ChfFile";
import { Character, readCharacter } from "./character/Character";

type Props = {
  chf: File;
};

function ChfViewer({ chf }: Props) {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    chf.arrayBuffer().then((buffer) => {
      const char = readCharacter(extractChf(new Uint8Array(buffer)));
      setCharacter(char);
    });
  }, [chf]);

  return (
    <>
      {character ? (
        <Code block>{JSON.stringify(character, null, 2)}</Code>
      ) : (
        <Skeleton height={300} />
      )}
    </>
  );
}

export default ChfViewer;
