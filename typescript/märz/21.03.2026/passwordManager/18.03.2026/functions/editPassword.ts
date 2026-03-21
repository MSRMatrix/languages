import inquirer from "inquirer";

import type { Password } from "../types";
import { save } from "./save";
import clipboard from "clipboardy-ts";

export async function editPassword(passwords: Password[]) {

  while (true) {
    const answers = await inquirer.prompt({
      type: "select",
      name: "choice",
      message: "Einstellungen um dein Wunschpasswort anzupassen:",
      choices: [
        `Passwort auswählen`,
        `Alle Passwörter löschen`,
        `Verlassen`,
      ],
    });

    if (answers.choice === "Passwort auswählen") {


      const list = await inquirer.prompt({
        type: "select",
        name: "choice",
        message: "Wähle ein Passwort aus: ",
        choices: [
          ...passwords.map(p => ({ name: p.name, password: p.value, value: p.id })),
          { name: "Abbrechen", value: "cancel" }
        ]
      });

      if (list.choice === "cancel") {
        break;
      }

      const choosedPassword = passwords.find(
        (item) => item.id === list.choice
      );

      if (!choosedPassword) {
        console.log("Passwort nicht gefunden!");
        break; // oder break
      }

      const passwordOption = await inquirer.prompt({
        type: "select",
        name: "choice",
        message: `
      ${choosedPassword.name}: ${choosedPassword.value}`,
        choices: [
          { name: "Kopieren", value: "copy" },
          { name: "Löschen", value: "delete" },
          { name: "Name ändern", value: "change-name" },
          { name: "Abbrechen", value: "cancel" }
        ]
      });


      if (passwordOption.choice === "copy") {
        clipboard.writeSync(choosedPassword.value);
        console.log("Passwort kopiert!");
        break;
      }
      if (passwordOption.choice === "change-name") {

        const newNameFromUser = await inquirer.prompt({
          type: "input",
          name: "name",
          message: `Setze einen neuen Namen für ${choosedPassword.name}: `
        });

        const updatedPasswords = passwords.map(item =>
          item.id === list.choice
            ? { ...item, name: newNameFromUser.name }
            : item
        );

        save(updatedPasswords);

        console.log("Name erfolgreich geändert!");
        break;
      }

      if (passwordOption.choice === "delete") {
        const newPasswordList = passwords.filter((item) => item.id !== list.choice);
        save(newPasswordList)
        break
      }

    }


    if (answers.choice === "Alle Passwörter löschen") {
      save([]);
      break
    }


    if (answers.choice === "Verlassen") {
      break
    }
  }

}