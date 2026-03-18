import inquirer from "inquirer";

import type { Password } from ".././types";
import { save } from "./save";

export async function deleting(passwords: Password[]){

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
      choices: [
  ...passwords.map(p => ({ name: p.value, value: p.id })),
  { name: "Abbrechen", value: "cancel" }
]
    });

    if(list.choice === "cancel"){
      break;
    }

    const newPasswordList = passwords.filter((item) => item.id !== list.choice);
    save(newPasswordList)

      break
    }


if(answers.choice === "Alle Passwörter löschen"){
  save([]);
      break
    }


    if(answers.choice === "Verlassen"){
      break
    }
  }
   
}