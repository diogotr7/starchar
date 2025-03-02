import { Center } from "@mantine/core";
import { useChf } from "../useChfStore";
import { GuidDisplay } from "./GuidDisplay";

export function BodyTypeEditor() {
  const bodyType = useChf((c) => c.body_type_id);

  return (
    <Center>
      <GuidDisplay guid={bodyType} />
    </Center>
  );
}
