import { existsSync, readFileSync } from 'fs';
import type { Password } from "../types.ts";


export function load(): Password[] {
  if (!existsSync("./passwords.json")) return [];
  const data = readFileSync("./passwords.json", "utf-8").trim();
  return data ? (JSON.parse(data) as Password[]) : [];
}
