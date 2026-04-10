import inquirer from "inquirer";
import axios from "axios";
import type { Request } from "./types";

async function main() {
  const history: any[] = [];

  const request: Request = {
  name: "",
  url: "",
  method: "",
  }

  while (true) {
    const menu = await inquirer.prompt({
      type: "select",
      name: "choice",
      message: "Hauptmenü",
      choices: ["Neuer Request", "History", "Settings", "Exit"],
    });

    if (menu.choice === "Exit") {
      console.log("Programm beendet.");
      process.exit(0);
    }

    if (menu.choice === "Neuer Request") {
      const answers = await inquirer.prompt([
        {
          type: "select",
          name: "method",
          message: "HTTP Methode:",
          choices: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        },
        {
          type: "input",
          name: "url",
          message: "URL:",
        },
      ]);

      try {
        const response = await axios({
          method: answers.method,
          url: answers.url,
        });

        console.log("\nStatus:", response.status);
        console.log("Response:\n", response.data);

        history.push({ method: answers.method, url: answers.url, status: response.status });
      } catch (error: any) {
  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Response:", error.response.data);
  } else if (error.request) {
    console.log("Keine Antwort vom Server");
  } else {
    console.log("Fehler:", error.message);
  }
}
    }

    if (menu.choice === "History") {
      console.log("\nBisherige Requests:");
      history.forEach((r, i) => {
        console.log(`${i + 1}. ${r.method} ${r.url} → ${r.status || "Fehler"}`);
      });
    }

    if (menu.choice === "Settings") {
      console.log("\nEinstellungen: noch nicht implementiert");
    }
  }
}

main();