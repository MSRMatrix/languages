// --------------------------------------------------
//  1️⃣ Generics
// --------------------------------------------------


// function identity(arg: any): any {
//   return arg;
// }

// const result: string = identity(42);

// console.log(identity("Hello")); // "Hello"
// console.log(identity(42));      // 42
// console.log(result)


// Any geht für alles, doch wird kaum verwendet

// --------------------------------------------------
//  2️⃣ Generics lösen das Problem
// --------------------------------------------------


// function identity<T>(arg: T): T {
//   return arg;
// }

// const str = identity<string>("Hello"); // str: string ✅
// const num = identity<number>(42);      // num: number ✅

// console.log(str)
// console.log(num)

// Typ wird sich gemeint mit <string> <number> etc

// --------------------------------------------------
//   3️⃣ Generics mit Arrays
// --------------------------------------------------


function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const numbers = [1, 2, 3];
const firstNum = firstElement<number>(numbers); // firstNum: number ✅

const strings = ["a", "b", "c"];
const firstStr = firstElement<string>(strings); // firstStr: string ✅

console.log(firstNum)
console.log(firstStr)


// T wird als Platzhalter verwendet



// --------------------------------------------------
//    5️⃣ Generics mit mehreren Typen
// --------------------------------------------------

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const myPair = pair<string, number>("Age", 30);
console.log(myPair); // ["Age", 30]


// --------------------------------------------------
//    6️⃣ Generics mit Constraints
// --------------------------------------------------


function logName<T extends { name: string }>(obj: T): void {
  console.log(obj.name);
}

logName({ name: "Mike", age: 25 }); // ✅ erlaubt
// logName({ age: 25 });              // ❌ Fehler


// --------------------------------------------------
//    7️⃣ Praktische Übung für dich
// --------------------------------------------------


// Aufgabe 1 ------------------------------------------------------------------- 


function getLastElement<Element>(arr: Element[]) : Element | undefined{
    return arr[arr.length -1]
}

const strings1 = ["first", "second", "last"]
const numbers1 = [1, 2, 3];

const result1 = getLastElement<string>(strings1)
const result2 = getLastElement<number>(numbers1)

console.log(result1)
console.log(result2)


// Aufgabe 2 ------------------------------------------------------------------- 


interface Response<T> {
  status: "success" | "error";
  data: T;
}

const r1: Response<string> = {
  status: "success",
  data: "Alles gut",
};

const r2: Response<number> = {
  status: "error",
  data: 404,
};

console.log(r1)
console.log(r2)


// Aufgabe 3 ------------------------------------------------------------------- 


// Kommt noch