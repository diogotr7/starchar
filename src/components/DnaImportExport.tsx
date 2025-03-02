import {
  Button,
  Center,
  Chip,
  ChipGroup,
  Fieldset,
  Group,
  Image,
  Menu,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import JSZip from "jszip";
import { useCallback, useEffect, useState } from "react";
import { chfToBytes } from "../schema/Chf";
import {
  allFaceParts,
  Dna,
  DnaFace,
  dnaFromString,
  dnaStrings,
  dnaToString,
  getFaceDna,
  getRandDna,
} from "../schema/Dna";
import { getBodyType } from "../schema/GuidMapping";
import { useChf, useChfStore } from "../useChfStore";
import { download } from "../utils";

export function DnaImportExport() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [dnaString, setDnaString] = useState("");
  const [selectedParts, setSelectedParts] =
    useState<(keyof DnaFace)[]>(allFaceParts);
  const clipboard = useClipboard();
  const [faceId, setFaceId] = useState(0);

  const { bodyType, dna } = useChf((c) => ({
    bodyType: getBodyType(c.body_type_id),
    dna: c.dna,
  }));

  const updateCharacter = useChfStore((c) => c.updateChf);
  const rawChf = useChf((c) => c);

  useEffect(() => {
    setFaceId(0);
  }, [bodyType]);

  const importDna = useCallback(() => {
    let newDna: Dna;
    if (dnaString.length === 384) {
      // partial dna string, old format. need to fix and convert to new format
      try {
        newDna = dnaFromString(dnaString);
      } catch {
        notifications.show({
          title: "Invalid DNA String",
          message:
            "The DNA string you entered has a Head ID too high. Perhaps it's a female dna string applied to a male character?",
          autoClose: 5000,
        });
        return;
      }
    } else {
      newDna = dnaFromString(dnaString);
    }

    updateCharacter((d) => {
      for (const part of selectedParts) {
        d.dna.face_parts[part] = newDna.face_parts[part];
      }
    });
    close();
  }, [dnaString, close, bodyType, selectedParts]);

  const dnaStringOpen = useCallback(() => {
    // reset the modal to default when reopening
    setDnaString("");
    setSelectedParts(allFaceParts);
    toggle();
  }, [toggle]);

  const dnaStringClipboard = useCallback(() => {
    clipboard.copy(dnaToString(dna));
    notifications.show({
      title: "DNA String copied to clipboard",
      message:
        "You can now share it with others or import it into another character.",
      autoClose: 2000,
    });
  }, [clipboard]);

  const canImport =
    (dnaString.length === 432 || dnaString.length === 384) &&
    selectedParts.length > 0;

  const dump = useCallback(async () => {
    const minHeadId = 0;
    const maxHeadId = 70;

    const cloneChf = { ...rawChf };

    const baseFileName = `head_${bodyType === "Male" ? "m" : "f"}`;

    const zip = new JSZip();
    for (let i = minHeadId; i <= maxHeadId; i++) {
      const newDna = getFaceDna(cloneChf.dna, i);
      const newChf = { ...cloneChf, dna: newDna };

      const bytes = chfToBytes(newChf);
      zip.file(`${baseFileName}_${i.toString().padStart(2, "0")}.chf`, bytes);
    }

    const blob = await zip.generateAsync({ type: "blob" });

    download(blob, "all_heads.zip");
  }, [rawChf, bodyType]);

  return (
    <>
      <Stack w={200}>
        <Fieldset p="md" legend="Head Id Preview">
          <Image
            radius="sm"
            mb="sm"
            src={`/${bodyType === "Male" ? "m" : "f"}_head_ids/${faceId
              .toString()
              .padStart(2, "0")}.webp`}
          />
          <Group>
            <NumberInput
              size="xs"
              w={45}
              value={faceId}
              min={0}
              //max={maxHeadIdForBodyType(bodyType)}
              allowDecimal={false}
              allowLeadingZeros={false}
              allowNegative={false}
              onChange={(v) =>
                setFaceId(typeof v === "string" ? Number.parseInt(v) : v)
              }
            />
            <Button
              size="xs"
              onClick={() =>
                updateCharacter((draft) => {
                  draft.dna = getFaceDna(draft.dna, faceId);
                })
              }
            >
              Use Head ID
            </Button>
          </Group>
        </Fieldset>
        <Fieldset legend="DNA String" p="md">
          <Stack gap="sm" p="0">
            <Button onClick={dnaStringOpen}>Import DNA String</Button>
            <Button onClick={dnaStringClipboard}>Copy DNA String</Button>
            <Button
              onClick={() => {
                updateCharacter((draft) => {
                  draft.dna = getRandDna(draft.dna, 51);
                });
              }}
            >
              Randomize DNA
            </Button>
            <Button onClick={dump} color="red">
              Dump all heads
            </Button>
          </Stack>
        </Fieldset>
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
            Enter the DNA string of the character you want to import. These can
            be shared between players or imported from NPCs from the game files.
          </Text>
          <Group wrap="nowrap" justify="space-between">
            <TextInput
              value={dnaString}
              onChange={(event) => setDnaString(event.currentTarget.value)}
              error={
                !canImport && dnaString.length > 0 ? "Invalid DNA string" : null
              }
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

          <ChipGroup
            multiple={true}
            value={selectedParts}
            onChange={(parts) => setSelectedParts(parts as (keyof DnaFace)[])}
          >
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
