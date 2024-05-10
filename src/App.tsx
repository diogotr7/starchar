import { useState } from 'react'
import { AppShell, Center, FileInput, Group, Title } from '@mantine/core'
import CharacterContextProvider from './Context/CharacterContextProvider'

function App() {
  const [chf, setChf] = useState<File | null>()

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title onClick={() => window.location.reload()}>StarChar</Title>
          <FileInput
            clearable
            accept=".chf"
            placeholder="Upload Chf"
            value={chf}
            onChange={setChf}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        {chf
          ? (
            <CharacterContextProvider chf={chf} />
            )
          : (
            <Center>
              <Title>Upload .chf file to begin!</Title>
            </Center>
            )}
      </AppShell.Main>
    </AppShell>
  )
}

export default App
