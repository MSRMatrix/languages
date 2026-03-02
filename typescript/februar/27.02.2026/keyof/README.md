# 📦 DeepReadonly in TypeScript

## 🎯 Ziel

Wir wollen einen generischen Type bauen, der **alle Properties eines Objekts rekursiv readonly macht**.

Nicht nur oberflächlich – sondern auch verschachtelte Objekte.

---

## 🧱 1. Shallow Readonly (nur oberste Ebene)

```ts
type ShallowReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
```

### Erklärung

- `keyof T` → gibt alle Keys von `T`
- `[K in keyof T]` → wir iterieren über alle Keys
- `readonly` → macht jede Property unveränderlich
- `T[K]` → der ursprüngliche Typ der Property

### Problem

Das funktioniert nur **oberflächlich**.

```ts
type User = {
  name: string
  address: {
    city: string
  }
}
```

Ergebnis:

```ts
{
  readonly name: string
  readonly address: {
    city: string // ❌ immer noch veränderbar
  }
}
```

`address` ist readonly –  
aber das Objekt darin nicht.

---

## 🧠 2. Der entscheidende Gedanke

Wenn eine Property selbst ein Objekt ist,  
müssen wir die gleiche Logik **nochmal anwenden**.

Das bedeutet: **Rekursion auf Type-Ebene**.

Wir prüfen:

```ts
T extends object ? ... : ...
```

Wenn `T` ein Objekt ist → weiter transformieren  
Wenn nicht (string, number, boolean etc.) → einfach zurückgeben

---

## 🚀 3. DeepReadonly Lösung

```ts
type DeepReadonly<T> =
  T extends object
    ? {
        readonly [K in keyof T]: DeepReadonly<T[K]>
      }
    : T
```

---

## 🔍 Was passiert hier?

1. Wenn `T` kein Objekt ist → gib `T` zurück  
2. Wenn `T` ein Objekt ist:
   - Iteriere über alle Keys
   - Mache jede Property `readonly`
   - Rufe `DeepReadonly` erneut auf den Wert auf

Das ist **rekursive Typ-Transformation**.

---

## 📌 Beispiel

```ts
type User = {
  name: string
  address: {
    city: string
  }
}
```

Ergebnis:

```ts
type Result = DeepReadonly<User>

/*
{
  readonly name: string
  readonly address: {
    readonly city: string
  }
}
*/
```

---

## 🧊 Was ist mit Arrays?

Arrays sind auch `object`.

```ts
type Test = DeepReadonly<string[]>
```

Ergebnis:

```ts
readonly string[]
```

Funktioniert automatisch, weil Arrays Objekte sind.

---

## 🧠 Kernkonzepte

DeepReadonly basiert auf nur drei Konzepten:

1. Conditional Types (`T extends object ? ... : ...`)
2. Mapped Types (`[K in keyof T]`)
3. Rekursion auf Type-Ebene

---

## 🏁 Fazit

DeepReadonly ist ein klassisches Beispiel für:

- fortgeschrittene Generics
- rekursive Typen
- Type-Level Programming
