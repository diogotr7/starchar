import { readFile } from "node:fs/promises";

import { readdirSync } from "node:fs";
import path from "node:path";
import { assert, describe, it } from "vitest";
import { readCharacter } from "../chf/Character";
import { createChf, extractChf } from "../chf/ChfFile";
import { downloadedDir } from "../paths";

const testFiles = readdirSync(downloadedDir, { withFileTypes: true })
  .filter((f) => f.isFile())
  .map((f) => f.name);

describe("read All Chf Files", () => {
  it.each(testFiles)("read %s", async (file) => {
    const buffer = await readFile(path.join(downloadedDir, file));
    assert.doesNotThrow(() => {
      readCharacter(extractChf(new Uint8Array(buffer)));
    });
  });
});

describe("read, write, reread all Chf Files", () => {
  it.each(testFiles)("read %s", async (file) => {
    const buffer = await readFile(path.join(downloadedDir, file));
    assert.doesNotThrow(() => {
      const char = readCharacter(extractChf(new Uint8Array(buffer)));
      const chfAgain = createChf(char);
      readCharacter(extractChf(new Uint8Array(chfAgain)));
    });
  });
});
