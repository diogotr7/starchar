import { AppShell, CloseButton, Group, Text } from "@mantine/core";
import { DropzoneChf } from "./DropzoneChf";
import { useCallback, useEffect, useState } from "react";
import { ChfEditor } from "./ChfEditor";
import { ThemeToggle } from "./ThemeToggle";
import { Links } from "./Links";
import { useChfManagement } from "../useChfStore";
import { chfFromBytes } from "../schema/Chf";
import { notifications } from "@mantine/notifications";

export function App() {
  const [file, setFile] = useState<File | null>(null);
  const { loaded, loadChf, clearChf } = useChfManagement();

  const handleFileDrop = useCallback(
    async (file: File | null) => {
      if (!file) {
        clearChf();
        return;
      }
      try {
        const buffer = await file.arrayBuffer();

        const chf = chfFromBytes(new Uint8Array(buffer));

        loadChf(chf);
      } catch (error) {
        clearChf();
        console.error("Failed to read character", error);
        notifications.show({
          title: "Failed to read character",
          message: "Please upload a valid .chf file",
          color: "red",
          autoClose: 5000,
        });
      }
    },
    [loadChf, clearChf]
  );

  useEffect(() => {
    handleFileDrop(file);
  }, [file]);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group m="sm" justify="space-between" align="start">
          <Links />
          {file ? (
            <Group align="center" h="full">
              <Text size="xl">{file.name}</Text>
              <CloseButton size="md" onClick={() => setFile(null)} />
            </Group>
          ) : (
            <Group align="center" h="full">
              <Text size="xl">StarChar</Text>
            </Group>
          )}
          <ThemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        {loaded ? (
          <ChfEditor />
        ) : (
          <DropzoneChf onDrop={(file) => setFile(file)} />
        )}
      </AppShell.Main>
    </AppShell>
  );
}
