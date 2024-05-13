import process from 'node:process'
import path from 'node:path'
import { readFileSync, readdirSync } from 'node:fs'
import { createChf, extractChf } from '../chf/ChfFile'
import { readCharacter } from '../chf/Character'

const outputDir = path.join(path.dirname(process.env.npm_package_json!), 'test-chf', 'ptu')
const testFiles = readdirSync(outputDir)

for (const file of testFiles) {
  const buffer = readFileSync(path.join(outputDir, file))
  const c = readCharacter(extractChf(new Uint8Array(buffer)))
  const f = createChf(c)
  const c2 = readCharacter(extractChf(new Uint8Array(f)))
  console.log(`${file}: ${{ c2 }}`)
}
