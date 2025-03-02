import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCopy } from "@tabler/icons-react";
import {
  itemPortGuids,
  materialGuids,
  textureGuids,
} from "../schema/GuidMapping";

export function GuidDisplay({ guid }: { guid: string }) {
  const name =
    materialGuids[guid] || textureGuids[guid] || itemPortGuids[guid] || guid;
  return (
    <Group gap="xs">
      <Tooltip label={guid}>
        <Text>{name}</Text>
      </Tooltip>
      <Tooltip label="Copy GUID">
        <ActionIcon
          size="xs"
          variant="transparent"
          onClick={() => {
            navigator.clipboard.writeText(guid);
            notifications.show({
              title: "GUID copied",
              message: guid,
              autoClose: 1000,
            });
          }}
        >
          <IconCopy size="xs" />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
