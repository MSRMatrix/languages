// function identity<T>(value: T): T {
//   return value;
// }


// const a = identity("Mike");   // T = string
// const b = identity(25);       // T = number
// const c = identity(true);     // T = boolean


// console.log(a)
// console.log(b)
// console.log(c)




// function pair<T, U>(a: T, b: U) {
//   return { a, b };
// }

// const result = pair("Mike", 25);

// console.log(result)


// function logLength<T extends { length: number }>(value: T) {
//   console.log(value.length);
// }



// logLength("Hallo");      // string hat length
// logLength([1,2,3]);      // array hat length
// logLength(123); // ❌ number hat keine length



// function wrapInArray<T>(a: T): T[]{
//     return [a]
// }


// const a = wrapInArray("Mike");

// const b = wrapInArray(25);

// const c = wrapInArray(true);


// console.log(a)
// console.log(b)
// console.log(c)


// function getFirstElement<T>(a: T[]): T | undefined{
//     return a[0]
// }



// const a = getFirstElement(["Mike", "Anna"]);
// // Typ: string

// const b = getFirstElement([10, 20, 30]);
// // Typ: number

// const c = getFirstElement([true, false]);
// // Typ: boolean


// console.log(a)
// console.log(b)
// console.log(c)



// function getLastElement<T>(a: T[]): T | undefined{
//     return a[a.length -1]
// }


// const numbers = [10, 20, 30];
// const lastNum = getLastElement(numbers);

// const strings = ["first", "second", "last"];
// const lastStr = getLastElement(strings); 

// console.log(lastNum);
// console.log(lastStr); 


function wrapAndPair<T, U>(a: T, b: U): [T, U] {
    return [a, b];
}

const pair1 = wrapAndPair("Mike", 25);
// Typ: [string, number]

const pair2 = wrapAndPair(true, { name: "Anna" });
// Typ: [boolean, { name: string }]

console.log(pair1); // ["Mike", 25]
console.log(pair2); // [true, { name: "Anna" }]
