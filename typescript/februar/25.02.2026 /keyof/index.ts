interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}

// keyof User gibt zurück:
type UserKeys = keyof User; 
// "name" | "age" | "isAdmin"


function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { name: "Mike", age: 25, isAdmin: true };

const name = getValue(user, "name");     // string
const age = getValue(user, "age");       // number
// const wrong = getValue(user, "email"); // ❌ Fehler: "email" existiert nicht

console.log(name)
console.log(age)


// function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
//     return arr.map((item) => item[key]) 
// }

// const users = [
//   { name: "Mike", age: 25 },
//   { name: "Anna", age: 30 },
// ];

// const names = pluck(users, "name"); 
// const ages = pluck(users, "age");  

// console.log(names)
// console.log(ages)


function pluckOptional<T, K extends keyof T> (arr: T[], key: K): T[K][]{
    return arr.map((item) => item[key]).filter((filteredItem) => filteredItem !== undefined)
}


const users = [
  { name: "Mike", age: 25 },
  { name: "Anna" },           // age fehlt
  {  age: 30 },
];

const ages = pluckOptional(users, "age"); 
const names = pluckOptional(users, "name"); 
// [25, 30] -> der fehlende age-Wert wird ignoriert

console.log(ages);
console.log(names);