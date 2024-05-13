import { readFile } from 'node:fs/promises'

import path from 'node:path'
import { readdirSync } from 'node:fs'
import { assert, describe, it } from 'vitest'
import { createChf, extractChf } from '../chf/ChfFile'
import { readCharacter } from '../chf/Character'

const outputDir = path.join(path.dirname(process.env.npm_package_json!), 'test-chf')
const testFiles = readdirSync(outputDir, { withFileTypes: true }).filter(f => f.isFile()).map(f => f.name)

describe('read All Chf Files', () => {
  it.each(testFiles)('read %s', async (file) => {
    const buffer = await readFile(path.join(outputDir, file))
    assert.doesNotThrow(() => {
      readCharacter(extractChf(new Uint8Array(buffer)))
    })
  })
})

describe('read, write, reread all Chf Files', () => {
  it.each(testFiles)('read %s', async (file) => {
    const buffer = await readFile(path.join(outputDir, file))
    assert.doesNotThrow(() => {
      const char = readCharacter(extractChf(new Uint8Array(buffer)))
      const chfAgain = createChf(char)
      readCharacter(extractChf(new Uint8Array(chfAgain)))
    })
  })
})
