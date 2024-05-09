import { useState } from "react";
import {
  ActionIcon,
  AppShell,
  Center,
  FileInput,
  Group,
  Space,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun } from "@tabler/icons-react";
import ChfViewer from "./ChfViewer";

function App() {
  const { toggleColorScheme } = useMantineColorScheme();
  const [chf, setChf] = useState<File | null>();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title>StarChar</Title>
          <Space />
          <ActionIcon onClick={toggleColorScheme} size={35}>
            <IconSun />
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        {chf ? (
          <ChfViewer chf={chf} />
        ) : (
          <Center>
            <FileInput
              label="Choose a file"
              description="File must be a .chf file"
              accept=".chf"
              placeholder="No file chosen"
              value={chf}
              onChange={setChf}
            />
          </Center>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
