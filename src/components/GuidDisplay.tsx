import {
  itemPortGuids,
  materialGuids,
  textureGuids,
} from "../schema/GuidMapping";

export function GuidDisplay({ guid }: { guid: string }) {
  const materialName = materialGuids[guid];
  if (materialName) return materialName;

  const textureName = textureGuids[guid];
  if (textureName) return textureName;

  const itemPortName = itemPortGuids[guid];
  if (itemPortName) return itemPortName;

  return <pre>{guid}</pre>;
}
