import { Center } from "@mantine/core";
import { getBodyType } from "../schema/GuidMapping";
import { useChf } from "../useChfStore";

export function BodyTypeEditor() {
  const bodyType = useChf((c) => c.body_type_id);

  return <Center>{getBodyType(bodyType)}</Center>;
}
