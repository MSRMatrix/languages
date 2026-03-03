import inquirer from "inquirer";

async function main() {
  interface Answers {
    username: string;
    age: number;
    confirm: boolean;
  }

  const answers: Answers = await inquirer.prompt<Answers>([
    {
      type: "input",
      name: "username",
      message: "Wie heißt du?",
    },
    {
      type: "number",
      name: "age",
      message: "Wie alt bist du?",
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Willst du weitermachen?",
    },
  ]);

  console.log("Hallo", answers.username);
  console.log("Alter:", answers.age);
  console.log("Weiter?", answers.confirm);
}

main();