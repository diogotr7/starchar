import { describe, it } from 'vitest'

import { hurston, ruto, teciaPacheco } from '../dnaStrings'
import { dnaFromString } from '../chf/Dna'

describe('dna string tests', () => {
  it('teciaPacheco', () => {
    dnaFromString(teciaPacheco)
  })
  it('ruto', () => {
    dnaFromString(ruto)
  })
  it('hurston', () => {
    dnaFromString(hurston)
  })
})
