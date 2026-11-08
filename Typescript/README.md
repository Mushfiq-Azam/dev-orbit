# TypeScript for Beginners

> A friendly, step-by-step guide to the TypeScript in this section.
> No prior TypeScript needed — only a little JavaScript.

![JavaScript to TypeScript developer journey](./JavaScript_to_TypeScript_Developer_Journey.png)

---

## What you will learn

By the end of this tutorial you will be able to:

- Explain what TypeScript is in plain English.
- Add types to variables, functions, arrays, and objects.
- Understand the error messages TypeScript gives you.
- Know **why** each feature exists and **where** to use it.
- Read and fix the example in [`code/src/script.ts`](./code/src/script.ts).

---

## How to use this tutorial

1. Read one section at a time. Do not rush.
2. Keep `code/src/script.ts` open next to you.
3. Type the examples yourself — do not just copy them.
4. When you see an error, read it slowly. Section 13 teaches you how.
5. Finish with the exercises in Section 15.

---

## Table of Contents

1. [The big idea: JavaScript with labels](#1-the-big-idea-javascript-with-labels)
2. [Your first TypeScript program](#2-your-first-typescript-program)
3. [Your first types: text, numbers, true/false](#3-your-first-types-text-numbers-truefalse)
4. [Two ways to add a type](#4-two-ways-to-add-a-type)
5. [Functions: what goes in, what comes out](#5-functions-what-goes-in-what-comes-out)
6. [Lists and fixed pairs (arrays and tuples)](#6-lists-and-fixed-pairs-arrays-and-tuples)
7. [Flexible parameters (optional, default, rest)](#7-flexible-parameters-optional-default-rest)
8. [Describing objects](#8-describing-objects)
9. [`type` vs `interface` in plain English](#9-type-vs-interface-in-plain-english)
10. [Why TypeScript complains about extra fields](#10-why-typescript-complains-about-extra-fields)
11. [Two kinds of errors](#11-two-kinds-of-errors)
12. [Where you will use TypeScript](#12-where-you-will-use-typescript)
13. [How to read TypeScript errors](#13-how-to-read-typescript-errors)
14. [Mistakes in our example, explained](#14-mistakes-in-our-example-explained)
15. [Practice exercises](#15-practice-exercises)
16. [Cheat sheet](#16-cheat-sheet)
17. [Beginner glossary](#17-beginner-glossary)
18. [Next steps](#18-next-steps)

---

## 1. The big idea: JavaScript with labels

Imagine you have a box. In JavaScript, the box can hold **anything** — a
number, a word, a list, or nothing at all. That freedom is nice, but it causes
mistakes.

```js
// JavaScript
function addTwo(a, b) {
  return a + b;
}

addTwo("9", 8); // "98"  ← not what we wanted!
```

JavaScript happily joins the text `"9"` and the number `8` into the text
`"98"`. No error. Just a wrong answer.

TypeScript adds **labels** to your boxes:

```ts
// TypeScript
function addTwo(a: number, b: number): number {
  return a + b;
}

addTwo("9", 8); // ❌ Error: "9" is not a number
```

That is the whole idea. TypeScript is **JavaScript plus labels** that help you
catch mistakes before your code runs.

### A useful way to picture it

| JavaScript | TypeScript |
| --- | --- |
| A box with no label | A box labelled "numbers only" |
| You find out it is wrong later | You find out immediately |
| Runs everywhere | Compiles to JavaScript, then runs everywhere |

### Important: TypeScript is not a new language at runtime

The browser cannot run TypeScript directly. A tool called the **TypeScript
compiler** (`tsc`) checks your `.ts` file and turns it into a normal `.js`
file. The labels disappear. What runs in the browser is still plain
JavaScript.

```text
script.ts  ──(tsc checks + converts)──►  script.js  ──►  browser / Node.js
```

**Why this matters:** TypeScript helps you while you write code. It does not
make your program faster or change how it behaves.

---

## 2. Your first TypeScript program

The example project lives in [`code/`](./code):

```text
Typescript/
└── code/
    ├── index.html          ← opens in the browser
    ├── tsconfig.json       ← settings for the compiler
    ├── src/
    │   └── script.ts       ← you write TypeScript here
    └── dist/
        └── script.js       ← tsc creates this for you
```

### The settings file

`tsconfig.json` tells the compiler where your code is and how strict to be:

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

In plain English:

| Setting | Plain meaning |
| --- | --- |
| `rootDir` | "My TypeScript files are in `src`." |
| `outDir` | "Put the finished JavaScript in `dist`." |
| `module` / `target` | "Use modern JavaScript output." |
| `strict` | "Check everything carefully. Keep this on." |
| `skipLibCheck` | "Do not waste time checking other people's type files." |
| `types` | "Do not load extra global type packages automatically." |

### The two commands you need

```bash
cd Typescript/code

npx tsc          # check once and create dist/script.js
npx tsc --watch  # check again every time you save a file
```

Then open `index.html` in your browser to run the result.

> **Tip:** Use `--watch` while learning. You save the file and immediately see
> whether TypeScript is happy or not.

---

## 3. Your first types: text, numbers, true/false

From `script.ts`:

```ts
let myString: string = "Mushfiq";
let myNumber: number = 42;
let myBoolean: boolean = true;
```

Read each line like this:

```text
let  myString  :  string   =   "Mushfiq"
     │            │             │
     │            │             └── the actual value
     │            └── the type (a label)
     └── the variable name
```

### The everyday types

| Type | Plain meaning | Example |
| --- | --- | --- |
| `string` | Text | `"hello"` |
| `number` | Any number, whole or decimal | `42`, `3.14` |
| `boolean` | Yes/no, on/off | `true`, `false` |
| `null` | On purpose, "no value" | `null` |
| `undefined` | Not given a value yet | `undefined` |

### The other types you will meet

```ts
let id: symbol = Symbol("id");          // a guaranteed-unique value
let huge: bigint = 9007199254740991n;   // very large whole numbers
```

Do not worry about `symbol` and `bigint` for now. You will rarely need them as
a beginner.

There are also three special types worth knowing:

```ts
let anything: any;       // ❌ turns checking off — avoid it
let safeUnknown: unknown; // ✅ must be checked before use
function log(): void {}  // a function that returns nothing
```

### Why types are useful

```ts
let age: number = 30;
age = "thirty"; // ❌ Error: "thirty" is text, not a number
```

TypeScript stops the mistake right where it happens. Without types, this bug
could travel deep into your app and only appear much later.

### Where to use types

- **Always** on function parameters and return values.
- **Always** on shared data shapes (users, products, orders).
- **Sometimes** on simple local variables — see the next section.

---

## 4. Two ways to add a type

You can **tell** TypeScript the type, or let it **guess**.

### Telling it (annotation)

```ts
let city: string = "Dhaka";
```

### Letting it guess (inference)

```ts
let city = "Dhaka"; // TypeScript guesses: string
```

Both lines do the same thing. TypeScript is good at guessing when a value is
right in front of it.

```ts
const price = 19.99;      // guessed: number
const isOpen = true;      // guessed: boolean
const tags = ["a", "b"];  // guessed: string[]
```

### The beginner rule

> **Tell TypeScript the type at the edges. Let it guess in the middle.**

- **Edges** = function inputs, function outputs, exported values, object
  shapes.
- **Middle** = short-lived local variables inside a function.

```ts
// Edge: be explicit
function greet(name: string): string {
  return `Hello, ${name}`;
}

// Middle: let TypeScript guess
const message = greet("Mushfiq");
```

Too many labels make code noisy. Too few leave important contracts unclear.

---

## 5. Functions: what goes in, what comes out

Functions are where most beginner bugs happen. TypeScript lets you label the
**inputs** and the **output**.

```ts
const addTwo = (a: number, b: number): number => {
  return a + b;
};

console.log(addTwo(9, 8)); // 17
```

Read it like a sentence:

```text
addTwo takes a number and a number, and gives back a number.
```

### What happens when you give the wrong thing

```ts
addTwo("9", 8);
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

Translation: *"You gave me text, but this spot needs a number."*

### What happens when you return the wrong thing

```ts
const addTwo = (a: number, b: number): string => {
  return a + b;
};
// Error: Type 'number' is not assignable to type 'string'.
```

Translation: *"You promised to give back text, but you are giving back a
number."*

### Functions that return nothing

Use `void` when the function only does something and gives nothing back:

```ts
const sayHello = (name: string): void => {
  console.log(`Hello, ${name}`);
};
```

### Why this matters

- You catch wrong arguments at the moment you write them.
- The editor can autocomplete the correct inputs.
- Other people can read the function and know how to use it.

### Where to use it

- Every function you export or share.
- Callbacks: `items.map((item: string) => ...)`, event handlers, API calls.
- Any function whose result other code depends on.

---

## 6. Lists and fixed pairs (arrays and tuples)

### Arrays: a row of identical boxes

An array holds **any number** of values, all of the same type.

```ts
const names: string[] = ["Mushfiq", "is", "a", "developer"];
const scores: number[] = [10, 20, 30];

// Same thing, different spelling:
const scores2: Array<number> = [10, 20, 30];
```

Read `string[]` as **"a list of strings."**

```ts
names.push("!");     // ✅ fine, still a string
names.push(42);      // ❌ Error: 42 is not a string
```

### Tuples: a form with a fixed number of fields

A tuple holds **an exact number** of values, with a specific type in each
position.

```ts
const location: [number, number] = [40.7128, -74.006];
```

This is a latitude/longitude pair. It must always be **two numbers, in that
order**.

```ts
const location: [number, number] = [40.7128];          // ❌ needs two
const location: [number, number] = [40.7128, "west"];  // ❌ second is text
```

### `readonly`: "do not change this"

```ts
const location: readonly [number, number] = [40.7128, -74.006];

location.push(100);
// ❌ Error: Property 'push' does not exist on type 'readonly [number, number]'.
```

`readonly` removes the tools that change the value. Think of it as putting the
tuple behind glass: you can look, but you cannot edit.

> **Note:** a normal tuple (without `readonly`) still allows `push` in
> TypeScript. That is a known limitation. Use `readonly` when you truly want to
> block changes.

### Named tuple fields (nice for readability)

```ts
type UserAction = [name: string, age: number, isActive: boolean];
```

### When to use arrays vs tuples

| Use an array when... | Use a tuple when... |
| --- | --- |
| The count can change | The count is fixed |
| All items are the same type | Each position has its own type |
| Examples: tags, users, results | Examples: coordinates, key/value pairs |

---

## 7. Flexible parameters (optional, default, rest)

Sometimes a function should accept a value **only sometimes**.

### Optional: "maybe it is there"

Add `?` after the name:

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

Think: *"`lastName` may be missing, so check before using it."*

An optional parameter's type is really `string | undefined` — it is either a
string **or** nothing.

### Default: "use this if I do not get one"

```ts
const greet = (greeting: string = "Hello", fullname: string): void => {
  console.log(`${greeting} ${fullname}`);
};

greet("Hi", "Mushfiq");       // "Hi Mushfiq"
greet(undefined, "Mushfiq");  // "Hello Mushfiq"
```

If the caller passes `undefined`, the default kicks in.

> **Beginner gotcha:** putting a required parameter (`fullname`) after a
> defaulted one (`greeting`) is allowed, but awkward — callers must write
> `undefined` to use the default. Put required parameters first when you can.

### Rest: "and the rest of them"

Put `...` before a parameter to collect **any number** of arguments into an
array:

```ts
const sumNumbers = (...numbers: number[]): number => {
  return numbers.reduce((total, n) => total + n, 0);
};

sumNumbers(1, 2, 3, 4, 5); // 15
```

Think: *"Take as many numbers as I give you and put them in a list."*

You can also use a tuple when the order and count matter:

```ts
const longUserAction = (
  ...args: [name: string, age: number, isActive: boolean]
): void => {
  const [name, age] = args;
  console.log(`${name} is ${age}`);
};

longUserAction("Mushfiq", 30, true); // "Mushfiq is 30"
```

### Where to use these

| Feature | Common use |
| --- | --- |
| Optional | A setting the caller may skip |
| Default | A sensible fallback (timeout, language, label) |
| Rest | `sum(...)`, `log(...)`, wrapping another function |

---

## 8. Describing objects

An object is a collection of named values. A **type** describes which names
must exist and what kind of value each one holds.

Think of it as a **form**: every field must be filled in, and each field
accepts only a certain kind of answer.

### Option 1: write the shape inline

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

This works, but repeating that big block everywhere is painful. That is why we
give the shape a name.

### Option 2: a type alias

```ts
type User = {
  name: string;
  age: number;
  isActive: boolean;
  action: () => void;
  badges: string[];
};

const user: User = {
  name: "Mushfiq",
  age: 30,
  isActive: true,
  action: () => console.log("Hello"),
  badges: ["admin", "editor"],
};
```

### Option 3: an interface

```ts
interface User {
  name: string;
  age: number;
  isActive: boolean;
  action: () => void;
  badges: string[];
}
```

`type User = { ... }` and `interface User { ... }` describe the same shape
here. Section 9 explains which one to choose.

### Reading the field types

| Field | Meaning |
| --- | --- |
| `name: string` | A piece of text |
| `age: number` | A number |
| `isActive: boolean` | True or false |
| `action: () => void` | A function that returns nothing |
| `badges: string[]` | A list of strings |

### Optional object fields

Add `?` to a field name to make it optional:

```ts
type Product = {
  id: string;
  name: string;
  description?: string; // may be missing
};
```

### Where to use objects types

- API data (users, products, orders).
- Component props in React or Vue.
- Database records.
- Configuration and function options.

---

## 9. `type` vs `interface` in plain English

Both create a reusable name for a shape. Here is the simple difference:

> **`type`** = a nickname for **anything**.
> **`interface`** = a blueprint for an **object**.

### Use `type` for non-objects

```ts
type Username = string;                       // a nickname for a string
type Status = "idle" | "loading" | "error";   // one of these exact values
type Pair = [number, number];                 // a tuple
```

### Use `interface` for objects you may extend

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}
```

An `Employee` now has both `name` and `employeeId`.

### A simple decision guide

| Question | Answer |
| --- | --- |
| Am I naming a primitive, a union, or a tuple? | Use `type` |
| Am I describing an object? | Either works |
| Will someone extend this object later? | Prefer `interface` |
| Am I combining types? | Use `type` with `&` |

```ts
type Admin = Person & { role: "admin" };
```

> **Do not overthink this.** In most beginner code either choice is fine. Pick
> one style and stay consistent.

---

## 10. Why TypeScript complains about extra fields

At the end of `script.ts`:

```ts
user.email = "mushfiq@gmail.com";
// ❌ Error: Property 'email' does not exist on type '{ ... }'.

console.log(user2.address);
// ❌ Error: Property 'address' does not exist on type 'User'.
```

TypeScript checks two things:

1. Every required field **is there**.
2. Every field you use **was declared**.

This is called an **excess property check**. It catches typos and accidental
fields.

```ts
type User = { name: string; age: number };

const u: User = {
  name: "Mushfiq",
  age: 30,
  email: "x@y.com", // ❌ email was not declared
};
```

### Two ways to fix it

**Fix 1:** Remove the extra field.

**Fix 2:** Add the field to the type.

```ts
type User = {
  name: string;
  age: number;
  email: string;
};
```

If you truly want to allow unknown extra fields, say so explicitly:

```ts
interface User {
  name: string;
  [key: string]: unknown; // allow extra properties
}
```

> Be careful with that last one — it turns off some of the protection you just
> gained.

---

## 11. Two kinds of errors

This distinction is important for beginners.

### Compile-time errors

These happen **before** the code runs. TypeScript finds them while checking
your file.

```ts
let age: number = "thirty";
// ❌ Compile-time error: text is not a number
```

### Runtime errors

These happen **while** the code runs, even if the types were correct.

```ts
async function showUser() {
  const response = await fetch("/api/user");
  const user = await response.json();
  console.log(user.name.toUpperCase());
  // ❌ Runtime error if the API returned no name
}
```

TypeScript cannot know what the server will send. Types describe what
**should** happen; they do not prove what **did** happen.

### The practical rule

| Place | What to use |
| --- | --- |
| Inside your own code | TypeScript types |
| At the edges (user input, API, files, storage) | Runtime validation |

Runtime validation means actually checking the data:

```ts
if (typeof user.name !== "string") {
  throw new Error("Bad user data");
}
```

Libraries like **Zod** and **Valibot** do this for you.

---

## 12. Where you will use TypeScript

| Area | Example use |
| --- | --- |
| Frontend | React/Vue/Angular props, state, and events |
| Backend | Node.js APIs, request and response bodies |
| Full-stack | Sharing types between client and server (Next.js) |
| Libraries | Shipping types so other developers get autocomplete |
| Tools | CLIs, build scripts, editor extensions |
| Mobile/desktop | React Native, Electron, Tauri |
| Testing | Typed test data and mocks |

In every area, TypeScript does the same three jobs:

1. **Describes** what the data should look like.
2. **Checks** that your code follows the description.
3. **Documents** the code for other people (and future you).

---

## 13. How to read TypeScript errors

Error messages look scary at first, but they follow patterns. Read them from
left to right.

### Pattern 1: wrong type

```text
Type 'string' is not assignable to type 'number'.
```

**Translation:** "You gave me text, but this place needs a number."

### Pattern 2: wrong function argument

```text
Argument of type 'string' is not assignable to parameter of type 'number'.
```

**Translation:** "This function expects a number, and you passed text."

### Pattern 3: missing property

```text
Property 'email' does not exist on type 'User'.
```

**Translation:** "You used a field that I was never told about."

### Pattern 4: missing return

```text
A function whose declared type is neither 'undefined', 'void', nor 'any'
must return a value.
```

**Translation:** "You promised to return something, but the function returns
nothing."

### Pattern 5: typo

```text
Cannot find name 'cosole'. Did you mean 'console'?
```

**Translation:** "I do not know this name. Did you spell it wrong?"

### A simple routine when you see an error

1. **Find the file and line** shown in the message.
2. **Read the quoted type** — it tells you what was expected.
3. **Read what you actually passed** — the message often includes it.
4. **Fix the value or fix the type** — one of them is wrong.
5. **Save and re-run** `npx tsc`.

---

## 14. Mistakes in our example, explained

These are real mistakes in `code/src/script.ts`. Studying them is the fastest
way to learn.

### 14.1 A function that promises a value but returns nothing

```ts
// Original
const greetings = (greetings: string = "Hello", fullname: string): string => {
  console.log(greetings + " " + fullname);
};
// ❌ Error: ... must return a value.
```

The function says it returns `string`, but it only logs. It never returns
anything.

**Fix:** return a value, or change the type to `void`.

```ts
const greetings = (greeting: string = "Hello", fullname: string): void => {
  console.log(`${greeting} ${fullname}`);
};
```

### 14.2 A typo in the function body

```ts
action: () => cosole.log("Hello"),
// ❌ Error: Cannot find name 'cosole'. Did you mean 'console'?
```

**Fix:** write `console.log("Hello")`.

### 14.3 Trying to change a `readonly` tuple

```ts
const dataLatLong: readonly [number, number] = [40.7128, -74.006];
dataLatLong.push(100);
// ❌ Error: Property 'push' does not exist on type 'readonly [number, number]'.
```

**Fix:** remove `readonly` if you really need to change it, or create a new
tuple:

```ts
const moved: readonly [number, number] = [
  dataLatLong[0] + 0.01,
  dataLatLong[1],
];
```

### 14.4 Adding a field that was never declared

```ts
user.email = "mushfiq@gmail.com";
// ❌ Error: Property 'email' does not exist ...
```

**Fix:** add `email: string` to the type, or remove the line.

### 14.5 A Python comment inside a TypeScript file

The comment block in `script.ts` talks about Python tuples. That description
does not apply to TypeScript.

Correct TypeScript facts:

- A list is `T[]` or `Array<T>`.
- A tuple is `[T, U]`.
- Tuples are **not** immutable by default. Use `readonly` for that.

---

## 15. Practice exercises

Open `code/src/script.ts`, run `npx tsc --watch`, and fix every error before
running the result. Start simple.

### Exercise 1 — Label some values

Create variables for:

- a product name (`string`)
- a price (`number`)
- whether it is in stock (`boolean`)
- a large inventory count (`bigint`)

<details>
<summary>Show one possible answer</summary>

```ts
const productName: string = "Keyboard";
const price: number = 49.99;
const inStock: boolean = true;
const inventory: bigint = 1200n;
```

</details>

### Exercise 2 — A typed function

Write `calculateTotal(price: number, quantity: number): number`.

Call it correctly once. Then call it with a string and read the error.

<details>
<summary>Show answer</summary>

```ts
const calculateTotal = (price: number, quantity: number): number => {
  return price * quantity;
};

calculateTotal(10, 3);      // 30
calculateTotal("10", 3);    // ❌ Error: string is not a number
```

</details>

### Exercise 3 — A fixed pair

Create a `readonly` tuple for a coordinate. Try to change it, then explain the
error in your own words.

<details>
<summary>Show answer</summary>

```ts
const point: readonly [number, number] = [23.8103, 90.4125];

point[0] = 0;
// ❌ Error: Cannot assign to '0' because it is a read-only property.
```

The `readonly` keyword means "look, but do not change."

</details>

### Exercise 4 — Optional and rest parameters

Write:

- `formatName(first: string, last?: string): string`
- `average(...values: number[]): number`

Make `average()` return `0` when called with no numbers.

<details>
<summary>Show answer</summary>

```ts
const formatName = (first: string, last?: string): string => {
  return last ? `${first} ${last}` : first;
};

const average = (...values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, n) => sum + n, 0) / values.length;
};
```

</details>

### Exercise 5 — A product type

Create `type ProductId = string` and an `interface Product` with `id`, `name`,
`price`, and an optional `description`. Create one valid product.

<details>
<summary>Show answer</summary>

```ts
type ProductId = string;

interface Product {
  id: ProductId;
  name: string;
  price: number;
  description?: string;
}

const product: Product = {
  id: "p-1",
  name: "Keyboard",
  price: 49.99,
};
```

</details>

### Exercise 6 — Extending an interface

Create `interface DiscountedProduct extends Product` with a `discount` number.
Write a function that returns the final price.

<details>
<summary>Show answer</summary>

```ts
interface DiscountedProduct extends Product {
  discount: number; // 0 to 1
}

const finalPrice = (product: DiscountedProduct): number => {
  return product.price * (1 - product.discount);
};
```

</details>

### Exercise 7 — A union of exact values

Create `type OrderStatus = "pending" | "paid" | "shipped" | "cancelled"` and a
function that accepts only those values.

<details>
<summary>Show answer</summary>

```ts
type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

const describeStatus = (status: OrderStatus): string => {
  return `Order is ${status}`;
};

describeStatus("paid");      // ✅
describeStatus("delivered"); // ❌ not one of the allowed values
```

</details>

### Exercise 8 — Spot the bug

```ts
type User = { name: string; age: number };

const u: User = {
  name: "Mushfiq",
  age: 30,
  email: "x@y.com",
};
```

What error do you get? What are the two possible fixes?

<details>
<summary>Show answer</summary>

The error is an **excess property check**: `'email' does not exist in type
'User'`.

Fix 1: remove `email` from the object.

Fix 2: add `email: string` to the `User` type (or add an index signature if
extra fields are allowed).

</details>

---

## 16. Cheat sheet

### Variables

```ts
let text: string = "hello";
let count: number = 42;
let isOn: boolean = true;
let big: bigint = 100n;
let unique: symbol = Symbol("id");
let nothing: null = null;
let missing: undefined = undefined;
```

### Arrays and tuples

```ts
let names: string[] = ["a", "b"];
let numbers: Array<number> = [1, 2, 3];
let pair: [number, number] = [1, 2];
let locked: readonly [number, number] = [1, 2];
```

### Functions

```ts
const add = (a: number, b: number): number => a + b;
const maybe = (a: string, b?: string): string => a + (b ?? "");
const withDefault = (a = "hi"): void => console.log(a);
const sum = (...nums: number[]): number => nums.reduce((x, y) => x + y, 0);
```

### Objects

```ts
type User = { name: string; age: number };
interface Account { id: string; active: boolean }
interface Config { timeout?: number }
interface Point { readonly x: number; readonly y: number }
```

### Unions and combinations

```ts
type Status = "idle" | "loading" | "error";
type Admin = User & { role: "admin" };
```

### Quick reference

| I want to... | Write |
| --- | --- |
| Label a value | `const x: number = 1` |
| Make a parameter optional | `(name?: string)` |
| Give a default | `(name = "guest")` |
| Accept many values | `(...nums: number[])` |
| Make a list | `string[]` |
| Make a fixed pair | `[string, number]` |
| Prevent changes | `readonly` |
| Allow one of several values | `"a" \| "b"` |
| Name a type | `type Id = string` |
| Describe an object | `interface User { name: string }` |
| Describe a function | `(a: number) => string` |
| Reuse a type | `<T>(value: T) => T` |

---

## 17. Beginner glossary

| Word | Plain meaning |
| --- | --- |
| **Type** | A label that says what kind of value something is. |
| **Annotation** | Writing the type yourself: `: number`. |
| **Inference** | TypeScript guessing the type for you. |
| **Compile** | Check the code and turn `.ts` into `.js`. |
| **Compiler** | The tool that does the compiling (`tsc`). |
| **Runtime** | The moment the program is actually running. |
| **Compile-time** | Before the program runs, while checking. |
| **Parameter** | A named input in a function definition. |
| **Argument** | The actual value you pass to a function. |
| **Return type** | The type of value a function gives back. |
| **`void`** | "This function returns nothing." |
| **`any`** | "Turn checking off." Avoid it. |
| **`unknown`** | "I do not know the type yet; check before using." |
| **Union** | One of several types: `string \| number`. |
| **Intersection** | All of several types at once: `A & B`. |
| **Generic** | A type that works with many types: `<T>`. |
| **Tuple** | A fixed-length, position-typed array. |
| **`readonly`** | "Do not allow changes." |
| **Interface** | A named blueprint for an object. |
| **Type alias** | A nickname for any type. |
| **Excess property** | A field that was not declared in the type. |

---

## 18. Next steps

After this section you should be comfortable with:

- [x] Primitive types and when to label vs. let TypeScript guess.
- [x] Typed function inputs and outputs.
- [x] Arrays, tuples, and `readonly`.
- [x] Optional, default, and rest parameters.
- [x] Object types, `type` aliases, and `interface`.
- [x] Reading common TypeScript errors.

Continue with these topics, in this order:

1. **Narrowing** — using `typeof`, `in`, and type guards to narrow a type.
2. **Generics** — writing functions that work with many types safely.
3. **Utility types** — `Partial`, `Pick`, `Omit`, `Record`, `ReturnType`.
4. **Runtime validation** — checking API data with Zod or Valibot.
5. **Framework integration** — TypeScript with React or Node.

---

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play) — try code without installing anything
- [tsconfig reference](https://www.typescriptlang.org/tsconfig)
- Source example: [`code/src/script.ts`](./code/src/script.ts)
