import { Button, Group, Text } from "@mantine/core";
import "@mantine/dropzone/styles.css";
import { getDefaultFemale, getDefaultMale } from "../testFile";
import { useCharacterStore } from "../useCharacterStore";

export function LoadDefault() {
  const loadCharacter = useCharacterStore((state) => state.loadCharacter);

  return (
    <Group justify="space-between">
      <Text size="sm" c="dimmed">
        Don't have a .chf file?
      </Text>
      <Button variant="default" size="sm" onClick={() => loadCharacter(getDefaultMale())}>
        Load Default M
      </Button>
      <Button variant="default" size="sm" onClick={() => loadCharacter(getDefaultFemale())}>
        Load Default F
      </Button>
    </Group>
  );
}
