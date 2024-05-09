import { ColorInput, Fieldset, SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCharacterContext } from "../Hooks/useCharacterContext";

function SkinColorPicker() {
  const character = useCharacterContext();

  const areColorsEqual =
    character.faceMaterial.faceColors.headColor ===
      character.bodyMaterial.limbColor &&
    character.bodyMaterial.limbColor === character.bodyMaterial.torsoColor;
  const [headColor, setHeadColor] = useState(
    character.faceMaterial.faceColors.headColor
  );
  const [limbColor, setLimbColor] = useState(character.bodyMaterial.limbColor);
  const [torsoColor, setTorsoColor] = useState(
    character.bodyMaterial.torsoColor
  );

  const [sharedColor, setSharedColor] = useState(
    areColorsEqual ? "same" : "diff"
  );

  //any of the above 3 *should* be fine here.
  const [skinColor, setSkinColor] = useState(character.bodyMaterial.torsoColor);

  useEffect(() => {
    // if (sharedColor === "same") {
    //   setHeadColor(skinColor);
    //   setLimbColor(skinColor);
    //   setTorsoColor(skinColor);
    // }
  }, [sharedColor, skinColor]);

  return (
    <Fieldset legend="Skin Colors" h={350}>
      <SegmentedControl
        transitionDuration={500}
        fullWidth
        data={[
          { value: "same", label: "Same" },
          { value: "diff", label: "Different" },
        ]}
        value={sharedColor}
        onChange={setSharedColor}
      />
      {sharedColor === "same" ? (
        <ColorInput
          size="md"
          mt="md"
          label="Skin Color"
          value={skinColor}
          onChange={setSkinColor}
        />
      ) : (
        <>
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
        </>
      )}
    </Fieldset>
  );
}

export default SkinColorPicker;
