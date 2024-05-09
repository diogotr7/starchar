import { Code, Skeleton, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { extract } from "./chf";
import { StarCitizenCharacter, parse } from "./character/StarCitizenCharacter";

type Props = {
  chf: File;
};

function ChfViewer({ chf }: Props) {
  const [character, setCharacter] = useState<StarCitizenCharacter | null>(null);

  useEffect(() => {
    chf.arrayBuffer().then((buffer) => {
      const char = parse(extract(new Uint8Array(buffer)));
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
