import inquirer from "inquirer";
import { creating } from "./functions/creating.ts";
import { options } from "./functions/options.ts";
import { list } from "./functions/list.ts"
import { editPassword } from "./functions/editPassword.ts";
import type { Password, PasswordOptions } from "./types.ts";
import { load } from "./functions/load.ts";
import { existsSync, readFileSync } from 'fs';
import { checkMasterPassword } from "./functions/checkMasterPassword.ts";

async function passwordManager() {
  const settings: PasswordOptions = {
    uppercase: true,
    includeNumbers: false,
    includeSymbols: false,
    length: 10,
  };

  const newPassword: Password = {
    id: "",
    name: "",
    value: "",
    strengh: "",
    iv: "",
    options: settings,
  };

   await checkMasterPassword()

  


  while (true) {
    const step = await inquirer.prompt({
      type: "select",
      name: "choice",
      message: `Was möchtest du tun: `,
      choices: [
        "Passwort erstellen",
        "Einstellungen",
        "Gespeichterte Passwörter",
        "Passwort bearbeiten",
        "Beenden",
      ],
    });

    const data = load();

    switch (step.choice) {
      case "Passwort erstellen":
        await creating(newPassword, data);
        break;

      case "Einstellungen":
        await options(settings);
        break;

      case "Gespeichterte Passwörter":
        await list(data.passwords, data)
        break;

        case "Passwort bearbeiten":
          await editPassword(data.passwords, data)
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


