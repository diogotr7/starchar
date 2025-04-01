import { Fieldset } from "@mantine/core";
import { DnaFace } from "../schema/Dna";
import { DnaQuadBlend } from "./DnaQuadBlend";

export function DnaPart({
  label,
  dnaFacePart,
}: {
  label: string;
  dnaFacePart: keyof DnaFace;
}) {
  return (
    <Fieldset legend={label} p="xs">
      <DnaQuadBlend facePart={dnaFacePart} />
    </Fieldset>
  );
}
