import { ColorInput, Fieldset, Group, Slider, Stack } from "@mantine/core";
import { useChf, useChfUpdate } from "../useChfStore";
import { GuidDisplay } from "./GuidDisplay";
import { HashDisplay } from "./HashDisplay";

function SubMaterialDisplay({
  materialIndex,
  subMaterialIndex,
}: {
  materialIndex: number;
  subMaterialIndex: number;
}) {
  const subMaterial = useChf(
    (c) => c.materials[materialIndex].sub_materials[subMaterialIndex]
  );

  const updateChf = useChfUpdate();
  return (
    <Fieldset legend={<HashDisplay hash={subMaterial.submaterial_hash} />}>
      {subMaterial.textures.length > 0 && (
        <Fieldset legend="Textures">
          {subMaterial.textures.map((tex, i) => (
            <Group key={i} justify="space-between">
              <p>{tex.tex_index}</p>
              <GuidDisplay guid={tex.tex_id} />
            </Group>
          ))}
        </Fieldset>
      )}
      {subMaterial.material_params.length > 0 && (
        <Fieldset legend="Parameters">
          {subMaterial.material_params.map((param, i) => (
            <Group key={i} justify="space-between" p={4}>
              <HashDisplay hash={param.value_hash} />
              <Slider
                w="8em"
                min={0}
                max={1}
                step={0.01}
                size="md"
                value={param.value}
                onChange={(value) => {
                  updateChf((draft) => {
                    draft.materials[materialIndex].sub_materials[
                      subMaterialIndex
                    ].material_params[i].value = value;
                  });
                }}
              />
            </Group>
          ))}
        </Fieldset>
      )}
      {subMaterial.material_colors.length > 0 && (
        <Fieldset legend="Colors">
          {subMaterial.material_colors.map((color, i) => (
            <Group key={i} justify="space-between" p={2}>
              <HashDisplay hash={color.value_hash} />
              <ColorInput
                withEyeDropper={false}
                value={color.value.toUpperCase()}
                format="hexa"
                onChange={(value) => {
                  updateChf((draft) => {
                    draft.materials[materialIndex].sub_materials[
                      subMaterialIndex
                    ].material_colors[i].value = value;
                  });
                }}
              />
            </Group>
          ))}
        </Fieldset>
      )}
    </Fieldset>
  );
}

function MaterialDisplay({ index }: { index: number }) {
  const material = useChf((c) => c.materials[index]);

  return (
    <Fieldset legend={<HashDisplay hash={material.material_hash} />}>
      <Stack>
        <Group justify="space-between">
          <div> Material Id</div>
          <GuidDisplay guid={material.material_id} />
        </Group>
        <Group justify="space-between">
          <div>Material Flags</div>
          <div>{material.mtl_flags_maybe}</div>
        </Group>
      </Stack>
      {material.sub_materials.length > 0 && (
        <Fieldset legend="Sub Materials">
          {material.sub_materials.map((_, subMaterialIndex) => (
            <SubMaterialDisplay
              key={subMaterialIndex}
              materialIndex={index}
              subMaterialIndex={subMaterialIndex}
            />
          ))}
        </Fieldset>
      )}
    </Fieldset>
  );
}

export function MaterialsEditor() {
  const materials = useChf((c) => c.materials);

  return (
    <>
      {materials.map((_, i) => (
        <MaterialDisplay key={i} index={i} />
      ))}
    </>
  );
}
