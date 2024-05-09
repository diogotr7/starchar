import { useState } from "react";
import { AppShell, Center, FileInput, Group, Title } from "@mantine/core";
import ChfViewer from "./ChfViewer";

function App() {
  const [chf, setChf] = useState<File | null>();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title>StarChar</Title>
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
