// Deklarationen


// javascript
let sample = false

// typescript
let sample_2: boolean = false
// Typ wird sofort zugewiesen

// Wirft vor dem Ausführen schon Fehler aus:
// sample_2 = "hallo"
// sample_2 = 1
// Weil typ nicht übereinstimmt zb. boolean = number ergibt error

let value: string | number = "hello";
value = 42;
// Kein Fehler weil number gegeben wurde als entweder string oder number


type A = { a: number };
type B = { b: string };
type C = A & B;
// Aus zwei objects wird eins

let direction: "left" | "right" | "up" | "down" = "left";

// Gibt vor was man nutzen kann, zb. forward würde einen Fehler aussdrucken

function addFunction(x: number, y: number): number {
  return x + y;
}

// Definierung der Parameter

function greetFunction(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

// console.log(greet("mike"))


// Concise arrow function (implicit return)
const add = (a: number, b: number) => a + b;

// Arrow function with explicit return and block body
const greet = (name: string) => { return `Hello, ${name}!`; };

// console.log(greet("Mike"))


interface Person {
  name: string;
  age: number;
  greet(): void; //Void wird nur selten angewendet
}

const person: Person = {
  name: "Alice",
  age: 30, 
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// console.log(person)
// person.greet()
// console.log(person.greet()) wirft das greet und ein undefined aus