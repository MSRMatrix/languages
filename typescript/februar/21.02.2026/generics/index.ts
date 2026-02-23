function createPairObject<T, U>(first: T, second: U): { first: T; second: U } {
  return {
    first,
    second,
  };
}

const result1 = createPairObject("age", 30);
// Typ:
// { first: string; second: number }

const result2 = createPairObject(true, { name: "Mike" });
// Typ:
// { first: boolean; second: { name: string } }

// console.log(result1);
// console.log(result2);

function mergeObjects<T extends object, U extends object>(
  a: T,
  b: U
): T & U {
  return { ...a, ...b };
}
const a = { id: 1 };
const b = { active: true };

const merged = mergeObjects(a, b);

// console.log(merged)


function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}


const user = {
  name: "Mike",
  age: 25,
};

const name = getProperty(user, "name"); // string
const age = getProperty(user, "age");   // number

// ❌ das soll einen Fehler geben:
getProperty(user, "email");

console.log(name)
console.log(age)
