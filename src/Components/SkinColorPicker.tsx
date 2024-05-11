import { Center, Divider, Fieldset, Switch, Tooltip } from '@mantine/core'
import { useState } from 'react'
import { IconLock, IconLockOff } from '@tabler/icons-react'
import { useCharacter } from '../Context/CharacterContext'
import { SmallColorInput } from './SmallColorInput'

function SkinColorPicker() {
  const { character, updateCharacter } = useCharacter()
  const [locked, setLocked] = useState(true)

  return (
    <Fieldset legend="Colors">
      <Center>
        <Tooltip label="Locks all body parts to have the same skin color" refProp="rootRef">
          <Switch
            label="Lock"
            checked={locked}
            size="md"
            onChange={e => setLocked(e.currentTarget.checked)}
            onLabel={<IconLock size={14} />}
            offLabel={<IconLockOff size={14} />}
          />
        </Tooltip>
      </Center>
      <SmallColorInput
        disabled={!locked}
        label="Skin"
        value={locked ? character.faceMaterial.faceColors.headColor : '#00000000'}
        onChange={(c) => {
          updateCharacter((d) => {
            d.bodyMaterial.limbColor = c
            d.bodyMaterial.torsoColor = c
            d.faceMaterial.faceColors.headColor = c
          })
        }}
      />
      <SmallColorInput
        disabled={locked}
        label="Head"
        value={character.faceMaterial.faceColors.headColor}
        onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.headColor = c }) }}
      />
      <SmallColorInput
        disabled={locked}
        label="Limb"
        value={character.bodyMaterial.limbColor}
        onChange={(c) => { updateCharacter((d) => { d.bodyMaterial.limbColor = c }) }}
      />
      <SmallColorInput
        disabled={locked}
        label="Torso"
        value={character.bodyMaterial.torsoColor}
        onChange={(c) => { updateCharacter((d) => { d.bodyMaterial.torsoColor = c }) }}
      />

      <Divider mt="lg" mb="sm" />
      <SmallColorInput
        label="Eye"
        value={character.eyeMaterial.colors.color1}
        onChange={(c) => { updateCharacter((d) => { d.eyeMaterial.colors.color1 = c }) }}
      />

    </Fieldset>
  )
}

export default SkinColorPicker
