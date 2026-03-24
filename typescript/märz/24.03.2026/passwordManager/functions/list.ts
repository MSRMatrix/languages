import inquirer from "inquirer";
import type { Password } from "../types.ts";

export async function list(passwords: Password[]) {

    if (passwords.length === 0) {
    console.log("Keine gespeicherten Passwörter vorhanden.");
    return;
  }
  const list = passwords.map((p, i) => `${i + 1}.${p.name}: ${p.value}`).join("\n");

  await inquirer.prompt({
    type: "select", 
    name: "choice",
    message: `Deine gespeicherten Passwörter:\n${list}\nFortfahren ->`,
    choices: ["Fortfahren"]
  });
}