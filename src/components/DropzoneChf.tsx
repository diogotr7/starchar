import { Center, Group, Stack, Text, rem } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import '@mantine/dropzone/styles.css'
import { IconFileUpload, IconUpload, IconX } from '@tabler/icons-react'
import { LoadDefault } from './LoadDefault'

interface DropzoneProps {
  onDrop: (files: File) => void
}
export function DropzoneChf({ onDrop }: DropzoneProps) {
  return (
    <Center mt="200">
      <Stack>
        <Dropzone
          multiple={false}
          onDrop={files => files[0] && onDrop(files[0])}
          onReject={files => console.log('rejected files', files)}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            miw={420}
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-blue-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-red-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFileUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-dimmed)',
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag .chf file to begin
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                You can find your character files in this folder:
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                ...\StarCitizen\LIVE\user\client\0\CustomCharacters
              </Text>
            </div>
          </Group>
        </Dropzone>
        <LoadDefault />
      </Stack>
    </Center>
  )
}
