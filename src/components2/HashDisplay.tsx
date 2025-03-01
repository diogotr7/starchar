import { hashGuess, hashMapping } from "../schema/Hash";

export function HashDisplay({ hash }: { hash: string }) {
  const name = hashMapping[hash.toLocaleLowerCase()];

  if (name) return <>{name}</>;

  const guess = hashGuess[hash.toLocaleLowerCase()];

  if (guess) return `${guess} (Guessed)`;

  return `Unknown Hash: ${hash}`;
}
