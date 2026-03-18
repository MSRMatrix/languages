import inquirer from "inquirer";
import { randomInt, randomUUID } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { creating } from "./functions/creating";
import { options } from "./functions/options";
import { list } from "./functions/list"
import { deleting } from "./functions/deleting";
import type { Password, PasswordOptions } from "./types.ts";
import { load } from "./functions/load.ts";

const passwords: Password[] = load();

async function passwordManager() {
  const settings: PasswordOptions = {
    uppercase: true,
    includeNumbers: false,
    includeSymbols: false,
    length: 10,
  };

  const newPassword: Password = {
    id: "",
    value: "",
    options: settings,
  };

  while (true) {
    const step = await inquirer.prompt({
      type: "select",
      name: "choice",
      message: `Was möchtest du tun: `,
      choices: [
        "Passwort erstellen",
        "Einstellungen",
        "Gespeichterte Passwörter",
        "Passwort löschen",
        "Beenden",
      ],
    });

    switch (step.choice) {
      case "Passwort erstellen":
        await creating(newPassword);
        break;

      case "Einstellungen":
        await options(settings);
        break;

      case "Gespeichterte Passwörter":
        await list(load())
        break;

        case "Passwort löschen":
          await deleting(load())
          break;

      case "Beenden":
        console.log("Bis bald, User");
        process.exit(0);

      default:
        break;
    }
  }
}

passwordManager();


