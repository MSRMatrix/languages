import inquirer from "inquirer";
import axios from "axios";

async function main() {


  const answers = await inquirer.prompt([
    {
      type: "select",
      name: "method",
      message: "HTTP Methode:",
      choices: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    },
    {
      type: "input",
      name: "url",
      message: "URL:"
    }
  ]);

  try {
    const response = await axios({
      method: answers.method,
      url: answers.url
    });

    console.log("\nStatus:", response.status);
    console.log("Response:\n", response.data);
  } catch (error: any) {
    console.log("Fehler:", error.message);
  }
}

main();