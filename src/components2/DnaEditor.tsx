import { Fieldset, Group, Stack, Text } from "@mantine/core";
import { DnaPart } from "./DnaPart";
import { DnaImportExport } from "./DnaImportExport";

export function DnaEditor() {
  return (
    <Fieldset legend="DNA">
      <Text maw="1100" ta="center">
        This panel adjusts the overall face shape. Each face part can be changed
        fully independently unlike the game (you can have two different eyes for
        example). You can also import and export DNA strings to share your
        characters with others.
        <br />
        Each face part can be a blend of 4 different heads. The sliders control
        the blend amount and the dropdowns control which head is used.
      </Text>
      <Group>
        <Stack>
          <Group>
            <DnaPart label="Left Eyebrow" dnaFacePart="eyebrowLeft" />
            <DnaPart label="Right Eyebrow" dnaFacePart="eyebrowRight" />
            <DnaPart label="Left Eye" dnaFacePart="eyeLeft" />
            <DnaPart label="Right Eye" dnaFacePart="eyeRight" />
          </Group>
          <Group>
            <DnaPart label="Left Ear" dnaFacePart="earLeft" />
            <DnaPart label="Right Ear" dnaFacePart="earRight" />
            <DnaPart label="Left Cheek" dnaFacePart="cheekLeft" />
            <DnaPart label="Right Cheek" dnaFacePart="cheekRight" />
          </Group>
          <Group>
            <DnaPart label="Crown" dnaFacePart="crown" />
            <DnaPart label="Nose" dnaFacePart="nose" />
            <DnaPart label="Mouth" dnaFacePart="mouth" />
            <DnaPart label="Jaw" dnaFacePart="jaw" />
          </Group>
        </Stack>
        <DnaImportExport />
      </Group>
    </Fieldset>
  );
}
