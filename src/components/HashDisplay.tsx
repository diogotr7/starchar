import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCopy } from "@tabler/icons-react";

export function HashDisplay({ hash }: { hash: string }) {
  return (
    <Group gap="xs">
      <Tooltip label={hash}>
        <Text>{hash}</Text>
      </Tooltip>
      <Tooltip label="Copy hash">
        <ActionIcon
          size="xs"
          variant="transparent"
          onClick={() => {
            navigator.clipboard.writeText(hash);
            notifications.show({
              title: "Hash Copied",
              message: hash,
              autoClose: 1000,
            });
          }}
        >
          <IconCopy />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
