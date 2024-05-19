import { Center, Divider, Fieldset, Switch, Tooltip } from "@mantine/core";
import { IconLock, IconLockOff } from "@tabler/icons-react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCharacterStore } from "../useCharacterStore";
import { SmallColorInput } from "./SmallColorInput";

export function SkinColorPicker() {
  const { bodyMaterial, faceMaterial, eyeMaterial, updateCharacter } = useCharacterStore(
    useShallow((state) => {
      return {
        bodyMaterial: state.character.bodyMaterial,
        faceMaterial: state.character.faceMaterial,
        eyeMaterial: state.character.eyeMaterial,
        updateCharacter: state.updateCharacter,
      };
    }),
  );
  const [locked, setLocked] = useState(true);

  return (
    <Fieldset legend="Colors">
      <Center>
        <Tooltip label="Locks all body parts to have the same skin color" refProp="rootRef">
          <Switch
            label="Lock"
            checked={locked}
            size="md"
            onChange={(e) => setLocked(e.currentTarget.checked)}
            onLabel={<IconLock size={14} />}
            offLabel={<IconLockOff size={14} />}
          />
        </Tooltip>
      </Center>
      <SmallColorInput
        disabled={!locked}
        label="Skin"
        value={locked ? faceMaterial.faceColors.headColor : "#00000000"}
        onChange={(c) => {
          updateCharacter((d) => {
            d.bodyMaterial.limbColor = c;
            d.bodyMaterial.torsoColor = c;
            d.faceMaterial.faceColors.headColor = c;
          });
        }}
      />
      <SmallColorInput
        disabled={locked}
        label="Head"
        value={faceMaterial.faceColors.headColor}
        onChange={(c) => {
          updateCharacter((d) => {
            d.faceMaterial.faceColors.headColor = c;
          });
        }}
      />
      <SmallColorInput
        disabled={locked}
        label="Limb"
        value={bodyMaterial.limbColor}
        onChange={(c) => {
          updateCharacter((d) => {
            d.bodyMaterial.limbColor = c;
          });
        }}
      />
      <SmallColorInput
        disabled={locked}
        label="Torso"
        value={bodyMaterial.torsoColor}
        onChange={(c) => {
          updateCharacter((d) => {
            d.bodyMaterial.torsoColor = c;
          });
        }}
      />

      <Divider mt="lg" mb="sm" />
      <SmallColorInput
        label="Eye"
        value={eyeMaterial.colors.color1}
        onChange={(c) => {
          updateCharacter((d) => {
            d.eyeMaterial.colors.color1 = c;
          });
        }}
      />
    </Fieldset>
  );
}
