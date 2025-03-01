import { Fieldset } from "@mantine/core";
import { useCallback } from "react";
import { DnaFace } from "../schema/Dna";
import { DnaBlend } from "./DnaBlend";
import { range } from "@mantine/hooks";
import { useChf, useChfStore } from "../useChfStore";

export function DnaPart({
  label,
  dnaFacePart,
}: {
  label: string;
  dnaFacePart: keyof DnaFace;
}) {
  const updateChf = useChfStore((c) => c.updateChf);
  const part = useChf((c) => c.dna.face_parts[dnaFacePart]);

  const updateBlend = useCallback(
    (index: number, value: number) => {
      // kind of ugly but it works well enough and i dont want to spend more time on it
      const diff = value - part[index].value;
      const otherIndices = [0, 1, 2, 3].filter((i) => i !== index);
      const otherValues = otherIndices.map((i) => part[i].value);
      const otherTotal = otherValues.reduce((acc, v) => acc + v, 0);
      const otherNewTotal = otherTotal - diff;
      const otherNewValues = otherValues.map(
        (v) => (v / otherTotal) * otherNewTotal
      );
      const newValues = [...otherNewValues];
      newValues.splice(index, 0, value);
      const newBlends = newValues.map((v, i) => ({
        head_id: part[i].head_id,
        value: v,
      }));
      updateChf((d) => {
        d.dna.face_parts[dnaFacePart] = newBlends;
      });
    },
    [part]
  );

  const updateHeadId = useCallback(
    (index: number, value: string | number) => {
      const id =
        typeof value === "number" ? value : Number.parseInt(value) ?? 0;
      updateChf((d) => {
        d.dna.face_parts[dnaFacePart][index].head_id = id;
      });
    },
    [part]
  );

  return (
    <Fieldset legend={label}>
      {range(0, 3).map((i) => (
        <DnaBlend
          key={i}
          headId={part[i].head_id}
          value={part[i].value}
          onChangeNumber={(v) => updateHeadId(i, v)}
          onChangeSlider={(v) => updateBlend(i, v)}
        />
      ))}
    </Fieldset>
  );
}
