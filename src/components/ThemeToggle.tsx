import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon onClick={toggleColorScheme} variant="subtle" size="lg">
      {colorScheme === "dark" ? <IconSun size={32} /> : <IconMoon size={32} />}
    </ActionIcon>
  );
}
