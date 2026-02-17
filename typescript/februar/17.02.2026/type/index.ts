// ---------------- Username (Type Alias) ----------------
type Username = string;

let user: Username = "Mike"; // ✅ gültig

console.log("Username:", user);

// Erklärung: Username ist nur ein Alias für string



// ---------------- Literal Types ----------------
type Direction = "left" | "right" | "up" | "down";

let move: Direction = "left";   // ✅
let move2: Direction = "up";    // ✅
// let move3: Direction = "forward"; ❌ TypeScript Fehler

console.log("Move:", move);
console.log("Move2:", move2);


// ---------------- Object Type ----------------
type Profile = {
  name: string;
  age: number;
};

const pro: Profile = {
  name: "Alice",
  age: 30,
};

console.log("Person:", pro);

// Erklärung: Objekt muss die Eigenschaften name:number und age:string enthalten


// ---------------- Optional Properties ----------------
type User = {
  name: string;
  age?: number;
};

const u1: User = { name: "Mike" };          // ✅
const u2: User = { name: "Anna", age: 25 }; // ✅
// const u3: User = { age: 25 }; ❌ Fehler, name fehlt

console.log("User1:", u1);
console.log("User2:", u2);


// ---------------- Intersection Types ----------------
type HasName = { name: string };
type HasAge = { age: number };

type Person = HasName & HasAge;

const p: Person = {
  name: "Tom",
  age: 40,
};

// const p1: Person = { name: 20, age: "Tom" }; ❌ Fehler

console.log("Intersection Person:", p);


// ---------------- Function Type ----------------
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => {
  return `Hello ${name}`;
};

console.log(greet("Mike")); // ✅



// ---------------- Array Type ----------------
type Numbers = number[];

let values: Numbers = [1, 2, 3]; // ✅
// let values2: Numbers = ["1", "2", "3"]; ❌ Fehler

console.log("Numbers:", values);



// ---------------- Tuple Type ----------------
type UserTuple = [string, number];

let userlist: UserTuple = ["Mike", 25]; // ✅
// let user2: UserTuple = [25, "Mike"]; ❌ Fehler

console.log("Tuple User:", userlist);



// ---------------- Union Types ----------------
type ID = string | number;

let id1: ID = "abc123"; // ✅
let id2: ID = 42;       // ✅
// let id3: ID = true;   ❌ Fehler

console.log("ID1:", id1);
console.log("ID2:", id2);



// ---------------- Literal + Object ----------------
type Status = "success" | "error";

type ApiResponse = {
  status: Status;
  data: string;
};

const response1: ApiResponse = {
  status: "success", // error und andere Statustypen existieren auch
  data: "Alles gut",
};

// const response2: ApiResponse = { status: 23, data: false }; ❌ Fehler

console.log("ApiResponse:", response1);
