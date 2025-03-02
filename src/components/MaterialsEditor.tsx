import {
  ColorInput,
  Fieldset,
  Group,
  Slider,
  Space,
  Stack,
} from "@mantine/core";
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
    <Fieldset legend={`SubMaterial ${subMaterialIndex + 1}`}>
      <Stack>
        <Group justify="space-between">
          <div>Hash</div>
          <HashDisplay hash={subMaterial.submaterial_hash} />
        </Group>
      </Stack>
      <Space h="md" />
      {subMaterial.textures.length > 0 && (
        <>
          {subMaterial.textures.map((tex, i) => (
            <Fieldset legend={`Texture ${i + 1}`} key={i}>
              <Stack>
                <Group justify="space-between">
                  <div>Index</div>
                  <p>{tex.tex_index}</p>
                </Group>
                <Group justify="space-between">
                  <div>Id</div>
                  <GuidDisplay guid={tex.tex_id} />
                </Group>
              </Stack>
            </Fieldset>
          ))}
        </>
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
    <Fieldset legend={`Material ${index + 1}`}>
      <Stack>
        <Group justify="space-between">
          <div>Hash</div>
          <HashDisplay hash={material.material_hash} />
        </Group>
        <Group justify="space-between">
          <div>Id</div>
          <GuidDisplay guid={material.material_id} />
        </Group>
        <Group justify="space-between">
          <div>Flags</div>
          <div>{material.mtl_flags_maybe}</div>
        </Group>
      </Stack>
      <Space h="md" />
      {material.sub_materials.length > 0 && (
        <>
          {material.sub_materials.map((_, subMaterialIndex) => (
            <SubMaterialDisplay
              key={subMaterialIndex}
              materialIndex={index}
              subMaterialIndex={subMaterialIndex}
            />
          ))}
        </>
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
