// /** functions */
// type Operation = (a: number, b: number) => string;

// const sum: Operation = (a, b) => {
//   return a + b + "";
// };

// const minus: Operation = (a, b) => {
//   return a - b + "";
// };

// const multiply: Operation = (a, b) => {
//   return a * b + "";
// };

// // console.log(sum(6,7));

// /** default parameters */
// const addDefault = (a: number, b: number = 5): number => {
//   return a + b;
// };

// /** optional parametter */
// const addOptional = (a: number, b?: number) => {
//   // if( b === undefined) return a
//   return a + (b || 0);
// };

// // console.log(addOptional(2));

// /** never type */
// const infinite = (): never => {
//   while (true) {}
// };

// const errorMessage = (message: string): never => {
//   throw new Error(message);
// };

// const numberOrString = (
//   value: number | string | boolean | undefined,
// ): string => {
//   if (typeof value === "string") return "this is a string";
//   if (typeof value === "number") return "this is a number";
//   return errorMessage("this is not a string or a number");
// };

// console.log(numberOrString(true));

/** function overload */
// function add(a: number, b: number): number
// function add(a: string, b: string): string
// function add(a: number | string, b: number | string): number | string {
//   if( typeof a === "string" && typeof b === "string") 
//     return a + b + ""
//   if( typeof a === "number" && typeof b === "number") 
//     return a + b
//   return -1;
// }
// add(2,2)
// add(2, "2")
// add("2",2)
// add("2","2")

/** enum type */
enum Grade {
  S,
  R,
  E,
  B,
  A 
}

// console.log(Grade["B"]);

/** type literal */
type Status = "active" | "not active" | "in procces"

let stautsCode: Status = "active" 

/** type aliases */
type User = {
  name: string;
}
type NumberOrString = string | User

type Gender = "male" | "female" | "other"

type Student = {
  name: string;
  grade: Grade,
  gender: Gender,
  status: Status
}

let student1: Student = {
  name: "John",
  grade: Grade["B"],
  gender: "male",
  status: "active"
}

/** Assertion OR Casting */
type One = string;
type Two = string | number;
type Three = "hello"

let a: One = "Hi"
// a= 1
let b = a as Two
b = 1
// b= true

let c = a as Three
c = "hello"

/** as => <> */
let d = <One>"abc"
let e = <Two>"abc"
let f = <Three>"hello"


/** DOM elements */
const myImg = <HTMLImageElement>document.querySelector("img") ///as HTMLImageElement
// if(myImg)
myImg.src = "...."