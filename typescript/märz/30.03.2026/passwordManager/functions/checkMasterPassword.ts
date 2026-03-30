import inquirer from "inquirer";
import crypto from "crypto";
import { createKey } from "./crypto.ts";
import { save } from "./save.ts";
import { load } from "./load.ts";


export async function checkMasterPassword() {
  const data = load();

  let key: Buffer;

  if (!data.masterPassword) {
    while (true) {
      const answer = await inquirer.prompt({
        type: "password",
        name: "masterPassword",
        message: "Bitte erstellen Sie ein Master-Passwort (merken!)",
        mask: "*"
      });

      if (!answer.masterPassword) {
        console.log("Sie müssen ein Passwort eingeben!");
        continue;
      }

      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto.scryptSync(answer.masterPassword, salt, 32).toString("hex");
      data.masterPassword = `${hash}:${salt}`;
      save(data);

      console.log("Master-Passwort gesetzt!");
      key = createKey(answer.masterPassword);
      break;
    }
  } else {
    const [hash, salt] = data.masterPassword.split(":");

    while (true) {
      const answer = await inquirer.prompt({
        type: "password",
        name: "masterPassword",
        message: "Bitte geben Sie Ihr Master-Passwort ein:",
        mask: "*"
      });

      const inputHash = crypto.scryptSync(answer.masterPassword, salt, 32).toString("hex");

      if (inputHash === hash) {
        console.log("Login erfolgreich!");
        key = createKey(answer.masterPassword);
        break;
      } else {
        console.log("Falsches Passwort, bitte erneut versuchen.");
      }
    }
  }

  return key; 
}