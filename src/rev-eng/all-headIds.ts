import process from 'node:process'
import path from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { createChf, extractChf } from '../chf/ChfFile'
import { readCharacter } from '../chf/Character'
import { getFaceDna, maxHeadIdForBodyType } from '../chf/Dna'

const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

const base = path.dirname(process.env.npm_package_json!)
const revEngDir = path.join(base, 'src', 'rev-eng')

const f = path.join(revEngDir, 'default_female.chf')
const m = path.join(revEngDir, 'bald_male.chf')

const charF = readCharacter(extractChf(new Uint8Array(readFileSync(f))))
const charM = readCharacter(extractChf(new Uint8Array(readFileSync(m))))

const fHeadMax = maxHeadIdForBodyType(charF.bodyType)
const mHeadMax = maxHeadIdForBodyType(charM.bodyType)

for (let i = 0; i <= fHeadMax; i++) {
  const headId = zeroPad(i, 3)
  const headF = path.join(revEngDir, `heads`, `f_head${headId}.chf`)
  const dna = getFaceDna(i)

  const c = {
    ...charF,
    dna,
  }

  writeFileSync(headF, new Uint8Array(createChf(c)))
}

for (let i = 0; i <= mHeadMax; i++) {
  const headId = zeroPad(i, 3)
  const headM = path.join(revEngDir, `heads`, `m_head${headId}b.chf`)
  const dna = getFaceDna(i)

  const c = {
    ...charM,
    dna,
  }

  writeFileSync(headM, new Uint8Array(createChf(c)))
}
