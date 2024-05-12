import { Button, Center, Group, Input, Modal, Stack, Text } from '@mantine/core'
import { useCallback, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useShallow } from 'zustand/react/shallow'
import { dnaFromString } from '../Chf/Dna'
import { useCharacterStore } from '../useCharacterStore'

export function DnaImportExport() {
  const { getDnaString, updateCharacter } = useCharacterStore(useShallow(state => ({
    getDnaString: state.getDnaString,
    updateCharacter: state.updateCharacter,
  })))
  const [opened, { toggle, close }] = useDisclosure(false)
  const [dnaString, setDnaString] = useState('')

  const importDna = useCallback(() => {
    updateCharacter((d) => { d.dna = dnaFromString(dnaString) })
    close()
  }, [updateCharacter, close, dnaString])

  const dnaStringOpen = useCallback(() => {
    setDnaString('')
    toggle()
  }, [toggle, setDnaString])

  const dnaStringClipboard = useCallback(() => {
    navigator.clipboard.writeText(getDnaString())
    notifications.show({
      title: 'DNA String copied to clipboard',
      message: 'You can now share it with others or import it into another character.',
      autoClose: 2000,
    })
  }, [getDnaString])

  return (
    <>
      <Group justify="center">
        <Button onClick={dnaStringOpen}>
          Import DNA String
        </Button>
        <Button onClick={dnaStringClipboard}>
          Export to Clipboard
        </Button>
      </Group>
      <Modal
        // export button z-index is 900
        zIndex={1000}
        title="Import DNA String"
        opened={opened}
        size="xl"
        onClose={close}
        closeOnClickOutside={false}
        closeOnEscape={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <Stack>
          <Text size="lg">
            Enter the DNA string of the character you want to import. These can be shared between players or imported from NPCs from the game files.
          </Text>
          <Input
            value={dnaString}
            onChange={event => setDnaString(event.currentTarget.value)}
            size="xl"
            w="100%"
            placeholder="9493D0FC...."
          />
          <Center pt="md">
            <Button onClick={importDna}>
              Import
            </Button>
          </Center>
        </Stack>
      </Modal>
    </>

  )
}
