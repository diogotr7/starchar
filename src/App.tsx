import { useEffect, useState } from 'react'
import { ActionIcon, AppShell, Button, Center, FileInput, Group, Stack, Title, em } from '@mantine/core'
import { useImmer } from 'use-immer'
import { notifications } from '@mantine/notifications'
import { IconBrandGithub, IconBrandPaypal } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import CharacterContext from './Context/CharacterContext.tsx'
import CharacterEditor from './Components/CharacterEditor.tsx'
import type { Character } from './Chf/Character.ts'
import { readCharacter } from './Chf/Character.ts'
import { extractChf } from './Chf/ChfFile.ts'

function App() {
  const [chf, setChf] = useState<File | null>()
  const [character, updateCharacter] = useImmer<Character>(undefined!)
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`)

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
      catch (e) {
        updateCharacter(() => undefined)
        setChf(null)
        notifications.show({
          title: 'Failed to read character',
          message: 'Please upload a valid .chf file',
          color: 'red',
          autoClose: 5000,
        })
        console.error('Failed to read character', e)
      }
    }).catch((e) => {
      console.error(e)
    })
  }, [chf, updateCharacter, setChf])

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            {isMobile
              ? (
                <>
                  <ActionIcon
                    w={50}
                    component="a"
                    target="_blank"
                    href="https://github.com/diogotr7/starchar"
                    variant="subtle"
                  >
                    <IconBrandGithub size="md" />
                  </ActionIcon>
                  <ActionIcon
                    w={50}
                    component="a"
                    target="_blank"
                    href="https://paypal.me/diogotr7"
                    variant="subtle"
                  >
                    <IconBrandPaypal size="md" />
                  </ActionIcon>
                </>
                )
              : (
                <>
                  <Button
                    component="a"
                    target="_blank"
                    href="https://github.com/diogotr7/starchar"
                    variant="outline"
                    rightSection={<IconBrandGithub size={18} />}
                  >
                    Source Code
                  </Button>
                  <Button
                    component="a"
                    target="_blank"
                    href="https://paypal.me/diogotr7"
                    variant="outline"
                    rightSection={<IconBrandPaypal size={18} />}
                  >
                    Donate
                  </Button>
                </>
                )}
          </Group>
          <Title>StarChar</Title>
          <FileInput
            w={isMobile ? 100 : 300}
            color="orange"
            clearable
            accept=".chf"
            placeholder="Upload Chf"
            value={chf}
            onChange={setChf}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Stack gap="md" justify="center">
          {character && chf
            ? (
              <CharacterContext.Provider value={[character, updateCharacter]}>
                <CharacterEditor />
              </CharacterContext.Provider>
              )
            : (
              <Center mt="200">
                <Title order={2}>Upload .chf file to begin!</Title>
              </Center>
              )}

        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
