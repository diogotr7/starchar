import "@mantine/dropzone/styles.css";

import { Button, Group, Stack, Text } from "@mantine/core";
import { useCharacterStore } from "../useCharacterStore";
import { readCharacter } from "../chf/Character";
import { chf_to_json } from "../../chf-rs/wasm/pkg/chf_rs_wasm";
import { extractChf } from "../chf/ChfFile";

async function getCharacter(filePath: string) {
  const result = await fetch(filePath);
  const data = await result.arrayBuffer();
  const uint8data = new Uint8Array(data);

  console.log(JSON.parse(chf_to_json(uint8data)));

  return readCharacter(extractChf(uint8data));
}

async function getDefaultFemale() {
  return await getCharacter("/default_f.chf");
}

async function getDefaultMale() {
  return await getCharacter("/default_m.chf");
}

export function LoadDefault() {
  const loadCharacter = useCharacterStore((state) => state.loadCharacter);

  return (
    <Stack align="center">
      <Text size="sm" c="dimmed">
        Don't have a .chf file?
      </Text>
      <Group justify="center" gap="sm" w="100%">
        <Button
          variant="default"
          size="sm"
          onClick={async () => loadCharacter(await getDefaultMale())}
        >
          Load Default M
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={async () => loadCharacter(await getDefaultFemale())}
        >
          Load Default F
        </Button>
      </Group>
    </Stack>
  );
}
