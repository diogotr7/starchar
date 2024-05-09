import { ColorInput, Fieldset, Group, Stack } from "@mantine/core";
import { useState } from "react";
import { useCharacterContext } from "../Hooks/useCharacterContext";

function MakeupColorPicker() {
  const character = useCharacterContext();

  const [headColor, setHeadColor] = useState(
    character.faceMaterial.faceColors.HeadColor
  );
  const [limbColor, setLimbColor] = useState(character.bodyMaterial.limbColor);
  const [torsoColor, setTorsoColor] = useState(
    character.bodyMaterial.torsoColor
  );
  return (
    <Fieldset legend="Makeup Colors" h={350}>
      <Group>
        <Stack>
          <ColorInput
            size="md"
            mt="md"
            label="Head Color"
            value={headColor}
            onChange={setHeadColor}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Limb Color"
            value={limbColor}
            onChange={setLimbColor}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Torso Color"
            value={torsoColor}
            onChange={setTorsoColor}
          />
        </Stack>
        <Stack>
          <ColorInput
            size="md"
            mt="md"
            label="Head Color"
            value={headColor}
            onChange={setHeadColor}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Limb Color"
            value={limbColor}
            onChange={setLimbColor}
          />
          <ColorInput
            mt="md"
            size="md"
            label="Torso Color"
            value={torsoColor}
            onChange={setTorsoColor}
          />
        </Stack>
      </Group>
    </Fieldset>
  );
}

export default MakeupColorPicker;
