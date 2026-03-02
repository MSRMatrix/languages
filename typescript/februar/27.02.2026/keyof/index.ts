console.log("Hello via Bun!");

type MakeOptional<T> = {
   [K in keyof T]?: T[K]
}

// type User = {
//   name: string
//   age: number
// }

// type OptionalUser = MakeOptional<User>

// const user1: OptionalUser = {
//   name: "Mike" // age ist optional
// }

// const user2: OptionalUser = {
//   age: 25 // name ist optional
// }

// const user3: OptionalUser = {
//   name: "Anna",
//   age: 30 // beide Properties angegeben
// }


type MakeNullable<T> = {
    [K in keyof T]: T[K] | null
}

type User = {
  name: string
  age: number
}

type NullableUser = MakeNullable<User>

