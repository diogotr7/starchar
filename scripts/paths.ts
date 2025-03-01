import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

export const baseDir = path.dirname(process.env.npm_package_json!);
export const revEngDir = path.join(baseDir, "src", "rev-eng");
export const scratchDir = path.join(baseDir, "scratch");
export const defaultF = path.join(revEngDir, "default_female.chf");
export const defaultM = path.join(revEngDir, "default_male.chf");
export const downloadedDir = path.join(scratchDir, "downloaded");
export const headsDir = path.join(scratchDir, "heads");
export const eyesDir = path.join(scratchDir, "eyes");

// create all missing directories
const dirs = [downloadedDir, revEngDir, scratchDir, headsDir, eyesDir];
for (const dir of dirs) {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}
