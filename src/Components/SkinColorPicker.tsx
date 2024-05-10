import { ColorInput, Fieldset, Switch, Tooltip } from '@mantine/core'
import { useState } from 'react'
import { IconLock, IconLockOff } from '@tabler/icons-react'
import { useCharacter } from '../Context/CharacterContext'
import type { Character } from '../Chf/Character'

function allColorsEqual(character: Character) {
  return character.faceMaterial.faceColors.headColor === character.bodyMaterial.limbColor
    && character.bodyMaterial.limbColor === character.bodyMaterial.torsoColor
}

function SkinColorPicker() {
  const [character, dispatch] = useCharacter()
  const areColorsEqual = allColorsEqual(character)
  const [locked, setLocked] = useState(areColorsEqual)

  return (
    <Fieldset legend="Skin Colors">
      <Tooltip label="Locks all body parts to have the same skin color" refProp="rootRef">
        <Switch
          label="Lock"
          checked={locked}
          size="md"
          onChange={e => setLocked(e.currentTarget.checked)}
          onLabel={<IconLock size={16} />}
          offLabel={<IconLockOff size={16} />}
        />
      </Tooltip>
      <ColorInput
        disabled={!locked}
        withEyeDropper={false}
        size="md"
        mt="md"
        label="Skin"
        w={120}
        value={locked ? character.faceMaterial.faceColors.headColor : '#000000'}
        onChange={(c) => { dispatch({ type: 'setSkinColor', payload: c }) }}
      />
      <ColorInput
        disabled={locked}
        withEyeDropper={false}
        size="md"
        mt="md"
        label="Head"
        w={120}
        value={character.faceMaterial.faceColors.headColor}
        onChange={(c) => { dispatch({ type: 'setHeadColor', payload: c }) }}
      />
      <ColorInput
        disabled={locked}
        withEyeDropper={false}
        mt="md"
        size="md"
        label="Limb"
        w={120}
        value={character.bodyMaterial.limbColor}
        onChange={(c) => { dispatch({ type: 'setLimbColor', payload: c }) }}
      />
      <ColorInput
        disabled={locked}
        withEyeDropper={false}
        mt="md"
        size="md"
        label="Torso"
        w={120}
        value={character.bodyMaterial.torsoColor}
        onChange={(c) => { dispatch({ type: 'setTorsoColor', payload: c }) }}
      />
    </Fieldset>
  )
}

export default SkinColorPicker
