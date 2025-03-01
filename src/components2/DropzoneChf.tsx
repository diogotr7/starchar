import { Button, Group, Stack, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { IconFileUpload, IconUpload, IconX } from "@tabler/icons-react";

async function fetchFile(filePath: string): Promise<File> {
  const result = await fetch(`/${filePath}`);
  const blob = await result.blob();
  return new File([blob], filePath);
}

interface DropzoneProps {
  onDrop: (files: File) => void;
}

export function DropzoneChf({ onDrop }: DropzoneProps) {
  return (
    <Stack
      h="calc(100vh - 60px - 32px)" // viewport height - header height - padding
    >
      <Dropzone
        multiple={false}
        accept={{
          "application/chf": [".chf"],
        }}
        onDrop={(files) => files[0] && onDrop(files[0])}
        flex="1 1 0"
        mih="0"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Group justify="center" gap="xl" style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFileUpload />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline={true}>
              Drag .chf file to begin
            </Text>
            <Text size="sm" c="dimmed" inline={true} mt={7}>
              You can find your character files in this folder:
            </Text>
            <Text size="sm" c="dimmed" inline={true} mt={7}>
              ...\StarCitizen\LIVE\user\client\0\CustomCharacters
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Stack align="center">
        <Text size="sm" c="dimmed">
          Don't have a .chf file?
        </Text>
        <Group justify="center" gap="sm" w="100%">
          <Button
            variant="default"
            size="sm"
            onClick={async () => {
              const file = await fetchFile("default_m.chf");
              onDrop(file);
            }}
          >
            Load Default M
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={async () => {
              const file = await fetchFile("default_f.chf");
              onDrop(file);
            }}
          >
            Load Default F
          </Button>
        </Group>
      </Stack>
    </Stack>
  );
}
