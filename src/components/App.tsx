import {
  ActionIcon,
  AppShell,
  Button,
  Center,
  FileButton,
  FileInput,
  Group,
  SimpleGrid,
  Stack,
  Title,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconBrandGithub, IconBrandPaypal } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CharacterEditor } from "./CharacterEditor.tsx";
import { DropzoneChf } from "../components2/DropzoneChf.tsx";
import { useCharacterStore } from "../useCharacterStore.ts";
import { get_chf_contents } from "../../chf-rs/wasm/pkg/chf_rs_wasm";
import { readCharacter } from "../chf/Character.ts";
import { extractChf } from "../chf/ChfFile.ts";

function downloadBytes(bytes: Uint8Array, name: string) {
  const blob = new Blob([bytes], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function extractChfContents(file: File | null) {
  if (!file) return;

  const buffer = await file.arrayBuffer();
  const extracted = get_chf_contents(new Uint8Array(buffer));
  downloadBytes(extracted, "extracted.bin");
}

export function App() {
  const [chf, setChf] = useState<File | null>();
  const { isCharacterLoaded, loadCharacter, unloadCharacter } =
    useCharacterStore((state) => ({
      isCharacterLoaded: state.character !== undefined,
      loadCharacter: state.loadCharacter,
      unloadCharacter: state.unloadCharacter,
    }));
  const isMobile = useMediaQuery(`(max-width: ${em(850)})`);

  useEffect(() => {
    if (!chf) {
      unloadCharacter();
      return;
    }

    chf
      .arrayBuffer()
      .then((buffer) => {
        try {
          loadCharacter(readCharacter(extractChf(new Uint8Array(buffer))));
        } catch (e) {
          unloadCharacter();
          setChf(null);
          notifications.show({
            title: "Failed to read character",
            message: "Please upload a valid .chf file",
            color: "red",
            autoClose: 5000,
          });
          console.error("Failed to read character", e);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [chf, unloadCharacter, loadCharacter]);

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <SimpleGrid cols={3} m="sm">
          <Group>
            <ActionIcon
              size="lg"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/diogotr7/starchar"
              variant="subtle"
            >
              <IconBrandGithub size={32} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://paypal.me/diogotr7"
              variant="subtle"
            >
              <IconBrandPaypal size={32} />
            </ActionIcon>
          </Group>
          <Center>
            <Title order={2}>StarChar</Title>
          </Center>
          <Group justify="space-evenly">
            <FileButton onChange={extractChfContents} accept=".chf">
              {(props) => (
                <Button variant="outline" {...props}>
                  Extract Chf
                </Button>
              )}
            </FileButton>
            <FileInput
              ml="auto"
              w={isMobile ? "100%" : "auto"}
              clearable={true}
              accept=".chf"
              placeholder="Upload Chf"
              value={chf}
              onChange={setChf}
            />
          </Group>
        </SimpleGrid>
      </AppShell.Header>
      <AppShell.Main>
        <Stack gap="md" justify="center">
          {isCharacterLoaded ? (
            <CharacterEditor />
          ) : (
            <DropzoneChf onDrop={setChf} />
          )}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
