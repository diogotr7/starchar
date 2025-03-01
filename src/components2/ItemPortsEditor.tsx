import { ItemPort } from "../schema/ItemPort";
import { Fieldset, Group } from "@mantine/core";
import { useChf } from "../useChfStore";
import { HashDisplay } from "./HashDisplay";
import { GuidDisplay } from "./GuidDisplay";

function ItemPortDisplay({ itemPort }: { itemPort: ItemPort }) {
  return (
    <Fieldset legend={<HashDisplay hash={itemPort.itemport_hash} />}>
      <Group justify="space-between">
        <p>ItemPort Id</p>
        <GuidDisplay guid={itemPort.id} />
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

export function ItemPortsEditor() {
  const itemPort = useChf((c) => c.itemport);

  return <ItemPortDisplay itemPort={itemPort} />;
}
