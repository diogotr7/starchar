import { materialGuids, textures } from "../schema/GuidMapping";

export function GuidDisplay({ guid }: { guid: string }) {
  const materialName = materialGuids
    .find((m) => m.guid === guid)
    ?.filePath.split("/")
    .pop();
  if (materialName) {
    return materialName;
  }

  const textureName = textures
    .find((t) => t.guid === guid)
    ?.filePath.split("/")
    .pop();
  if (textureName) {
    return textureName;
  }

  return <pre>{guid}</pre>;
}
