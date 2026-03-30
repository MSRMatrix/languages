import { randomInt, randomUUID } from 'crypto';
import { load } from './load.ts';
import type { Password,  Storage} from "../types.ts";
import { save } from './save.ts';
import inquirer from 'inquirer';
import { createKey, encrypt } from './crypto.ts'



export async function creating(newPassword: Password, data: Storage) {

  if (!data.masterPassword) {
  throw new Error("Master-Passwort fehlt!");
}

  const key = createKey(data.masterPassword);

  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz"; 
  const numbers = "1234567890";
  const symbols = `!@#$%^&*()-_=+[]{}|;:',.<>/?`;

  const options = newPassword.options;

  const answer = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Wie soll dein Passwort heißen?",
  });

  // if(answer.name === "bestehendes Passwort")
  // Muss User auffordern den Namen zu wiederholen


  let charset = lowercase; 
  if (options.uppercase) charset += uppercase;
  if (options.includeNumbers) charset += numbers;
  if (options.includeSymbols) charset += symbols;

  let password = "";
  for (let i = 0; i < options.length; i++) {
    const index = randomInt(0, charset.length);
    password += charset[index];
  }

  newPassword.id = randomUUID();
  newPassword.name = answer.name

const result = encrypt(password, key);

newPassword.value = result.value;
newPassword.iv = result.iv;

   newPassword.strengh = evaluatePassword(password)

  data.passwords.push(newPassword);

  save(data);

  console.log("Neues Passwort:", newPassword.value);
}



function evaluatePassword(password: string): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "1234567890";
  const symbols = `!@#$%^&*()-_=+[]{}|;:',.<>/?`;

  let score = 0;

  const hasUppercase = [...password].some(char => uppercase.includes(char));
  const hasNumber = [...password].some(char => numbers.includes(char));
  const hasSymbol = [...password].some(char => symbols.includes(char));

  if (hasUppercase) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;

  const length = password.length;

  if (length >= 8) score++;
  if (length >= 12) score++;
  if (length >= 16) score++;

  if (score <= 2) return "weak";
  if (score <= 4) return "normal";
  return "strong";
}