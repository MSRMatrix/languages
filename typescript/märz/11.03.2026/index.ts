import inquirer from "inquirer";
import { randomInt } from "crypto";
import { readFileSync, writeFileSync } from "fs";

interface Password {
  value: string;
  options: PasswordOptions;
}

interface PasswordOptions {
  uppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: number;
}

function loadPassword(): Password[] {
  const data = readFileSync("./passwords.json", "utf-8");
  return JSON.parse(data) as Password[];
}

function savePassword(newPassword: Password[]) {
  writeFileSync("./passwords.json", JSON.stringify(newPassword, null, 2));
}

const passwords: Password[] = loadPassword();

async function passwordCreater() {
  const settings: PasswordOptions = {
    uppercase: true,
    includeNumbers: false,
    includeSymbols: false,
    length: 10,
  };

  const newPassword: Password = {
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
        "Beenden",
      ],
    });

    switch (step.choice) {
      case "Passwort erstellen":
        await passwordEditor(newPassword);
        break;

      case "Einstellungen":
        await passwordSettings(settings);
        break;

      case "Gespeichterte Passwörter":
        // später
        break;

      case "Beenden":
        console.log("Bis bald, User");
        process.exit(0);

      default:
        break;
    }
  }
}

passwordCreater();

async function passwordSettings(settings: PasswordOptions) {
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

async function passwordEditor(
  newPassword: Password,
) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz"; 
  const numbers = "1234567890";
  const symbols = `!@#$%^&*()-_=+[]{}|;:',.<>/?`;

  const options = newPassword.options;
 
  let charset = lowercase; 
  if (options.uppercase) charset += uppercase;
  if (options.includeNumbers) charset += numbers;
  if (options.includeSymbols) charset += symbols;

  let password = "";
  for (let i = 0; i < options.length; i++) {
    const index = randomInt(0, charset.length);
    password += charset[index];
  }

  newPassword.value = password;

  savePassword(newPassword)
  console.log("Neues Passwort:", newPassword.value);
}
