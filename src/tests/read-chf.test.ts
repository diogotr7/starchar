import { readFile } from 'node:fs/promises'

import path from 'node:path'
import { readdirSync } from 'node:fs'
import { assert, describe, it } from 'vitest'
import { createChf, extractChf } from '../Chf/ChfFile'
import { readCharacter } from '../Chf/Character'

const outputDir = path.join(path.dirname(__filename), 'test-chf')
const testFiles = readdirSync(outputDir)

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
