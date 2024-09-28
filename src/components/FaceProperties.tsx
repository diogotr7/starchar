import { Fieldset, Group, Stack } from "@mantine/core";
import { useCharacterStore } from "../useCharacterStore";
import { SliderInput } from "./SliderInput";

export function FaceProperties() {
  const { faceMaterial, updateCharacter } = useCharacterStore((state) => ({
    faceMaterial: state.character.faceMaterial,
    updateCharacter: state.updateCharacter,
  }));

  return (
    <Fieldset legend="Face Properties">
      <Group>
        <Stack>
          <SliderInput
            label="Freckle Amount"
            value={faceMaterial.faceInfo.freckleAmount * 100}
            onChange={(v) =>
              updateCharacter((d) => {
                d.faceMaterial.faceInfo.freckleAmount = v / 100;
              })
            }
          />
          <SliderInput
            label="Freckle Opacity"
            value={faceMaterial.faceInfo.freckleOpacity * 100}
            onChange={(v) =>
              updateCharacter((d) => {
                d.faceMaterial.faceInfo.freckleOpacity = v / 100;
              })
            }
          />
          <SliderInput
            label="Sun Spots Amount"
            value={faceMaterial.faceInfo.sunSpotsAmount * 100}
            onChange={(v) =>
              updateCharacter((d) => {
                d.faceMaterial.faceInfo.sunSpotsAmount = v / 100;
              })
            }
          />
          <SliderInput
            label="Sun Spot Opacity"
            value={faceMaterial.faceInfo.sunSpotOpacity * 100}
            onChange={(v) =>
              updateCharacter((d) => {
                d.faceMaterial.faceInfo.sunSpotOpacity = v / 100;
              })
            }
          />
        </Stack>
      </Group>
    </Fieldset>
  );
}
