import { Affix, Button, Center, Tabs } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { useCallback } from 'react'
import { useCharacterStore } from '../useCharacterStore'
import SkinColorPicker from './SkinColorPicker'
import { DnaPanel } from './DnaPanel'

function CharacterEditor() {
  const getChf = useCharacterStore(state => state.getChf)
  const exportCharacter = useCallback(() => {
    const buffer = getChf()
    const blob = new Blob([buffer], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'character.chf'
    a.click()
  }, [getChf])

  return (
    <>
      <Tabs variant="outline" defaultValue="colors">
        <Tabs.List justify="center">
          <Tabs.Tab value="colors">
            Colors
          </Tabs.Tab>
          <Tabs.Tab value="dna">
            DNA (in development)
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="colors" m="md">
          <Center>
            <SkinColorPicker />
          </Center>
        </Tabs.Panel>
        <Tabs.Panel value="dna" m="md">
          <Center>
            <DnaPanel />
          </Center>
        </Tabs.Panel>
      </Tabs>
      <Affix zIndex={900} position={{ bottom: 0, right: 0 }}>
        <Center p="md">
          <Button
            size="xl"
            rightSection={<IconDownload size={14} />}
            onClick={exportCharacter}
          >
            Export
          </Button>
        </Center>
      </Affix>
    </>
  )
}
export default CharacterEditor
