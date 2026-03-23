import inquirer from "inquirer";
import type { Password } from "../types";
import { save } from "./save";
import clipboard from "clipboardy-ts";

export async function editPassword(passwords: Password[]) {

  async function handlePasswordAction(selectedId: string) {
    const choosedPassword = passwords.find(p => p.id === selectedId);

    if (!choosedPassword) {
      console.log("Passwort nicht gefunden!");
      return;
    }

    const passwordOption = await inquirer.prompt({
      type: "select",
      name: "choice",
      message: `${choosedPassword.name}: ${choosedPassword.value}`,
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
      return;
    }

    if (passwordOption.choice === "change-name") {
      const newNameFromUser = await inquirer.prompt({
        type: "input",
        name: "name",
        message: `Setze einen neuen Namen für ${choosedPassword.name}: `
      });

      const updatedPasswords = passwords.map(item =>
        item.id === selectedId
          ? { ...item, name: newNameFromUser.name }
          : item
      );

      save(updatedPasswords);
      console.log("Name erfolgreich geändert!");
      return;
    }

    if (passwordOption.choice === "delete") {
      const newPasswordList = passwords.filter(item => item.id !== selectedId);
      save(newPasswordList);
      console.log("Passwort gelöscht!");
      return;
    }
  }

  while (true) {
    const answers = await inquirer.prompt({
      type: "select",
      name: "choice",
      message: "Was möchtest du tun?",
      choices: [
        "Passwort auswählen",
        "Passwort suchen",
        "Alle Passwörter löschen",
        "Verlassen",
      ],
    });

    if (answers.choice === "Passwort suchen") {
      const searchByName = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Namen des Passworts eingeben:"
      });

      const query = searchByName.name.toLowerCase();

      const foundPasswords = passwords.filter(item =>
        item.name.toLowerCase().includes(query)
      );

      if (foundPasswords.length === 0) {
        console.log("Kein Passwort gefunden.");
        continue;
      }

      const list = await inquirer.prompt({
        type: "select",
        name: "choice",
        message: "Gefundene Passwörter:",
        choices: [
          ...foundPasswords.map(p => ({
            name: p.name,
            value: p.id
          })),
          { name: "Abbrechen", value: "cancel" }
        ],
      });

      if (list.choice === "cancel") continue;

      await handlePasswordAction(list.choice);
    }

    if (answers.choice === "Passwort auswählen") {
      const list = await inquirer.prompt({
        type: "select",
        name: "choice",
        message: "Wähle ein Passwort aus:",
        choices: [
          ...passwords.map(p => ({
            name: p.name,
            value: p.id
          })),
          { name: "Abbrechen", value: "cancel" }
        ]
      });

      if (list.choice === "cancel") continue;

      await handlePasswordAction(list.choice);
    }

    if (answers.choice === "Alle Passwörter löschen") {
      save([]);
      console.log("Alle Passwörter wurden gelöscht!");
      break;
    }

    if (answers.choice === "Verlassen") {
      break;
    }
  }
}