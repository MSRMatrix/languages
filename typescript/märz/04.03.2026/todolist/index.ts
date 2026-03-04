import inquirer from "inquirer"
import { readFileSync } from "fs"
import { writeFileSync } from "fs"


interface Todo {
  id: number
  task: string
  done: boolean
}


const todos: Todo[] = loadTodos()

function loadTodos(): Todo[] {
  const data = readFileSync("./todos.json", "utf-8")
  return JSON.parse(data) as Todo[]
}



function saveTodos(todos: Todo[]) {
  writeFileSync("./todos.json", JSON.stringify(todos, null, 2))
}



async function main() {

    while (true) {

    const step = await inquirer.prompt({
      type: "list",
      name: "choice",
      message:`Was möchtest du tun: 
        1. Task hinzufügen",
        2. Task umschalten",
        3. Task löschen",
        4. Beenden
        Deine Antwort:`,
      choices: [
        "Task hinzufügen",
        "Task umschalten",
        "Task löschen",
        "Beenden"
      ]
    })


if(step.choice === "1"){
    const answer = await inquirer.prompt({
    type: "input",
    name: "task",
    message: "Neue Aufgabe:"
  })

  todos.push({
    id: todos.length + 1,
    task: answer.task,
    done: false
  })
  saveTodos(todos)
  console.log(todos)
}
  
if (step.choice === "2") {

  console.log(todos)

  const answer = await inquirer.prompt({
    type: "input",
    name: "id",
    message: "Welche ID ändern?"
  })

  const id = Number(answer.id)

  const task = todos.find((item) => item.id === id)

  if (task) {
    task.done = !task.done
  }
  saveTodos(todos)
  console.log(todos)
}


if (step.choice === "3") {

  const answer = await inquirer.prompt({
    type: "input",
    name: "id",
    message: "Welche ID löschen?"
  })

  const id = Number(answer.id)

  const index = todos.findIndex(t => t.id === id)

  if (index !== -1) {
    todos.splice(index, 1)
  }
saveTodos(todos)
  console.log(todos)
} 


if (step.choice === "4") {
    console.log("Bis bald, User")
process.exit(0)
    }
    else{
        console.log("Wähle einer der gültigen Möglichkeiten aus!")
    }
    }
}

main()