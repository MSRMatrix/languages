// Test Aufgabe

function wrapInArray<T>(value: T): T[] {
  return [value];
}

const num = wrapInArray(10);
const str = wrapInArray("Mike");

console.log(num); // [10]
console.log(str); // ["Mike"]




interface Response<T> {
  status: "success" | "error";
  data: T;
}

const r1: Response<number> ={
    status: "success",
    data: 200   
}

console.log(r1)