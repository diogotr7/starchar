import { Fieldset } from "@mantine/core";
import { FacePart } from "../schema/Dna";
import { DnaQuadBlend } from "./DnaQuadBlend";

export function DnaPart({
  label,
  dnaFacePart,
}: {
  label: string;
  dnaFacePart: FacePart;
}) {
  return (
    <Fieldset legend={label} p="xs">
      <DnaQuadBlend facePart={dnaFacePart} />
    </Fieldset>
  );
}
