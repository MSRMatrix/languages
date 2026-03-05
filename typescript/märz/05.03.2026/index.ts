import inquirer from "inquirer";
import { readFileSync } from "fs";
import { writeFileSync } from "fs";

interface Todo {
  id: number;
  task: string;
  done: boolean;
}

const todos: Todo[] = loadTodos();

function loadTodos(): Todo[] {
  const data = readFileSync("./todos.json", "utf-8");
  return JSON.parse(data) as Todo[];
}

function saveTodos(todos: Todo[]) {
  writeFileSync("./todos.json", JSON.stringify(todos, null, 2));
}

async function main() {
  while (true) {
    const step = await inquirer.prompt({
      type: "select",
      name: "choice",
      message: `Was möchtest du tun: `,
      choices: [
        "Task hinzufügen",
        "Task bearbeiten",
        "Task löschen",
        "Alle Tasks anzeigen",
        "Beenden",],
    });

    if (step.choice === "Task hinzufügen") {
      const answer = await inquirer.prompt({
        type: "input",
        name: "task",
        message: "Neue Aufgabe:",
      });

      todos.push({
        id: todos.length + 1,
        task: answer.task,
        done: false,
      });
      saveTodos(todos);
      console.log(todos);
    }

    if (step.choice === "Task bearbeiten") {
      console.log(todos);

      const answer = await inquirer.prompt({
        type: "input",
        name: "id",
        message: "Welche ID ändern?",
      });

      const id = Number(answer.id);

      const task = todos.find((item) => item.id === id);

      if (task) {
        task.done = !task.done;
      }
      saveTodos(todos);
      console.log(todos);
    }

    if (step.choice === "Task löschen") {
    // Task löschen
const answer = await inquirer.prompt({
  type: "input",
  name: "id",
  message: "Welche ID löschen?"
});

const id = Number(answer.id);

// Finde Index
const index = todos.findIndex(t => t.id === id);

if (index !== -1) {
  todos.splice(index, 1);

  todos.forEach((t, i) => {
    t.id = i + 1; 
  });
}

saveTodos(todos);
console.log(todos);
    }

    if (step.choice === "Alle Tasks anzeigen") {
       const done = todos.filter(t => t.done)
  const open = todos.filter(t => !t.done)

  console.log("\nOffene Tasks:")
  open.forEach(t => console.log(`${t.id}. ${t.task} ❌`))

  console.log("\nErledigte Tasks:")
  done.forEach(t => console.log(`${t.id}. ${t.task} ✅`))
    }

    if (step.choice === "Beenden") {
      console.log("Bis bald, User");
      process.exit(0);
    } 
  }
}

main();
