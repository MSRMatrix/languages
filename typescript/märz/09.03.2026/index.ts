import inquirer from "inquirer";

interface Password {
  value: string;
  options: PasswordOptions;
}

interface PasswordOptions {
  uppercase: boolean;
  lowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: number;
}


async function passwordCreater() {

const settings: PasswordOptions = {
  uppercase: true,
  lowercase: true,
  includeNumbers: false,
  includeSymbols: false,
  length: 10
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
        "Beenden"],
    });
    
    switch ( step.choice ) {
   case "Passwort erstellen":
       const uppercase: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
       const lowercase: string = "abcdefghijklmnopqrstuvwxyz";
       const numbers : string = "1234567890";
      const symbols : string = `!"§$%&/()=?`
       break;
   case "Einstellungen":
   passwordSettings(settings)

  break;
   case "Gespeichterte Passwörter":
       // statement N
       break;
      case "Beenden":
        console.log("Bis bald, User");
      process.exit(0);
   default: 
       // 
       break;
}
}
    
}

passwordCreater()




async function passwordSettings(settings: PasswordOptions) {
  while (true) {
    // Schritt 1: Checkbox-Abfrage
    const answers = await inquirer.prompt({
      type: "checkbox",
      name: "choice",
      message: "Einstellungen um dein Wunschpasswort anzupassen:",
      choices: [
        "Großbuchstaben",
        "Kleinbuchstaben",
        "Zahlen",
        "Symbole",
        "Länge",
        "Verlassen"
      ]
    });

    const selected = answers.choice as string[];

    // Schritt 2: Prüfen, ob Benutzer verlassen will
    if (selected.includes("Verlassen")) {
      console.log("Einstellungen gespeichert. Programm beendet.");
      break;
    }

    // Schritt 3: Länge abfragen, falls gewählt
    if (selected.includes("Länge")) {
      const lengthAnswer = await inquirer.prompt({
        type: "number",
        name: "length",
        message: "Wie lang soll dein Passwort sein? (mindestens 8 Zeichen)",
        validate: (input: number) => (input >= 8 ? true : "Muss mindestens 8 sein!")
      });
      settings.length = lengthAnswer.length;
    }

    // Schritt 4: Einstellungen updaten
    settings.uppercase = selected.includes("Großbuchstaben");
    settings.lowercase = selected.includes("Kleinbuchstaben");
    settings.includeNumbers = selected.includes("Zahlen");
    settings.includeSymbols = selected.includes("Symbole");

    console.log("Neue Einstellungen:", settings);
  }
}
