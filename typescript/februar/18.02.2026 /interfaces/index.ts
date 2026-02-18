// ==================================================
// INTERFACES – LERNÜBERSICHT
// ==================================================



// --------------------------------------------------
// 1️⃣ Interface Struktur
// --------------------------------------------------

interface Person {
  name: string;
  age: number;
}

const user: Person = {
  name: "Mike",
  age: 25,
};

console.log(user); 
// { name: "Mike", age: 25 }

// Alle Werte müssen angegeben werden,
// sonst gibt TypeScript einen Fehler vor dem Start.



// --------------------------------------------------
// 2️⃣ Optionale Eigenschaften
// --------------------------------------------------

interface PersonOptional {
  name: string;
  age?: number; // optional
}

const userOptional: PersonOptional = {
  name: "Mike",
};

console.log(userOptional);
// { name: "Mike" }

// Durch das Fragezeichen wird "age" optional.



// --------------------------------------------------
// 3️⃣ Methoden im Interface
// --------------------------------------------------

interface PersonWithMethod {
  name: string;
  greet(): void;
}

const userWithMethod: PersonWithMethod = {
  name: "Mike",
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  },
};

userWithMethod.greet();

// void = gibt keinen Wert zurück
// string = muss einen String zurückgeben



// --------------------------------------------------
// 4️⃣ Readonly
// --------------------------------------------------

interface PersonReadonly {
  readonly id: number;
  name: string;
}

const userReadonly: PersonReadonly = {
  id: 1,
  name: "Mike",
};

userReadonly.name = "Max"; // ✅ erlaubt
// userReadonly.id = 2;    // ❌ Fehler

// readonly verhindert das Ändern des Wertes.



// --------------------------------------------------
// 5️⃣ Interface erweitern (extends)
// --------------------------------------------------

interface BasePerson {
  name: string;
}

interface Employee extends BasePerson {
  salary: number;
}

const worker: Employee = {
  name: "Mike",
  salary: 3000,
};

console.log(worker);

// Employee übernimmt alles von BasePerson + salary



// --------------------------------------------------
// 6️⃣ Mehrere Interfaces kombinieren
// --------------------------------------------------

interface A {
  a: string;
}

interface B {
  b: number;
}

interface C extends A, B {}

const obj: C = {
  a: "Hello",
  b: 42,
};

console.log(obj);

// C enthält Eigenschaften von A und B.



// --------------------------------------------------
// 7️⃣ Unterschied: interface vs type
// --------------------------------------------------

// Beide können Objekte beschreiben:

type PersonType = {
  name: string;
};

/*
Unterschiede:

interface
- Für Objektstrukturen gedacht
- Erweiterbar (declaration merging)
- Sehr beliebt bei Klassen

type
- Für alles nutzbar (Union, Intersection etc.)
- Nicht mergebar
- Sehr flexibel
*/



// --------------------------------------------------
// 8️⃣ Mini-Aufgabe – Car Interface
// --------------------------------------------------

interface Car {
  brand: string;
  year: number;
  start(): void;
}

const newCar: Car = {
  brand: "Nissan",
  year: 2020,
  start() {
    console.log(
      `My car is a ${this.brand} and from ${this.year}!`
    );
  },
};

newCar.start();
