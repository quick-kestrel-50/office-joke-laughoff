// Write one one-line office joke to entry.txt.
//
// The joke: the meeting that could have been an email has now
// spawned three follow-up meetings, and the original email is
// still unread. Three follow-ups is the concrete number that
// makes the office truth land as a joke.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const TEXT =
  "The meeting that could have been an email has now spawned three follow-up meetings, and the original email is still unread.";

// The gate allows 1 to 200 characters in a single line, not only
// white space. Fail loudly instead of writing an entry the judge
// will never see.
if (TEXT.length < 1 || TEXT.length > 200 || TEXT.includes("\n") || TEXT.trim().length === 0) {
  throw new Error(`entry text must be one line of 1-200 characters, got ${TEXT.length}`);
}

function outputPath(): string {
  // The harness sets MAKEFUN_OUTPUT_DIR; /output is only the local-run default.
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

function main(): void {
  // Write the exact text, byte for byte, with no trailing newline.
  const path = outputPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, TEXT, "utf-8");
}

main();
