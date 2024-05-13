import process from 'node:process'
import path from 'node:path'
import { readFileSync, readdirSync } from 'node:fs'
import { extractChf } from '../chf/ChfFile'
import { readCharacter } from '../chf/Character'

const outputDir = path.join(path.dirname(process.env.npm_package_json!), 'test-chf')
const testFiles = readdirSync(outputDir)

for (const file of testFiles) {
  const buffer = readFileSync(path.join(outputDir, file))
  readCharacter(extractChf(new Uint8Array(buffer)))
}
