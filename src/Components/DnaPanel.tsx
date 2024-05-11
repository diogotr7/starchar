import { Button, Center, Fieldset, Group, Input, Modal, NumberInput, Slider, Stack, Text } from '@mantine/core'
import { useCallback, useState } from 'react'
import type { NumberFormatValues } from 'react-number-format'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useCharacter } from '../Context/CharacterContext'
import { type DnaFacePart, dnaFromString } from '../Chf/Dna'

export function DnaPanel() {
  const [opened, { toggle, close }] = useDisclosure(false)
  const [dnaString, setDnaString] = useState('')
  const [character, updateCharacter] = useCharacter()

  const importDna = useCallback(() => {
    updateCharacter((d) => {
      d.dna = dnaFromString(dnaString)
    })
    close()
  }, [updateCharacter, close, dnaString])

  const dnaStringOpen = useCallback(() => {
    setDnaString('')
    toggle()
  }, [toggle, setDnaString])

  const dnaStringClipboard = useCallback(() => {
    navigator.clipboard.writeText(character.dna.dnaString)
    notifications.show({
      title: 'DNA String copied to clipboard',
      message: 'You can now share it with others or import it into another character.',
      autoClose: 2000,
    })
  }, [character])

  return (
    <>
      <Fieldset legend="DNA">
        <Stack>
          <Group>
            <DnaPart label="Left Eyebrow" part="eyebrowLeft" />
            <DnaPart label="Right Eyebrow" part="eyebrowRight" />
            <DnaPart label="Left Eye" part="eyeLeft" />
            <DnaPart label="Right Eye" part="eyeRight" />
          </Group>
          <Group>
            <DnaPart label="Left Ear" part="earLeft" />
            <DnaPart label="Right Ear" part="earRight" />
            <DnaPart label="Left Cheek" part="cheekLeft" />
            <DnaPart label="Right Cheek" part="cheekRight" />
          </Group>
          <Group>
            <DnaPart label="Nose" part="nose" />
            <DnaPart label="Mouth" part="mouth" />
            <DnaPart label="Jaw" part="jaw" />
            <DnaPart label="Crown" part="crown" />
          </Group>
          <Group justify="center">
            <Button onClick={dnaStringOpen}>
              Import DNA String
            </Button>
            <Button onClick={dnaStringClipboard}>
              Export to Clipboard
            </Button>
          </Group>
        </Stack>
      </Fieldset>
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

function DnaPart({ label, part }: { label: string, part: DnaFacePart }) {
  const [character, updateCharacter] = useCharacter()
  const blend = character.dna.blends[part]

  // make this work properly. We want the sum of all the blend percentages to be 100
  // and the others to be updated accordingly when one is changed
  const updateBlend = useCallback((sliderIndex: number, newValue: number) => {
    console.log('updateBlend', sliderIndex, newValue)
  }, [blend, character, part, updateCharacter])

  const isValidHeadId = useCallback((headId: NumberFormatValues) => {
    const id = headId.floatValue ?? 0
    // double check this
    return id >= 0 && id <= 26 && Number.isInteger(id)
  }, [])

  function DnaBlend({ index }: { index: number }) {
    return (
      <Group>
        <NumberInput
          allowDecimal={false}
          allowLeadingZeros={false}
          allowNegative={false}
          isAllowed={isValidHeadId}
          size="xs"
          w={50}
          value={blend[index].headId}
          disabled
          onValueChange={values => updateCharacter((d) => { d.dna.blends[part][index].headId = values.floatValue ?? 0 })}
        />
        <Slider
          w="100"
          disabled
          value={blend[index].percent}
          onChange={value => updateBlend(index, value)}
        />
      </Group>
    )
  }

  return (
    <Fieldset legend={label}>
      <DnaBlend index={0} />
      <DnaBlend index={1} />
      <DnaBlend index={2} />
      <DnaBlend index={3} />
    </Fieldset>
  )
}
