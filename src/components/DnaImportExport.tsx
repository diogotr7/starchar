import { Button, Center, Chip, ChipGroup, Fieldset, Group, Image, Menu, Modal, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import type { Dna, DnaFacePart } from "../chf/Dna";
import { dnaFromString, dnaFromStringOld, getFaceDna, getRandDna, maxHeadIdForBodyType } from "../chf/Dna";
import { useCharacterStore } from "../useCharacterStore";

const allParts: DnaFacePart[] = [
  "eyebrowLeft",
  "eyebrowRight",
  "eyeLeft",
  "eyeRight",
  "earLeft",
  "earRight",
  "cheekLeft",
  "cheekRight",
  "nose",
  "mouth",
  "jaw",
  "crown",
];

export const teciaPacheco =
  "9493D0FC54EBF49E9CE19B65000000000C0004000400FFFF00000D0000000D00000000000000000000000B00000004000000040000000B0000000B0000000C0000001D00000019000000210000002100000008000000080000000200000002000000020000000D0000000D0000000A0000000C0000001100FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900FFFF2900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
export const ruto =
  "9493D0FCF6676CDDD4F8CC65000000000C0004000400FFFF000001000000010000000A0000000A0000000B0000000D0000000D0000000400000004000000020000000000000009000000000000000000000006000000060000000A0000000A0000000A00000009000000090000000E0000000C0000000F00FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300FFFF1300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
export const hurston =
  "9493D0FCF6676CDD048AE565000000000C0004000400FFFFFFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100FFFF2100000020000000200000002000000020000000200000002000000020000000200000002000000020000000200000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

export const dnaStrings = [
  { name: "Tecia Pacheco", dna: teciaPacheco },
  { name: "Ruto", dna: ruto },
  { name: "Hurston", dna: hurston },
];

export function DnaImportExport() {
  const { getDnaString, updateCharacter, bodyType } = useCharacterStore((state) => ({
    getDnaString: state.getDnaString,
    updateCharacter: state.updateCharacter,
    bodyType: state.character.bodyType,
  }));
  const [opened, { toggle, close }] = useDisclosure(false);
  const [dnaString, setDnaString] = useState("");
  const [selectedParts, setSelectedParts] = useState<DnaFacePart[]>(allParts);
  const clipboard = useClipboard();
  const [faceId, setFaceId] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: make sure the face id is within bounds when changing body type
  useEffect(() => {
    setFaceId(0);
  }, [bodyType]);

  const importDna = useCallback(() => {
    let newDna: Dna;
    if (dnaString.length === 384) {
      // partial dna string, old format. need to fix and convert to new format
      try {
        newDna = dnaFromStringOld(dnaString, bodyType);
      } catch {
        notifications.show({
          title: "Invalid DNA String",
          message: "The DNA string you entered has a Head ID too high. Perhaps it's a female dna string applied to a male character?",
          autoClose: 5000,
        });
        return;
      }
    } else {
      newDna = dnaFromString(dnaString);
    }

    updateCharacter((d) => {
      for (const part of selectedParts) {
        d.dna.blends[part] = newDna.blends[part];
      }
    });
    close();
  }, [dnaString, updateCharacter, close, bodyType, selectedParts]);

  const dnaStringOpen = useCallback(() => {
    // reset the modal to default when reopening
    setDnaString("");
    setSelectedParts(allParts);
    toggle();
  }, [toggle]);

  const dnaStringClipboard = useCallback(() => {
    clipboard.copy(getDnaString());
    notifications.show({
      title: "DNA String copied to clipboard",
      message: "You can now share it with others or import it into another character.",
      autoClose: 2000,
    });
  }, [clipboard, getDnaString]);

  const canImport = (dnaString.length === 432 || dnaString.length === 384) && selectedParts.length > 0;

  return (
    <>
      <Stack w={335}>
        <Fieldset p="md" legend="Head Id Preview">
          <Image radius="sm" mb="sm" src={`/${bodyType === "male" ? "m" : "f"}_head_ids/${faceId.toString().padStart(2, "0")}.webp`} />
          <Group justify="space-around">
            <Button
              size="xs"
              onClick={() =>
                updateCharacter((draft) => {
                  draft.dna = getFaceDna(faceId);
                })
              }
            >
              Set to face id
            </Button>
            <NumberInput
              size="xs"
              w={60}
              value={faceId}
              min={0}
              max={maxHeadIdForBodyType(bodyType)}
              allowDecimal={false}
              allowLeadingZeros={false}
              allowNegative={false}
              onChange={(v) => setFaceId(typeof v === "string" ? Number.parseInt(v) : v)}
            />
          </Group>
        </Fieldset>
        <Button onClick={dnaStringOpen}>Import DNA String</Button>
        <Button onClick={dnaStringClipboard}>Copy to Clipboard</Button>
        <Button
          onClick={() =>
            updateCharacter((draft) => {
              draft.dna = getRandDna(bodyType);
            })
          }
        >
          Randomize DNA
        </Button>
      </Stack>
      <Modal
        // export button z-index is 900
        zIndex={1000}
        title="Import DNA String"
        opened={opened}
        size="xl"
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered={true}
      >
        <Stack>
          <Text size="lg">
            Enter the DNA string of the character you want to import. These can be shared between players or imported from NPCs from the game files.
          </Text>
          <Group wrap="nowrap" justify="space-between">
            <TextInput
              value={dnaString}
              onChange={(event) => setDnaString(event.currentTarget.value)}
              error={!canImport && dnaString.length > 0 ? "Invalid DNA string" : null}
              w="100%"
              placeholder="9493D0FC...."
            />
            <Menu shadow="md" zIndex={1100} position="top">
              <Menu.Target>
                <Button w={100} variant="default">
                  Presets
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {dnaStrings.map(({ name, dna }, _) => (
                  <Menu.Item key={name} onClick={(_) => setDnaString(dna)}>
                    {name}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Text size="sm" mt="sm">
            Choose which parts of the face you want to import.
          </Text>

          <ChipGroup multiple={true} value={selectedParts} onChange={(parts) => setSelectedParts(parts as DnaFacePart[])}>
            <Group>
              <Chip value="eyebrowLeft">Left Eyebrow</Chip>
              <Chip value="eyebrowRight">Right Eyebrow</Chip>
              <Chip value="eyeLeft">Left Eye</Chip>
              <Chip value="eyeRight">Right Eye</Chip>
              <Chip value="earLeft">Left Ear</Chip>
              <Chip value="earRight">Right Ear</Chip>
              <Chip value="cheekLeft">Left Cheek</Chip>
              <Chip value="cheekRight">Right Cheek</Chip>
              <Chip value="nose">Nose</Chip>
              <Chip value="mouth">Mouth</Chip>
              <Chip value="jaw">Jaw</Chip>
              <Chip value="crown">Crown</Chip>
            </Group>
          </ChipGroup>
          <Center pt="md">
            <Button onClick={importDna} disabled={!canImport}>
              Import
            </Button>
          </Center>
        </Stack>
      </Modal>
    </>
  );
}
