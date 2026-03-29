import { Button, Fieldset, Group } from "@mantine/core";
import { ItemPort } from "../schema/ItemPort";
import { useChf, useChfUpdate } from "../useChfStore";
import { GuidDisplay } from "./GuidDisplay";
import { HashDisplay } from "./HashDisplay";

export function ItemPortsEditor() {
  const itemPort = useChf((c) => c.itemport);

  return <ItemPortDisplay itemPort={itemPort} />;
}

function ItemPortDisplay({ itemPort }: { itemPort: ItemPort }) {
  const updateChf = useChfUpdate();

  const updateItemPortId = (id: string) => {
    updateChf((draft) => {
      const found = findItemPort(draft.itemport, itemPort.id);
      if (found) {
        found.id = id;
      }
    });
  };

  return (
    <Fieldset legend={<HashDisplay hash={itemPort.name} />}>
      <Group justify="space-between">
        <p>ItemPort Id</p>
        <GuidDisplay guid={itemPort.id} />
        <Button
          variant="subtle"
          onClick={async () => {
            const newId = await navigator.clipboard.readText();
            updateItemPortId(newId);
          }}
        >
          Paste
        </Button>
      </Group>
      {itemPort.children.length > 0 && (
        <>
          {itemPort.children.map((child, index) => (
            <ItemPortDisplay key={index} itemPort={child} />
          ))}
        </>
      )}
    </Fieldset>
  );
}

function findItemPort(port: ItemPort, id: string): ItemPort | undefined {
  if (port.id === id) return port;
  for (const child of port.children) {
    const found = findItemPort(child, id);
    if (found) return found;
  }
  return undefined;
}
