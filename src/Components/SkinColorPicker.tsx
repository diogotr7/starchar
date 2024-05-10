import { ColorInput, Fieldset, SegmentedControl } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useCharacter } from '../Context/CharacterContext'

function SkinColorPicker() {
  const [character] = useCharacter()

  const areColorsEqual = character.faceMaterial.faceColors.headColor === character.bodyMaterial.limbColor
    && character.bodyMaterial.limbColor === character.bodyMaterial.torsoColor
  const [headColor, setHeadColor] = useState(character.faceMaterial.faceColors.headColor)
  const [limbColor, setLimbColor] = useState(character.bodyMaterial.limbColor)

  const [
    torsoColor,
    setTorsoColor,
  ] = useState(character.bodyMaterial.torsoColor)
  const [sharedColor, setSharedColor] = useState(areColorsEqual ? 'same' : 'diff')

  // any of the above 3 *should* be fine here.
  const [skinColor, setSkinColor] = useState(character.bodyMaterial.torsoColor)

  useEffect(() => {
    if (sharedColor === 'same') {
      setHeadColor(skinColor)
      setLimbColor(skinColor)
      setTorsoColor(skinColor)
    }
  }, [sharedColor, skinColor])

  return (
    <Fieldset legend="Skin Colors">
      <SegmentedControl
        fullWidth
        data={[
          { value: 'same', label: 'Same' },
          { value: 'diff', label: 'Different' },
        ]}
        value={sharedColor}
        onChange={setSharedColor}
      />
      <ColorInput
        disabled={sharedColor === 'diff'}
        size="md"
        mt="md"
        label="Skin Color"
        value={skinColor}
        onChange={setSkinColor}
      />
      <ColorInput
        disabled={sharedColor === 'same'}
        size="md"
        mt="md"
        label="Head Color"
        value={headColor}
        onChange={setHeadColor}
      />
      <ColorInput
        disabled={sharedColor === 'same'}
        mt="md"
        size="md"
        label="Limb Color"
        value={limbColor}
        onChange={setLimbColor}
      />
      <ColorInput
        disabled={sharedColor === 'same'}
        mt="md"
        size="md"
        label="Torso Color"
        value={torsoColor}
        onChange={setTorsoColor}
      />
    </Fieldset>
  )
}

export default SkinColorPicker
