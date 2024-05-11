import { Fieldset, Group, Stack } from '@mantine/core'
import { useCharacter } from '../Context/CharacterContext'
import { SmallColorInput } from './SmallColorInput'

function MakeupColorPicker() {
  const { character, updateCharacter } = useCharacter()

  return (
    <Fieldset legend="Makeup Colors">
      <Group>
        <Stack>
          <SmallColorInput
            label="Eye Makeup 1"
            value={character.faceMaterial.faceColors.eyeMakeupColor1}
            onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.eyeMakeupColor1 = c }) }}
          />
          <SmallColorInput
            label="Eye Makeup 2"
            value={character.faceMaterial.faceColors.eyeMakeupColor2}
            onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.eyeMakeupColor2 = c }) }}
          />
          <SmallColorInput
            label="Eye Makeup 3"
            value={character.faceMaterial.faceColors.eyeMakeupColor3}
            onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.eyeMakeupColor3 = c }) }}
          />
        </Stack>
        <Stack>
          <SmallColorInput
            label="Cheek Makeup 1"
            value={character.faceMaterial.faceColors.cheekMakeupColor1}
            onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.cheekMakeupColor1 = c }) }}
          />
          <SmallColorInput
            label="Cheek Makeup 2"
            value={character.faceMaterial.faceColors.cheekMakeupColor2}
            onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.cheekMakeupColor2 = c }) }}
          />
          <SmallColorInput
            label="Cheek Makeup 3"
            value={character.faceMaterial.faceColors.cheekMakeupColor3}
            onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.cheekMakeupColor3 = c }) }}
          />
        </Stack>
        <Stack>
          <SmallColorInput
            label="Lip Makeup 1"
            value={character.faceMaterial.faceColors.lipMakeupColor1}
            onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.lipMakeupColor1 = c }) }}
          />
          <SmallColorInput
            label="Lip Makeup 2"
            value={character.faceMaterial.faceColors.lipMakeupColor2}
            onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.lipMakeupColor2 = c }) }}
          />
          <SmallColorInput
            label="Lip Makeup 3"
            value={character.faceMaterial.faceColors.lipMakeupColor3}
            onChange={(c) => { updateCharacter((d) => { d.faceMaterial.faceColors.lipMakeupColor3 = c }) }}
          />
        </Stack>
      </Group>
    </Fieldset>
  )
}

export default MakeupColorPicker
