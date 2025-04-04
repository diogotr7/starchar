import { Affix, Button, Tabs } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useChfManagement } from "../useChfStore";
import { BodyTypeEditor } from "./BodyTypeEditor";
import { DnaEditor } from "./DnaEditor";
import { ItemPortsEditor } from "./ItemPortsEditor";
import { MaterialsEditor } from "./MaterialsEditor";

export function ChfEditor() {
  const { exportChf } = useChfManagement();

  return (
    <>
      <Tabs defaultValue="bodyType" mx="auto" maw="1200">
        <Tabs.List grow>
          <Tabs.Tab value="bodyType">Body Type</Tabs.Tab>
          <Tabs.Tab value="dna">DNA</Tabs.Tab>
          <Tabs.Tab value="itemports">Item Ports</Tabs.Tab>
          <Tabs.Tab value="materials">Materials</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="bodyType" pt="xs">
          <BodyTypeEditor />
        </Tabs.Panel>
        <Tabs.Panel value="dna" pt="xs">
          <DnaEditor />
        </Tabs.Panel>
        <Tabs.Panel value="itemports" pt="xs">
          <ItemPortsEditor />
        </Tabs.Panel>
        <Tabs.Panel value="materials" pt="xs">
          <MaterialsEditor />
        </Tabs.Panel>
      </Tabs>
      <Affix
        position={{ bottom: "2em", left: "50%" }}
        style={{ transform: "translateX(-50%)" }}
      >
        <Button
          leftSection={<IconDownload size={24} />}
          size="xl"
          onClick={exportChf}
        >
          Export
        </Button>
      </Affix>
    </>
  );
}
