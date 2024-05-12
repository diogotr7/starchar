import { describe, it } from 'vitest'

import * as dna from '../Chf/Dna'
import { ruto, teciaPacheco } from '../Utils/dnaStrings'

describe('dna string tests', () => {
  it('teciaPacheco', () => {
    dna.dnaFromString(teciaPacheco)
  })
  it('ruto', () => {
    dna.dnaFromString(ruto)
  })
})
