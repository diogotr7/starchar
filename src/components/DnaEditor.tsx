import { Center, Fieldset, Group, Stack, Text } from "@mantine/core";
import { DnaImportExport } from "./DnaImportExport";
import { DnaPart } from "./DnaPart";

export function DnaEditor() {
  return (
    <Stack>
      <Fieldset legend="DNA">
        <Text maw="1100" ta="center">
          This panel adjusts the overall face shape. Each face part can be
          changed fully independently unlike the game (you can have two
          different eyes for example). You can also import and export DNA
          strings to share your characters with others.
          <br />
          Each face part can be a blend of 4 different heads. The amount of each
          head that contributes to the blend can be adjusted by dragging the
          blue dot. The closer to each corner, the more that head contributes to
          the blend. If the dot is at the center of the square, all heads
          contribute equally to the blend.
          <br />
          Each corner's head id can be adjusted with the number picker next to
          it.
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
          <Center>
            <DnaImportExport />
          </Center>
        </Group>
      </Fieldset>
    </Stack>
  );
}
