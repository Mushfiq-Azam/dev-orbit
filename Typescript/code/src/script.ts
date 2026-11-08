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
