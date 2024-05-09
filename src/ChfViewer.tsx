import { Text } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { extract } from "./chf";
import { parse } from "./character/StarCitizenCharacter";

type Props = {
  chf: File;
};

function ChfViewer({ chf }: Props) {
  const [bytes, setBytes] = useState<Uint8Array>();

  useEffect(() => {
    chf.arrayBuffer().then((buffer) => {
      setBytes(new Uint8Array(buffer));
    });
  }, [chf]);

  const bytesAsHex = useMemo(() => {
    if (!bytes) return;
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }, [bytes]);

  useEffect(() => {
    if (!bytes) return;

    const decompressed = extract(bytes);
    const char = parse(decompressed);

    console.log(char);
  }, [bytes]);

  return (
    <>
      <Text>Bytes: {bytesAsHex}</Text>
    </>
  );
}

export default ChfViewer;
