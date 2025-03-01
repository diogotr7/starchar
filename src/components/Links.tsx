import { ActionIcon, Group } from "@mantine/core";
import { IconBrandGithub, IconBrandPaypal } from "@tabler/icons-react";

export function Links() {
  return (
    <Group justify="center">
      <ActionIcon
        size="lg"
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/diogotr7/starchar"
        variant="subtle"
      >
        <IconBrandGithub size={32} />
      </ActionIcon>
      <ActionIcon
        size="lg"
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        href="https://paypal.me/diogotr7"
        variant="subtle"
      >
        <IconBrandPaypal size={32} />
      </ActionIcon>
    </Group>
  );
}
