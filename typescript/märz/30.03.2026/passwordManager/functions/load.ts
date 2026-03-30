import { readFileSync, existsSync } from "fs";
import type { Storage } from "../types.ts";

const filePath = "./passwords.json";

export function load(): Storage {
  if (!existsSync(filePath)) {
    return { masterPassword: null, passwords: [] };
  }

  const raw = readFileSync(filePath, "utf-8").trim();
  if (!raw) {
    return { masterPassword: null, passwords: [] };
  }

  try {
    return JSON.parse(raw) as Storage;
  } catch (e) {
    console.error("Fehler beim Parsen von passwords.json:", e);
    return { masterPassword: null, passwords: [] };
  }
}