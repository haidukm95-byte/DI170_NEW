/** Classes */
/** Access modifiers */
   // * public ->anywhere
  //  * protected ->within the class and subclass
  //  * private ->within the class 

  /*
class User {
  public name: string;
  private age: number;
  protected active: boolean;
  constructor(name: string, age: number, active: boolean){
    // OR: constructor(public name: string, public age: number etc.)
    this.name=name;
    this.age=age;
    this.active=active;
  }
  getAge(): number{
     only admin can see age 
    return this.age;
  }
  get getactive(): boolean{
    //usable without parameter '()'
    return this.active
  }

  setAge(val: number): void{
    this.age=val;
  }

  set setactive(val: boolean){
    this.active=val;
  }
}

class Student extends User{
  public grade: string;
  constructor(name: string, age: number, active: boolean){
    super(name, age, active)
    this.grade=''
  }
  getStudentAge(): string{
    return this.name + ' is ' + this.getAge() + ' years old'
  }
  isStudentActive():string{
    return this.name + ' is ' + this.active
  }
}

const studentAnne= new Student('Anne', 22, true);
studentAnne.name;


const userJohn=new User('John Doe', 45, true);
userJohn.name
//userJohn.age - available only within the class
userJohn.getAge();
//userJohn.active - protected! available only within the class/subclass
userJohn.getactive;
userJohn.setAge(35);
userJohn.setactive=true;
// userJohn.age=55 - private!!!


   */

/*
interface User{
  name: string;
  age: number;
  getAge(): number;
  setAge(val: number): void
}
class Employee implements User {
  name:string;
  age: number;
  username: string;
  constructor(name: string, age: number, username: string){
    this.name=name;
    this.age=age;
    this.username=username;
  }
  getAge(): number{
    return this.age
  }
  setAge(val: number): void {
    this.age=val;
  }
  setUsername(val:string):void{
    this.username=val;
  }
}

*/

/** static in classes */

/*
class Employee{
  static count: number=0;
  static getCount(): number{
    return Employee.count
  }


  public name: string;
  public id: number;
  constructor(name: string){
    this.name=name;
    this.id=++Employee.count+1;
  }
}

const employee1=new Employee("John");
const employee2=new Employee("Dan");
const employee3=new Employee("Anne");

console.log(employee1.name);
console.log(employee1.id);
//console.log(Employee.getCount())

console.log(employee2.name);
console.log(employee2.id);
//console.log(Employee.getCount())

console.log(employee3.name);
console.log(employee3.id);
//console.log(Employee.getCount())
*/

/** Generic - makes the code reusable */
/*
const echoString=(value: string): string=>value;
const echoNumber=(value: number): number=>value;
const echoBoolean=(value: boolean): boolean=>value;

const echo = <T>(value: T): T=>value;

echo<string>("abc");
echo<number>(222);
echo<boolean>(true);
echo<string[]>(['a', 'b']);

*/

/** get the first element from any array */

/*
const getFirstElement=<T>(arr: T[]):T=>{
  return arr[0]
};

type User={
  name: string;
}
const john: User={
  name: 'John'
}

const anne: User={
  name: 'Anne'
}

const rettype = getFirstElement<User>([john, anne]);
console.log(rettype);
getFirstElement<number>([1,2,3]);
getFirstElement<string>(['a','b','c']);

*/

/*

type Person<T>={
  id: number;
  name: string;
  age: number;
  info: T
};

const person1: Person<string[]>={
  name: 'aaa',
  id: 1,
  age: 111,
  info: ['a', 'b']
}

const person2: Person<number[]>={
  name: 'aaa',
  id: 1,
  age: 111,
  info: [2121, 34343]
};

type Info = {
  city: string;
  address: string;
  zipcode: number;

}

const person3: Person<Info>={
  name: 'aaa',
  id: 1,
  age: 111,
  info: {
    city: 'JLM',
    address: 'Yafo 111',
    zipcode: 9000322
  }
}

*/

/** more than one Generic */

/*

const mergeArray=<T, K, Z>(arr1: T[], arr2: K[], arr3: Z[]: (T | K | Z)[]=>{
  return [...arr1, ...arr2, ...arr3]
}

type User={
  name: string;
}
const john: User={
  name: 'John'
}

const anne: User={
  name: 'Anne'
}

const nums: number[]=[1,2,3]
const strs: string[]=['a', 'b', 'c']
const users: User[]=[john, anne]

const ret=mergeArray<number, string, User>(nums, strs, users);
console.log(ret);

*/

/** Utility types */

type Post={
  id: number;
  title: string;
  body: string;
}

type MiniPost=Partial<Post>

  /** Pick / Omit */
type PostIdBody = Pick<Post, "id" | "body">
type PostBody=Omit<Post, "title" | "id"> //Omit means "hide"

  /** Exclude / Extract */
type Grade = 'A' | 'B' | 'C' | 'D' | 'F';
type PassGrade =Exclude<Grade, "D"|"F">
type FailedGrade=Extract<Grade, "D" | "F">

  /** NonNullable */
type StringOrNull=string | null | undefined;
type OnlyString= NonNullable<StringOrNull>;

  /** Return type */
const createUser=(name: string, age: number)=>{
  return{name, age, active: true}
}

type NewUser = ReturnType<typeof createUser>

type NewUserParams = Parameters<typeof createUser>



