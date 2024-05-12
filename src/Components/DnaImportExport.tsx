import { Button, Center, Chip, ChipGroup, Group, Menu, Modal, Stack, Text, TextInput } from '@mantine/core'
import { useCallback, useState } from 'react'
import { useClipboard, useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useShallow } from 'zustand/react/shallow'
import type { DnaFacePart } from '../Chf/Dna'
import { dnaFromString } from '../Chf/Dna'
import { useCharacterStore } from '../useCharacterStore'
import { ruto, teciaPacheco } from '../Utils/dnaStrings'

const allParts: DnaFacePart[] = ['eyebrowLeft', 'eyebrowRight', 'eyeLeft', 'eyeRight', 'earLeft', 'earRight', 'cheekLeft', 'cheekRight', 'nose', 'mouth', 'jaw', 'crown']

export function DnaImportExport() {
  const { getDnaString, updateCharacter } = useCharacterStore(useShallow(state => ({
    getDnaString: state.getDnaString,
    updateCharacter: state.updateCharacter,
  })))
  const [opened, { toggle, close }] = useDisclosure(false)
  const [dnaString, setDnaString] = useState('')
  const [selectedParts, setSelectedParts] = useState<DnaFacePart[]>(allParts)
  const clipboard = useClipboard()

  const importDna = useCallback(() => {
    const dna = dnaFromString(dnaString)

    updateCharacter((d) => {
      for (const part of selectedParts)
        d.dna.blends[part] = dna.blends[part]
    })
    close()
  }, [selectedParts, updateCharacter, close, dnaString])

  const dnaStringOpen = useCallback(() => {
    // reset the modal to default when reopening
    setDnaString('')
    setSelectedParts(allParts)
    toggle()
  }, [toggle, setDnaString])

  const dnaStringClipboard = useCallback(() => {
    clipboard.copy(getDnaString())
    notifications.show({
      title: 'DNA String copied to clipboard',
      message: 'You can now share it with others or import it into another character.',
      autoClose: 2000,
    })
  }, [clipboard, getDnaString])

  const canImport = dnaString.length === 432 && selectedParts.length > 0

  return (
    <>
      <Group justify="center">
        <Button onClick={dnaStringOpen}>
          Import DNA String
        </Button>
        <Button onClick={dnaStringClipboard}>
          Copy to Clipboard
        </Button>
      </Group>
      <Modal
        // export button z-index is 900
        zIndex={1000}
        title="Import DNA String"
        opened={opened}
        size="xl"
        onClose={close}
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
          <Group wrap="nowrap" justify="space-between">
            <TextInput
              value={dnaString}
              onChange={event => setDnaString(event.currentTarget.value)}
              error={dnaString.length !== 432 && dnaString.length > 0}
              w="100%"
              placeholder="9493D0FC...."
            />
            <Menu shadow="md" zIndex={1100} position="top">
              <Menu.Target>
                <Button w={100} variant="default">Presets</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={_ => setDnaString(teciaPacheco)}>
                  Tecia Pacheco
                </Menu.Item>
                <Menu.Item onClick={_ => setDnaString(ruto)}>
                  Ruto
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Text size="sm" mt="sm">
            Choose which parts of the face you want to import.
          </Text>

          <ChipGroup multiple value={selectedParts} onChange={parts => setSelectedParts(parts as DnaFacePart[])}>
            <Group>
              <Chip value="eyebrowLeft">Left Eyebrow</Chip>
              <Chip value="eyebrowRight">Right Eyebrow</Chip>
              <Chip value="eyeLeft">Left Eye</Chip>
              <Chip value="eyeRight">Right Eye</Chip>
              <Chip value="earLeft">Left Ear</Chip>
              <Chip value="earRight">Right Ear</Chip>
              <Chip value="cheekLeft">Left Cheek</Chip>
              <Chip value="cheekRight">Right Cheek</Chip>
              <Chip value="nose">Nose</Chip>
              <Chip value="mouth">Mouth</Chip>
              <Chip value="jaw">Jaw</Chip>
              <Chip value="crown">Crown</Chip>
            </Group>
          </ChipGroup>
          <Center pt="md">
            <Button onClick={importDna} disabled={!canImport}>
              Import
            </Button>
          </Center>
        </Stack>
      </Modal>
    </>
  )
}
