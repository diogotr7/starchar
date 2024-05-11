import { Button, Center, Fieldset, Group, Input, Modal, NumberInput, Slider, Stack, Text } from '@mantine/core'
import { useCallback, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useCharacter } from '../Context/CharacterContext'
import type { DnaFacePart } from '../Chf/Dna'
import { dnaFromString, dnaToString } from '../Chf/Dna'

export function DnaPanel() {
  const [opened, { toggle, close }] = useDisclosure(false)
  const [dnaString, setDnaString] = useState('')
  const { character, updateCharacter } = useCharacter()

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
    navigator.clipboard.writeText(dnaToString(character))
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
  const { character, updateCharacter } = useCharacter()
  const updateBlend = useCallback((index: number, value: number) => {
    updateCharacter((d) => {
      d.dna.blends[part][index].value = value
    })
  }, [part, updateCharacter])

  const updateHeadId = useCallback((index: number, value: string | number) => {
    if (typeof value === 'string')
      value = Number.parseInt(value) ?? 0

    const id = value ?? 0
    // double check this
    // 44 = broken
    // 43 = valid but seems unobtainable regularly
    updateCharacter((d) => { d.dna.blends[part][index].headId = id })
  }, [part, updateCharacter])

  return (
    <Fieldset legend={label}>
      <DnaBlend
        valueNumber={character.dna.blends[part][0].headId}
        onChangeNumber={v => updateHeadId(0, v)}
        valueSlider={character.dna.blends[part][0].value}
        onChangeSlider={v => updateBlend(0, v)}
      />
      <DnaBlend
        valueNumber={character.dna.blends[part][1].headId}
        onChangeNumber={v => updateHeadId(1, v)}
        valueSlider={character.dna.blends[part][1].value}
        onChangeSlider={v => updateBlend(1, v)}
      />
      <DnaBlend
        valueNumber={character.dna.blends[part][2].headId}
        onChangeNumber={v => updateHeadId(2, v)}
        valueSlider={character.dna.blends[part][2].value}
        onChangeSlider={v => updateBlend(2, v)}
      />
      <DnaBlend
        valueNumber={character.dna.blends[part][3].headId}
        onChangeNumber={v => updateHeadId(3, v)}
        valueSlider={character.dna.blends[part][3].value}
        onChangeSlider={v => updateBlend(3, v)}
      />
    </Fieldset>
  )
}

interface DnaBlendProps {
  valueSlider: number
  valueNumber: number
  onChangeSlider: (value: number) => void
  onChangeNumber: (value: number | string) => void
}

function DnaBlend({ valueSlider, valueNumber, onChangeSlider, onChangeNumber }: DnaBlendProps) {
  return (
    <Group wrap="nowrap">
      <NumberInput
        allowDecimal={false}
        allowLeadingZeros={false}
        inputMode="numeric"
        allowNegative={false}
        size="xs"
        w={50}
        min={0}
        max={43}
        value={valueNumber}
        onChange={onChangeNumber}
      />
      <Slider
        w="100"
        min={0}
        max={65535}
        step={1}
        label={value => `${Math.round(value / 65535 * 100)}%`}
        value={valueSlider}
        onChange={onChangeSlider}
      />
    </Group>
  )
}
