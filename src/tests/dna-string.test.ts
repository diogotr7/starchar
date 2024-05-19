import { describe, it } from "vitest";

import { dnaFromString } from "../chf/Dna";
import { dnaStrings } from "../dnaStrings";

describe("dna string tests", () => {
  it.each(dnaStrings)("dnaFromString $name", ({ dna }) => {
    dnaFromString(dna);
  });
});
