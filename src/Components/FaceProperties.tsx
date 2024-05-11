import { Fieldset, Group, Stack } from '@mantine/core'
import { useCharacter } from '../Context/CharacterContext'
import { SliderInput } from './SliderInput'

export function FaceProperties() {
  const { character, updateCharacter } = useCharacter()

  return (
    <Fieldset legend="Face Properties">
      <Group>
        <Stack>
          <SliderInput
            label="Freckle Amount"
            value={character.faceMaterial.faceInfo.freckleAmount * 100}
            onChange={v => updateCharacter((d) => { d.faceMaterial.faceInfo.freckleAmount = v / 100 })}
          />
          <SliderInput
            label="Freckle Opacity"
            value={character.faceMaterial.faceInfo.freckleOpacity * 100}
            onChange={v => updateCharacter((d) => { d.faceMaterial.faceInfo.freckleOpacity = v / 100 })}
          />
          <SliderInput
            label="Sun Spots Amount"
            value={character.faceMaterial.faceInfo.sunSpotsAmount * 100}
            onChange={v => updateCharacter((d) => { d.faceMaterial.faceInfo.sunSpotsAmount = v / 100 })}
          />
          <SliderInput
            label="Sun Spot Opacity"
            value={character.faceMaterial.faceInfo.sunSpotOpacity * 100}
            onChange={v => updateCharacter((d) => { d.faceMaterial.faceInfo.sunSpotOpacity = v / 100 })}
          />
        </Stack>
      </Group>
    </Fieldset>
  )
}
