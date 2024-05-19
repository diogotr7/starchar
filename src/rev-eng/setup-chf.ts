import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { downloadedDir } from "../paths";

const outputDir = downloadedDir;
// Date at which i uploaded the first modded file to the website. anything before this date is not modded
const cuttoffDate = "2024-05-08T23:27:56.506Z";

interface SccRoot {
  body: SccBody;
}

interface SccBody {
  hasNextPage: boolean;
  rows: SccCharacter[];
}

interface SccCharacter {
  id: string;
  createdAt: string;
  title: string;
  dnaUrl: string;
}

async function fetchHeads(): Promise<SccCharacter[]> {
  const pages = [];

  let page = 1;
  while (true) {
    const response = await fetch(`https://www.star-citizen-characters.com/api/heads?page=${page++}&orderBy=latest`);
    const heads = (await response.json()) as SccRoot;
    pages.push(...heads.body.rows);
    console.log(`Fetched page ${page - 1}`);

    if (!heads.body.hasNextPage) {
      break;
    }
  }

  return pages;
}

export async function setupChf() {
  const heads = await fetchHeads();

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  for (const head of heads) {
    if (new Date(head.createdAt) > new Date(cuttoffDate)) {
      console.log(`Skipping ${head.title} created at ${head.createdAt}`);
      continue;
    }

    const fileName = path.join(outputDir, `${head.title}-${head.id}.chf`);

    if (existsSync(fileName)) {
      console.log(`Skipping ${fileName}`);
      continue;
    }

    const dna = await fetch(head.dnaUrl);
    const fs = createWriteStream(fileName);
    fs.write(new Uint8Array(await dna.arrayBuffer()));
    fs.close();
    console.log(`Wrote ${fileName}`);
  }
}

setupChf().then(() => {
  console.log("done");
});
