let myString : string = "Mushfiq"
let myNumber : number = 42
let myBoolean : boolean = true
let mySymbol : symbol = Symbol("mySymbol")
let myBigInt : bigint = 9007199254740991n

const addTwo =(a:number,b:number) : number => {
    return a + b
}

console.log(addTwo(9, 8)) // Output: 17`

const arr : string[]= ["Mushfiq", "is", "a", "developer"]
const numArr : number[] = [1, 2, 3, 4, 5]

const dataLatLong : readonly [number, number] = [40.7128, -74.0060]
dataLatLong.push(100) // This will throw an error because tuples have a fixed length and type       
/*
Tuple
Tuples are used to store multiple items in a single variable.

Tuple is one of 4 built-in data types in Python used to store collections of data, the other 3 are List, Set, and Dictionary, all with different qualities and usage.

A tuple is a collection which is ordered and unchangeable. Tuples are written with round brackets.
Example:
mytuple = ("apple", "banana", "cherry")
print(mytuple)  */

//optional parameter 
const concatNames = (firstName: string, lastName?: string) => {
    if(!lastName) {
        return firstName
    }
    return firstName + " " + lastName
}

const greetings=(greetings: string ="Hello", fullname: string) : string => {
    console.log(greetings + " " + fullname);

}

console.log(concatNames("Mushfiq")) // Output: Mushfiq
console.log(concatNames("Mushfiq", "Azam")) // Output: Mushfiq Azam
console.log(greetings("Hi", "Mushfiq")) // Output: Hi Mushfiq
console.log(greetings(undefined, "Mushfiq")) // Output: Hello Mushfiq

//Rest parameter
const sumNumbers = (...numbers: number[]): number => {
    return numbers.reduce((acc, curr) => acc + curr, 0)
};

sumNumbers(1, 2, 3, 4, 5) // Output: 15

const longUserAction=(...args: [name :string, age: number, isActive: boolean])=>{
    const [name, age, isActive] = args;
    console.log(name +"is" + age);
}

longUserAction("Mushfiq", 30, true) // Output: Mushfiq is 30


// object type ,type alias and interface

type TUser = {
    name: string,
    age: number,
    isActive: boolean,
    action:() => void,
    badges: string[]
}

interface IUser {
    name: string,
    age: number,
    isActive: boolean,
    action:() => void,
    badges: string[]
}
//when to use type alias and interface
//Use type alias when you want to create a new name for a type, especially for primitive types or union types.
//Use interface when you want to define the shape of an object, especially when you want to use inheritance or implement multiple interfaces.
const user : {
    name: string,
    age: number,
    isActive: boolean
    action:() => void
    badges: string[]
}= {
    name : "Mushfiq" ,
    age : 30,
    isActive : true,
    action: () => cosole.log("Hello"),
    badges: ["admin", "editor"]
};

type Username =string;


const user2: IUser = {
    name: "Azam",
    age: 25,
    isActive: false,
    action: () => console.log("Hi"),
    badges: ["user"]
};
user.email="mushfiq@GMAIL.COM" // This will throw an error because email is not defined in the User type
console.log(user2.address) // This will throw an error because address is not defined in the User type
