import { writeFileSync } from 'fs';
import type { Password } from "../types.ts";

export function save(data: { masterPassword: string | null; passwords: Password[] }) {
  writeFileSync("./passwords.json", JSON.stringify(data, null, 2));
}