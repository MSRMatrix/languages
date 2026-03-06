import inquirer from "inquirer";

interface PasswordOptions {
  length: number;    
  includeNumbers: boolean;
  includeSymbols: boolean;  
}

interface Password {
  value: string;
  options: PasswordOptions;
}


async function passwordCreater() {

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
       // statement 1
       break;
   case "Einstellungen":
       // statement 2
       break;
   case "Gespeichterte Passwörter":
       // statement N
       break;
      case "Beenden":
        console.log("Bis bald, User");
      process.exit(0);
       break; 
   default: 
       // 
       break;
}
}
    
}

passwordCreater()