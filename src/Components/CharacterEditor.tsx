import { Affix, Button, Group, Stack } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { useCallback } from 'react'
import { useCharacter } from '../Context/CharacterContext'
import { createChf } from '../Chf/ChfFile'
import SkinColorPicker from './SkinColorPicker'
import { FaceProperties } from './FaceProperties'
import { CharacterJsonDisplay } from './CharacterJsonDisplay'

function CharacterEditor() {
  const [character] = useCharacter()
  const exportCharacter = useCallback(() => {
    const buffer = createChf(character)
    const blob = new Blob([buffer], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'character.chf'
    a.click()
  }, [character])

  return (
    <>
      <Stack justify="flex-start">
        <Group justify="space-evenly">
          <SkinColorPicker />
          <FaceProperties />
        </Group>
        <CharacterJsonDisplay />
      </Stack>
      <Affix zIndex={1000}>
        <Group p="xl">
          <Button
            rightSection={<IconDownload size={14} />}
            onClick={exportCharacter}
          >
            Export
          </Button>
        </Group>
      </Affix>
    </>
  )
}
export default CharacterEditor
