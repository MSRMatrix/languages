import { randomInt, randomUUID } from 'crypto';
import { writeFileSync } from 'fs';
import { load } from './load.ts';
import type { Password } from "../types.ts";
import { save } from './save.ts';
import inquirer from 'inquirer';

export async function creating(newPassword: Password) {
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
  newPassword.name = answer.name

  const passwords = load();

  passwords.push(newPassword);

  save(passwords);

  console.log("Neues Passwort:", newPassword.value);
}



