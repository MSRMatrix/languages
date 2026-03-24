import { writeFileSync } from 'fs';
import type { Password } from "../types.ts";

export function save(passwords: Password[]) {
  writeFileSync("./passwords.json", JSON.stringify(passwords, null, 2));
}