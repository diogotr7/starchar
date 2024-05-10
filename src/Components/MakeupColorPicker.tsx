import { ColorInput, Fieldset, Group, Stack } from '@mantine/core'
import { useState } from 'react'
import { useCharacter } from '../Context/CharacterContext'

function MakeupColorPicker() {
  const [character] = useCharacter()

  const [eyeColor1, setEyeColor1] = useState(character.faceMaterial.faceColors.eyeMakeupColor1)
  const [eyeColor2, setEyeColor2] = useState(character.faceMaterial.faceColors.eyeMakeupColor2)
  const [eyeColor3, setEyeColor3] = useState(character.faceMaterial.faceColors.eyeMakeupColor3)

  const [cheekColor1, setCheekColor1] = useState(character.faceMaterial.faceColors.cheekMakeupColor1)
  const [cheekColor2, setCheekColor2] = useState(character.faceMaterial.faceColors.cheekMakeupColor2)
  const [cheekColor3, setCheekColor3] = useState(character.faceMaterial.faceColors.cheekMakeupColor3)

  const [lipColor1, setLipColor1] = useState(character.faceMaterial.faceColors.lipMakeupColor1)
  const [lipColor2, setLipColor2] = useState(character.faceMaterial.faceColors.lipMakeupColor2)
  const [lipColor3, setLipColor3] = useState(character.faceMaterial.faceColors.lipMakeupColor3)

  return (
    <Fieldset legend="Makeup Colors" w={900}>
      <Group>
        <Stack>
          <ColorInput
            size="md"
            mt="md"
            label="Eye Makeup 1"
            value={eyeColor1}
            onChange={setEyeColor1}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Eye Makeup 2"
            value={eyeColor2}
            onChange={setEyeColor2}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Eye Makeup 3"
            value={eyeColor3}
            onChange={setEyeColor3}
          />
        </Stack>
        <Stack>
          <ColorInput
            size="md"
            mt="md"
            label="Cheek Makeup 1"
            value={cheekColor1}
            onChange={setCheekColor1}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Cheek Makeup 2"
            value={cheekColor2}
            onChange={setCheekColor2}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Cheek Makeup 3"
            value={cheekColor3}
            onChange={setCheekColor3}
          />
        </Stack>
        <Stack>
          <ColorInput
            size="md"
            mt="md"
            label="Lip Makeup 1"
            value={lipColor1}
            onChange={setLipColor1}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Lip Makeup 2"
            value={lipColor2}
            onChange={setLipColor2}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Lip Makeup 3"
            value={lipColor3}
            onChange={setLipColor3}
          />
        </Stack>
      </Group>
    </Fieldset>
  )
}

export default MakeupColorPicker
