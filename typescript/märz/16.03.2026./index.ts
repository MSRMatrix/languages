import inquirer from "inquirer";
import { randomInt, randomUUID } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";

interface Password {
  id: string,
  value: string;
  options: PasswordOptions;
}

interface PasswordOptions {
  uppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: number;
}

function loadPasswords(): Password[] {
  if (!existsSync("./passwords.json")) return [];
  const data = readFileSync("./passwords.json", "utf-8").trim();
  return data ? (JSON.parse(data) as Password[]) : [];
}

function savePasswords(passwords: Password[]) {
  writeFileSync("./passwords.json", JSON.stringify(passwords, null, 2));
}

const passwords: Password[] = loadPasswords();

async function passwordCreater() {
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
        await passwordEditor(newPassword);
        break;

      case "Einstellungen":
        await passwordSettings(settings);
        break;

      case "Gespeichterte Passwörter":
        await showData(loadPasswords())
        break;

        case "Passwort löschen":
          await deletePasswort(loadPasswords())
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

async function passwordEditor(newPassword: Password) {
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
  newPassword.id = randomUUID();

  const passwords = loadPasswords();
  console.log(passwords)

  passwords.push(newPassword);

  savePasswords(passwords);

  console.log("Neues Passwort:", newPassword.value);
}

async function showData(passwords: Password[]) {

    if (passwords.length === 0) {
    console.log("Keine gespeicherten Passwörter vorhanden.");
    return;
  }

  const list = passwords.map((p, i) => `${i + 1}. ${p.value}`).join("\n");

  await inquirer.prompt({
    type: "select", 
    name: "choice",
    message: `Deine gespeicherten Passwörter:\n${list}\nFortfahren ->`,
    choices: ["Fortfahren"]
  });
}


async function deletePasswort(passwords: Password[]){

  while(true){
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

if(answers.choice === "Passwort auswählen"){
 
  
  const list = await inquirer.prompt({
      type: "select",
      name: "choice",
      message: "Wähle ein Passwort zum löschen aus: ",
      choices:  passwords.map((item) => ({
  name: item.value,
  value: item.id
}))
    });

    const newPasswordList = passwords.filter((item) => item.id !== list.choice);
    savePasswords(newPasswordList)

      break
    }


if(answers.choice === "Alle Passwörter löschen"){
  savePasswords([]);
      break
    }


    if(answers.choice === "Verlassen"){
      break
    }
  }
   
}