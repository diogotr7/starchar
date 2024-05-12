import { createWriteStream, existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const outputDir = path.join(path.dirname(__filename), 'test-chf')

interface SccRoot {
  body: SccBody
}

interface SccBody {
  hasNextPage: boolean
  rows: SccCharacter[]
}

interface SccCharacter {
  id: string
  title: string
  dnaUrl: string
}

async function fetchHeads(): Promise<SccCharacter[]> {
  const pages = []

  let page = 1
  while (true) {
    const response = await fetch(`https://www.star-citizen-characters.com/api/heads?page=${page++}&orderBy=latest`)
    const heads = await response.json() as SccRoot
    pages.push(...heads.body.rows)
    console.log(`Fetched page ${page - 1}`)

    if (!heads.body.hasNextPage)
      break
  }

  return pages
}

export async function setupChf() {
  const heads = await fetchHeads()

  if (!existsSync(outputDir))
    mkdirSync(outputDir)

  for (const head of heads) {
    const dna = await fetch(head.dnaUrl)
    const fileName = path.join(outputDir, `${head.title}-${head.id}.chf`)

    if (existsSync(fileName))
      continue

    const fs = createWriteStream(fileName)
    fs.write(new Uint8Array(await dna.arrayBuffer()))
    fs.close()
    console.log(`Wrote ${fileName}`)
  }
}

setupChf().then(() => { console.log('done') })
