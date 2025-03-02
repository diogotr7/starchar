import fs from "node:fs";

const path =
  "C:\\Development\\StarCitizen\\StarCitizenDiff\\DataCore\\libs\\foundry\\records\\entities\\scitem\\characters\\human\\head\\shared";

//get all json files in all paths
const jsonFiles = fs
  .readdirSync(path, {
    recursive: true,
  })
  .filter((file) => file.endsWith(".json"));

for (const file of jsonFiles) {
  const data = fs.readFileSync(`${path}\\${file}`, "utf8");
  const json = JSON.parse(data);
  console.log(
    `\"${json._RecordId_}\": \"${file
      .split("\\")
      .pop()
      .replace(".json", "")}\",`
  );
}
