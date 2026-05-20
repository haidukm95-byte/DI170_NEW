// nodeTS to node typescript
// tsc main.ts to compile
// tsc main.ts aa.ts to rename
// tsc --init to run node for typecript (just like run in nodejs)

/*
/**type number */
//let num: number = 6;
//num='a'; error: num assigned only for numbers;
//num=3;
//console.log(num);

/**type string */
//let str: string='acg';
//str='abc';

/**type boolean */
//let bol: boolean;
//bol=true;
//bol=false;

/**type any - try not to use it as possible */
//let a: any;
//a=1;
//a='1';
//a=[];

/**union type */
//let x: number | string // | means 'or';

//x=1;
//x='1';

/** array type */

//let arr: string[] = ['a', 'b', 'c'];
//arr.push('d');
//arr.push(100); error: defined as array of strings only;

/** type object */
//let obj: object = {};
//obj=[];


/** types */
//export type myString = string | number; //defining my own customly-named type;
//let firstname: myString='John'; //myString type is a union of a string and a number;

/** type tuple */
//type myTuple=[string, number, string];
//let xx: myTuple=['2', 2, '4'];
//xx=[3,5,6] error: wrong order according to myTuple order 
type GenderType=string | number | boolean;
type User={
    name: string,
    age: number,
    gender?: string | number;
}

let avg9999: User={
    name: "Mark",
    age: 30,
    gender: 'male',
};

let unknown45: User={
    name: 'unknpown',
    age: 33,
    gender: "female"
};

/** type / interface */
interface UserI {
    name: string,
    age: number,
    gender?: string | number;
};  // use of type unions impossible!

let arrUsers: User[] = [avg9999, unknown45]

/** functions */
const sum = (a: number ,b: number | string): number | string=>{
    /** type guard */
    //if (b===undefined) return a;
    if (typeof b==='string') return a+b+''; 
    return a + b;
}

console.log(sum(6, "7"));