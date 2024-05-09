import { match } from "ts-pattern";
import { BufferReader } from "../buffer-reader";
import { StarCitizenBody, readBody } from "./StarCitizenBody";

export function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

export type StarCitizenCharacter = {
  bodyType: "male" | "female";
  dna: string;
  body: StarCitizenBody;
};

export function parse(bytes: Uint8Array): StarCitizenCharacter {
  const reader = new BufferReader(bytes.buffer);
  reader.expectUint32(2);
  reader.expectUint32(7);
  const bodyTypeGuid = reader.readGuid();
  reader.expectEmptyGuid();
  reader.expectUint64(0xd8);
  const dnaBytes = reader.readBytes(0xd8);
  const totalCount = reader.readUint64();
  console.log(`Total count: ${totalCount}`);

  const body = readBody(reader);

  const bodyType = match(bodyTypeGuid)
    .returnType<"male" | "female">()
    .with("25f439d5-146b-4a61-a999-a486dfb68a49", () => "male")
    .with("d0794a94-efb0-4cad-ad38-2558b4d3c253", () => "female")
    .run();

  return {
    bodyType,
    dna: toHexString(dnaBytes),
    body,
  };
}
