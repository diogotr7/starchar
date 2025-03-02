import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCopy } from "@tabler/icons-react";
import { hashGuess, hashMapping } from "../schema/Hash";

export function HashDisplay({ hash }: { hash: string }) {
  const name =
    hashMapping[hash] ??
    (hashGuess[hash] && `${hashGuess[hash]} (Guessed)`) ??
    `Unknown Hash: ${hash}`;

  return (
    <Group gap="xs">
      <Tooltip label={hash}>
        <Text>{name}</Text>
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
