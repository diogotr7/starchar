import { useEffect, useState } from 'react'
import { ActionIcon, AppShell, Button, Center, FileInput, Group, SimpleGrid, Stack, Text, Title, em } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconBrandGithub, IconBrandPaypal } from '@tabler/icons-react'
import { useMediaQuery } from '@mantine/hooks'
import { useShallow } from 'zustand/react/shallow'
import CharacterEditor from './Components/CharacterEditor.tsx'
import { readCharacter } from './Chf/Character.ts'
import { extractChf } from './Chf/ChfFile.ts'
import { useCharacterStore } from './useCharacterStore.ts'

function App() {
  const [chf, setChf] = useState<File | null>()
  const { isCharacterLoaded, loadCharacter, resetCharacter } = useCharacterStore(useShallow(state => ({
    isCharacterLoaded: state.isCharacterLoaded,
    loadCharacter: state.loadCharacter,
    resetCharacter: state.resetCharacter,
  })))
  const isMobile = useMediaQuery(`(max-width: ${em(850)})`)

  useEffect(() => {
    if (!chf) {
      resetCharacter()
      return
    }

    chf.arrayBuffer().then((buffer) => {
      try {
        const newCharacter = readCharacter(extractChf(new Uint8Array(buffer)))
        loadCharacter(newCharacter)
      }
      catch (e) {
        resetCharacter()
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
  }, [chf, setChf, resetCharacter, loadCharacter])

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <SimpleGrid cols={3} m="sm">
          <Group>
            {isMobile
              ? (
                <>
                  <ActionIcon
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/diogotr7/starchar"
                    variant="subtle"
                  >
                    <IconBrandGithub size={32} />
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://paypal.me/diogotr7"
                    variant="subtle"
                  >
                    <IconBrandPaypal size={32} />
                  </ActionIcon>
                </>
                )
              : (
                <>
                  <Button
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/diogotr7/starchar"
                    variant="outline"
                    rightSection={<IconBrandGithub size={18} />}
                  >
                    Source Code
                  </Button>
                  <Button
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://paypal.me/diogotr7"
                    variant="outline"
                    rightSection={<IconBrandPaypal size={18} />}
                  >
                    Donate
                  </Button>
                </>
                )}
          </Group>
          <Center>
            <Title order={2}>StarChar</Title>
          </Center>
          <FileInput
            ml="auto"
            w={isMobile ? '100%' : 'auto'}

            color="orange"
            clearable
            accept=".chf"
            placeholder="Upload Chf"
            value={chf}
            onChange={setChf}
          />
        </SimpleGrid>
      </AppShell.Header>
      <AppShell.Main>
        <Stack gap="md" justify="center">
          {isCharacterLoaded && chf
            ? (
              <CharacterEditor />
              )
            : (
              <Center mt="200">
                <Stack gap="sm" align="center">
                  <Title order={2}>Upload .chf file to begin</Title>
                  <Text>You can find your character files in this folder:</Text>
                  <Text>...\StarCitizen\LIVE\user\client\0\CustomCharacters</Text>
                </Stack>
              </Center>
              )}
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
