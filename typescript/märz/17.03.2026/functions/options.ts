import inquirer from "inquirer";
import type { PasswordOptions } from ".././types.ts";


export async function options(settings: PasswordOptions) {
  while (true) {
    // Schritt 1: Checkbox-Abfrage
    const answers = await inquirer.prompt({
      type: "select",
      name: "choice",
      message: "Einstellungen um dein Wunschpasswort anzupassen:",
      choices: [
        `Großbuchstaben: ${settings.uppercase ? "An" : "Aus"}`,
        `Zahlen: ${settings.includeNumbers ? "An" : "Aus"}`,
        `Symbole: ${settings.includeSymbols ? "An" : "Aus"}`,
        `Länge: ${settings.length}`,
        `Verlassen`,
      ],
    });

    const selected = answers.choice;

    if (selected.includes("Verlassen")) {
      console.log("Einstellungen gespeichert. Programm beendet.");
      break;
    }

    if (selected.includes("Länge")) {
      const lengthAnswer = await inquirer.prompt({
        type: "number",
        name: "length",
        message: "Wie lang soll dein Passwort sein? (mindestens 8 Zeichen)",
        validate: (input: number) =>
          input >= 8 ? true : "Muss mindestens 8 sein!",
      });
      settings.length = lengthAnswer.length <= 30 ? lengthAnswer.length : 30;
    }

    if (selected.startsWith("Großbuchstaben")) {
      settings.uppercase = !settings.uppercase;
    }

    if (selected.startsWith("Zahlen")) {
      settings.includeNumbers = !settings.includeNumbers;
    }

    if (selected.startsWith("Symbole")) {
      settings.includeSymbols = !settings.includeSymbols;
    }
  }
}