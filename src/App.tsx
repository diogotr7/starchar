import { useEffect, useState } from 'react'
import { AppShell, Center, FileInput, Group, Title } from '@mantine/core'
import { useImmer } from 'use-immer'
import { notifications } from '@mantine/notifications'
import CharacterContext from './Context/CharacterContext.tsx'
import CharacterEditor from './Components/CharacterEditor.tsx'
import type { Character } from './Chf/Character.ts'
import { readCharacter } from './Chf/Character.ts'
import { extractChf } from './Chf/ChfFile.ts'

function App() {
  const [chf, setChf] = useState<File | null>()
  const [character, updateCharacter] = useImmer<Character>(undefined!)

  useEffect(() => {
    if (!chf) {
      updateCharacter(() => undefined)
      return
    }

    chf.arrayBuffer().then((buffer) => {
      try {
        const newCharacter = readCharacter(extractChf(new Uint8Array(buffer)))
        updateCharacter(() => newCharacter)
      }
      catch {
        console.error('Failed to read character')
        updateCharacter(() => undefined)
        setChf(null)
        notifications.show({
          title: 'Failed to read character',
          message: 'Please upload a valid .chf file',
          color: 'red',
          autoClose: 5000,

        })
      }
    }).catch((e) => {
      console.error(e)
    })
  }, [chf, updateCharacter, setChf])

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title>StarChar</Title>
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
        {character && chf
          ? (
            <CharacterContext.Provider value={[character, updateCharacter]}>
              <CharacterEditor />
            </CharacterContext.Provider>
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
