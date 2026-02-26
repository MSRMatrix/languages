
// function hasKey<T extends object, K extends keyof T>(obj: T, key: K): boolean{
//     return key in obj
// }


// const user = {
//   name: "Mike",
//   age: 25,
// };

// console.log(hasKey(user, "name"))
// console.log(hasKey(user, "email"))


// function getKeys<T extends object>(obj: T): (keyof T)[]{
//     return Object.keys(obj).map((item) => item as keyof T)
// }



// const user = {
//   name: "Mike",
//   age: 25,
//   isAdmin: true,
// };

// const keys = getKeys(user);
// // Typ soll sein:
// // ("name" | "age" | "isAdmin")[]

// console.log(keys)



function makeReadOnly<T>(obj: T): Readonly<T> {
    return obj;
}

const user = {
  name: "Mike",
  age: 25,
};

const readonlyUser = makeReadOnly(user);

// Typisch:
readonlyUser.name = "Anna"; // ❌ TypeScript-Fehler
readonlyUser.age = 30;  // ❌ TypeScript-Fehler