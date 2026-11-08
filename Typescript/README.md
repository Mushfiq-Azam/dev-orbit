# TypeScript Tutorial

> A hands-on walkthrough of the TypeScript concepts covered in this section.
> Read a topic, then open [`code/src/script.ts`](./code/src/script.ts) and try the
> exercises at the end.

![JavaScript to TypeScript developer journey](./JavaScript_to_TypeScript_Developer_Journey.png)

---

## Table of Contents

1. [What is TypeScript and why does it matter?](#1-what-is-typescript-and-why-does-it-matter)
2. [How this section is set up](#2-how-this-section-is-set-up)
3. [Primitive types](#3-primitive-types)
4. [Type inference vs. type annotations](#4-type-inference-vs-type-annotations)
5. [Functions: parameters and return types](#5-functions-parameters-and-return-types)
6. [Arrays and tuples](#6-arrays-and-tuples)
7. [Optional, default, and rest parameters](#7-optional-default-and-rest-parameters)
8. [Objects: inline types, type aliases, and interfaces](#8-objects-inline-types-type-aliases-and-interfaces)
9. [Type alias vs. interface: which one?](#9-type-alias-vs-interface-which-one)
10. [Excess property checks](#10-excess-property-checks)
11. [Compile-time vs. runtime errors](#11-compile-time-vs-runtime-errors)
12. [Where TypeScript is used in the real world](#12-where-typescript-is-used-in-the-real-world)
13. [Common mistakes in this section (and fixes)](#13-common-mistakes-in-this-section-and-fixes)
14. [Practice exercises](#14-practice-exercises)
15. [Cheat sheet](#15-cheat-sheet)
16. [Next steps](#16-next-steps)

---

## 1. What is TypeScript and why does it matter?

TypeScript is **JavaScript with a type system**. You write `.ts` files, the
TypeScript compiler (`tsc`) checks them, and it outputs plain `.js` files that
run anywhere JavaScript runs — browsers, Node.js, Deno, Bun, mobile, and edge
functions.

**What we learn**

- How to describe the shape of data with types.
- How to catch mistakes before the code runs.
- How to use the compiler as a safety net and a documentation tool.

**Why it is important**

| Benefit | What it means in practice |
| --- | --- |
| Catch bugs early | A wrong argument, a typo, or a missing property is reported while you type — not in production. |
| Safer refactoring | Rename a field and the compiler shows every place that breaks. |
| Self-documenting code | `(user: User) => void` explains intent better than a comment. |
| Better editor support | Autocomplete, jump-to-definition, and inline errors come from types. |
| Team scalability | Large codebases stay understandable because contracts are explicit. |

**Where to use it**

- Application code (React, Vue, Angular, Node APIs, CLI tools).
- Shared libraries and SDKs, where types are part of the public API.
- Any JavaScript project that has grown beyond a few files.

> TypeScript does **not** change runtime behavior. It only adds a checking step
> before your JavaScript runs. Types disappear after compilation.

---

## 2. How this section is set up

The example project lives in [`code/`](./code):

```text
Typescript/
└── code/
    ├── index.html          # loads dist/script.js in the browser
    ├── tsconfig.json       # compiler configuration
    ├── src/
    │   └── script.ts       # the TypeScript we write
    └── dist/
        └── script.js       # the JavaScript tsc generates
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "esnext",
    "target": "esnext",
    "types": [],
    "strict": true,
    "skipLibCheck": true
  }
}
```

| Option | Purpose |
| --- | --- |
| `rootDir` | Where the TypeScript source lives. |
| `outDir` | Where compiled JavaScript is written. |
| `module` / `target` | Output module format and JavaScript version. |
| `strict` | Turns on the strongest type checks. **Keep this on.** |
| `skipLibCheck` | Skips type-checking third-party `.d.ts` files to speed up builds. |
| `types` | `[]` prevents automatic loading of global `@types` packages. |

**Build loop**

```bash
cd Typescript/code
npx tsc          # compile once: src/script.ts -> dist/script.js
npx tsc --watch  # recompile on every save
```

Open `index.html` in a browser to run `dist/script.js`.

**Why this matters:** understanding the source → compile → output pipeline is
the foundation for every TypeScript project. Frameworks hide this step, but it
is always happening underneath.

---

## 3. Primitive types

From `script.ts`:

```ts
let myString: string = "Mushfiq";
let myNumber: number = 42;
let myBoolean: boolean = true;
let mySymbol: symbol = Symbol("mySymbol");
let myBigInt: bigint = 9007199254740991n;
```

**What we learn**

TypeScript's core primitive types:

| Type | Example | Use for |
| --- | --- | --- |
| `string` | `"hello"` | Text. |
| `number` | `42`, `3.14` | All numbers — integers and floats. |
| `boolean` | `true` / `false` | Flags and conditions. |
| `symbol` | `Symbol("id")` | Unique identifiers, often as object keys. |
| `bigint` | `9007199254740991n` | Integers larger than `Number.MAX_SAFE_INTEGER`. |
| `null` | `null` | Intentional absence of a value. |
| `undefined` | `undefined` | A value that has not been assigned. |
| `any` | anything | Escape hatch — **avoid it**, it disables checking. |
| `unknown` | anything | Safe alternative to `any`; must be narrowed before use. |
| `never` | — | A value that can never occur (e.g. a function that always throws). |
| `void` | — | A function that returns nothing. |

**Why it is important**

- `"42"` (string) and `42` (number) are different types; TypeScript stops you
  from mixing them accidentally.
- `bigint` prevents precision loss for very large integers.
- `unknown` forces you to check a value before using it, which is much safer
  than `any`.

**Where to use it**

- Annotate **boundaries**: function parameters, return values, API payloads,
  and exported values.
- Let TypeScript infer types for obvious local variables (see the next section).

---

## 4. Type inference vs. type annotations

```ts
let myString: string = "Mushfiq"; // explicit annotation
let inferred = "Mushfiq";         // inferred as string
```

**What we learn**

- **Annotation** — you write the type: `const age: number = 30`.
- **Inference** — TypeScript figures it out: `const age = 30`.

**Why it is important**

Annotations are documentation and guardrails, but too many of them add noise.
Good TypeScript is a balance: annotate public contracts, infer local details.

```ts
// Prefer this
const fullName = firstName + " " + lastName; // inferred: string

// Over this
const fullName: string = firstName + " " + lastName;
```

**Where to use annotations**

- Function parameters and return types.
- Object shapes shared across files.
- Anything exported from a module.
- When the inferred type is wider than you want (e.g. `let status = "idle"` is
  `string`; use `let status: "idle" | "loading" = "idle"` to narrow it).

---

## 5. Functions: parameters and return types

```ts
const addTwo = (a: number, b: number): number => {
  return a + b;
};

console.log(addTwo(9, 8)); // 17
```

**What we learn**

- Every parameter can have a type.
- The return type goes after the parameter list: `: number`.
- Arrow functions and regular functions use the same type syntax.
- If a function returns nothing, its type is `void`.

**Why it is important**

Functions are where most bugs happen: wrong argument count, wrong argument
order, or a missing return value. Typed parameters and return types make those
mistakes impossible to ignore.

```ts
addTwo("9", 8);
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.

const bad = (a: number, b: number): string => {
  return a + b;
};
// Error: Type 'number' is not assignable to type 'string'.
```

**Where to use it**

- Every exported or shared function.
- Callbacks passed to array methods, event handlers, and APIs.
- Any function whose return value other code depends on.

**Tip:** let TypeScript infer the return type for small, obvious functions, but
annotate exported functions so their contract is explicit and stable.

---

## 6. Arrays and tuples

### Arrays

```ts
const arr: string[] = ["Mushfiq", "is", "a", "developer"];
const numArr: number[] = [1, 2, 3, 4, 5];

// Equivalent generic syntax
const scores: Array<number> = [10, 20, 30];
```

An array type means **any number of values of one type**.

### Tuples

```ts
const dataLatLong: readonly [number, number] = [40.7128, -74.006];
```

A tuple means **a fixed number of values with a specific type at each position**.
Here it is a latitude/longitude pair: exactly two numbers, in that order.

**What we learn**

- `string[]` / `Array<string>` — a list.
- `[number, number]` — a fixed-length, position-typed value.
- `readonly` — prevents mutation.
- Named tuple members improve readability:

```ts
type UserAction = [name: string, age: number, isActive: boolean];
```

**Why it is important**

Arrays and tuples express different guarantees. A coordinate must always have
two numbers; a list of tags can have any length. Using a tuple prevents
`[40.7128]` or `[40.7128, -74.006, 100]` from slipping through.

**Where to use it**

- Arrays: collections, lists, query results, `map`/`filter` output.
- Tuples: coordinates, key/value pairs, React's `useState` return value,
  function arguments that must keep a strict order, and fixed records.

**Note on the example:** `dataLatLong.push(100)` fails because the tuple is
`readonly` — mutating methods like `push` are removed. A plain (non-readonly)
tuple would still allow `push` with the correct element type; that is a known
TypeScript limitation, not true runtime immutability. Use `readonly` when you
want the compiler to block mutation.

---

## 7. Optional, default, and rest parameters

### Optional parameters

```ts
const concatNames = (firstName: string, lastName?: string) => {
  if (!lastName) {
    return firstName;
  }
  return firstName + " " + lastName;
};

concatNames("Mushfiq");          // "Mushfiq"
concatNames("Mushfiq", "Azam");  // "Mushfiq Azam"
```

The `?` marks a parameter as optional. Its type becomes `string | undefined`.

### Default parameters

```ts
const greetings = (greeting: string = "Hello", fullname: string): void => {
  console.log(greeting + " " + fullname);
};

greetings("Hi", "Mushfiq");        // "Hi Mushfiq"
greetings(undefined, "Mushfiq");   // "Hello Mushfiq"
```

If the caller passes `undefined`, the default is used.

### Rest parameters

```ts
const sumNumbers = (...numbers: number[]): number => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

sumNumbers(1, 2, 3, 4, 5); // 15
```

The `...` collects any number of arguments into an array.

Rest parameters can also be typed as a tuple, which enforces order and count:

```ts
const longUserAction = (
  ...args: [name: string, age: number, isActive: boolean]
): void => {
  const [name, age] = args;
  console.log(`${name} is ${age}`);
};

longUserAction("Mushfiq", 30, true); // "Mushfiq is 30"
```

**What we learn**

- Optional parameters use `?` and must come **after** required parameters.
- Default parameters provide a fallback value.
- Rest parameters collect remaining arguments into an array or tuple.

**Why it is important**

Real functions often have flexible input. These features let you model that
flexibility precisely instead of accepting `any` or writing runtime checks
everywhere.

**Where to use it**

- Optional config objects and flags.
- Default settings (timeouts, labels, locales).
- Utility functions like `sum`, `log`, and wrappers that forward arguments.

**Gotcha:** a required parameter after a defaulted one is legal but awkward —
callers must pass `undefined` to reach the default. Prefer putting required
parameters first, or use an options object.

---

## 8. Objects: inline types, type aliases, and interfaces

### Inline object type

```ts
const user: {
  name: string;
  age: number;
  isActive: boolean;
  action: () => void;
  badges: string[];
} = {
  name: "Mushfiq",
  age: 30,
  isActive: true,
  action: () => console.log("Hello"),
  badges: ["admin", "editor"],
};
```

### Type alias

```ts
type TUser = {
  name: string;
  age: number;
  isActive: boolean;
  action: () => void;
  badges: string[];
};
```

### Interface

```ts
interface IUser {
  name: string;
  age: number;
  isActive: boolean;
  action: () => void;
  badges: string[];
}
```

**What we learn**

- Object types describe the **shape** of an object: which properties exist and
  what type each one has.
- `type` and `interface` both create reusable names for that shape.
- Function properties are typed with a function signature: `() => void`.
- Array properties use `string[]`.

**Why it is important**

Objects are the main data structure in JavaScript applications. Describing them
turns implicit assumptions into checked contracts, gives you autocomplete, and
prevents typos and missing fields.

**Where to use it**

- API request/response bodies.
- Component props and state.
- Database models and domain entities.
- Configuration objects and function options.

---

## 9. Type alias vs. interface: which one?

Both can describe an object:

```ts
type Point = { x: number; y: number };
interface PointI { x: number; y: number }
```

Use this rule of thumb:

| Use `type` when | Use `interface` when |
| --- | --- |
| Naming a primitive: `type UserId = string` | Defining an object shape others will extend |
| Creating a union: `type Status = "idle" \| "loading" \| "error"` | Building a public API or library contract |
| Combining types: `type Admin = User & { role: "admin" }` | Using declaration merging or `extends` |
| Naming tuples, functions, or mapped types | You want clear, extendable object contracts |

```ts
// type alias for a primitive
type Username = string;

// type alias for a union
type Status = "idle" | "loading" | "success" | "error";

// interface inheritance
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}
```

**Why it is important**

Choosing consistently keeps a codebase predictable. `interface` communicates
"this is an object contract"; `type` communicates "this is an alias for
something, possibly not an object."

**Where to use it**

- `type` for unions, primitives, tuples, and composed utility types.
- `interface` for object shapes, especially public ones and those meant to be
  extended.

> In most day-to-day code either works. What matters is consistency within the
> project.

---

## 10. Excess property checks

At the end of `script.ts`:

```ts
user.email = "mushfiq@gmail.com";
// Error: Property 'email' does not exist on type '{ ... }'.

console.log(user2.address);
// Error: Property 'address' does not exist on type 'IUser'.
```

**What we learn**

TypeScript checks more than the type of existing properties — it also rejects
properties that were never declared. This is called an **excess property check**.

**Why it is important**

Typos like `usr.nmae` or accidental fields like `address` are caught
immediately. This keeps objects consistent and prevents silent `undefined`
values.

**Where to use it**

- Anywhere data crosses a boundary: API responses, form values, config files.
- When you want to allow extra fields deliberately, add an index signature:

```ts
interface User {
  name: string;
  [key: string]: unknown; // explicitly allow extra properties
}
```

---

## 11. Compile-time vs. runtime errors

```ts
let x: number = "hello";
// Compile error: Type 'string' is not assignable to type 'number'.
```

TypeScript errors happen **before** the code runs. Runtime errors (a failed
network request, `undefined.map(...)`, etc.) still happen in JavaScript.

**Why it is important**

TypeScript removes a large class of bugs — wrong types, missing properties,
misspelled names, incorrect arguments — but it cannot guarantee that an API
returns what you expect. Types describe what *should* happen; runtime
validation proves what *did* happen.

**Where to use it**

- Use TypeScript for compile-time correctness.
- Use runtime validation (e.g. Zod, Valibot, manual guards) at system
  boundaries: user input, `fetch` responses, `localStorage`, environment
  variables.

---

## 12. Where TypeScript is used in the real world

| Area | Typical use |
| --- | --- |
| Frontend | React, Vue, Angular, Svelte — typed props, state, and events. |
| Backend | Node.js APIs, NestJS, Express, Fastify — typed requests and responses. |
| Full-stack | Next.js, Remix, Nuxt — shared types between client and server. |
| Libraries | SDKs and npm packages ship `.d.ts` files for consumers. |
| Tooling | CLIs, build scripts, editor extensions, VS Code itself. |
| Mobile / desktop | React Native, Expo, Electron, Tauri. |
| Testing | Typed test fixtures and mocks. |

The same four questions apply to every feature in this tutorial:

1. **What is it?** — the syntax and semantics.
2. **Why does it matter?** — the bug or ambiguity it removes.
3. **Where do I use it?** — the boundaries and contracts in real code.
4. **What is the trade-off?** — when it adds noise or false confidence.

---

## 13. Common mistakes in this section (and fixes)

These are worth studying because they are exactly the kinds of errors
TypeScript is designed to catch.

### 13.1 Missing return value

```ts
// Original: declares string, returns nothing
const greetings = (greetings: string = "Hello", fullname: string): string => {
  console.log(greetings + " " + fullname);
};
// Error: A function whose declared type is neither 'undefined', 'void',
// nor 'any' must return a value.
```

**Fix** — return a value, or declare `void`:

```ts
const greetings = (greeting = "Hello", fullname: string): void => {
  console.log(`${greeting} ${fullname}`);
};
```

### 13.2 Typo in a function body

```ts
action: () => cosole.log("Hello"),
// Error: Cannot find name 'cosole'. Did you mean 'console'?
```

**Fix:** `console.log("Hello")`.

### 13.3 Using a tuple mutator

```ts
const dataLatLong: readonly [number, number] = [40.7128, -74.006];
dataLatLong.push(100);
// Error: Property 'push' does not exist on type 'readonly [number, number]'.
```

**Fix:** remove `readonly` if mutation is intended, or create a new tuple with
the same shape:

```ts
const moved: readonly [number, number] = [dataLatLong[0] + 0.01, dataLatLong[1]];
```

### 13.4 Mutating an object with an undeclared field

```ts
user.email = "mushfiq@gmail.com";
// Error: Property 'email' does not exist on the inline object type.
```

**Fix:** add `email` to the type, or use an index signature if extra fields are
intentional.

### 13.5 Python tuple comment in a TypeScript file

The comment block about Python tuples is not valid TypeScript documentation.
In TypeScript:

- Arrays are `T[]` or `Array<T>`.
- Tuples are `[T, U]`.
- Tuples are **not** immutable by default; use `readonly` for that.

---

## 14. Practice exercises

Work in `code/src/script.ts`, run `npx tsc --watch`, and fix every error before
running the output.

### Exercise 1 — Typed primitives

Create variables for a product name, price, in-stock status, and a unique SKU
using `string`, `number`, `boolean`, and `symbol`. Add a `bigint` for a large
inventory count.

### Exercise 2 — Typed function

Write `calculateTotal(price: number, quantity: number): number` that returns
the total. Then call it once correctly and once with a string to see the error.

### Exercise 3 — Tuple

Create a `readonly` tuple for a geographic coordinate. Try to change it and
explain the error.

### Exercise 4 — Optional and rest parameters

Write `formatName(first: string, last?: string): string` and
`average(...values: number[]): number`. Handle the empty rest-argument case.

### Exercise 5 — Type alias and interface

Define `type ProductId = string` and `interface Product` with `id`, `name`,
`price`, and an optional `description`. Create one valid product.

### Exercise 6 — Extend an interface

Create `interface DiscountedProduct extends Product` with a `discount: number`
field. Write a function that returns the final price.

### Exercise 7 — Union type

Create `type OrderStatus = "pending" | "paid" | "shipped" | "cancelled"` and a
function that accepts only those values.

### Exercise 8 — Spot the bug

```ts
type User = { name: string; age: number };
const u: User = { name: "Mushfiq", age: 30, email: "x@y.com" };
```

What error do you get, and what are the two possible fixes?

<details>
<summary>Exercise 8 answer</summary>

You get an excess property error: `'email' does not exist in type 'User'`.

Fix 1: remove `email` from the object.

Fix 2: add `email: string` to the `User` type (or add an index signature if
extra fields are allowed).

</details>

---

## 15. Cheat sheet

```ts
// Primitives
let s: string = "text";
let n: number = 42;
let b: boolean = true;
let sym: symbol = Symbol("id");
let big: bigint = 9007199254740991n;
let nothing: null = null;
let missing: undefined = undefined;

// Arrays and tuples
let list: string[] = ["a", "b"];
let list2: Array<number> = [1, 2, 3];
let pair: [number, number] = [1, 2];
let fixed: readonly [number, number] = [1, 2];

// Functions
const add = (a: number, b: number): number => a + b;
const optional = (a: string, b?: string): string => a + (b ?? "");
const withDefault = (a: string = "hi"): void => console.log(a);
const rest = (...nums: number[]): number => nums.reduce((x, y) => x + y, 0);

// Objects
type User = { name: string; age: number };
interface Account { id: string; active: boolean }

// Union and intersection
type Status = "idle" | "loading" | "error";
type Admin = User & { role: "admin" };

// Optional property
interface Config { timeout?: number }

// Function property
interface Handler { onClick: (event: MouseEvent) => void }

// Readonly property
interface Point { readonly x: number; readonly y: number }

// Generic function
const first = <T>(items: T[]): T | undefined => items[0];
```

| Concept | Syntax |
| --- | --- |
| Type annotation | `const x: number = 1` |
| Optional parameter | `(name?: string)` |
| Default parameter | `(name = "guest")` |
| Rest parameter | `(...nums: number[])` |
| Array | `string[]` / `Array<string>` |
| Tuple | `[string, number]` |
| Readonly tuple | `readonly [number, number]` |
| Union | `"a" \| "b"` |
| Intersection | `A & B` |
| Type alias | `type Id = string` |
| Interface | `interface User { name: string }` |
| Function type | `(a: number) => string` |
| Generic | `<T>(value: T) => T` |

---

## 16. Next steps

After this section you should be comfortable with:

- [x] Primitive types and when to annotate vs. infer.
- [x] Typed function parameters and return values.
- [x] Arrays, tuples, and `readonly`.
- [x] Optional, default, and rest parameters.
- [x] Object types, `type` aliases, and `interface`.
- [x] Excess property checks and compile-time safety.

Continue with:

1. **Narrowing** — `typeof`, `in`, discriminated unions, type guards.
2. **Generics** — reusable, type-safe functions and components.
3. **Utility types** — `Partial`, `Pick`, `Omit`, `Record`, `ReturnType`.
4. **Runtime validation** — Zod or Valibot at API boundaries.
5. **Project integration** — use TypeScript with React or Node and a bundler.

---

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [tsconfig reference](https://www.typescriptlang.org/tsconfig)
- Source example: [`code/src/script.ts`](./code/src/script.ts)
