//II. Object Destructuring

//Destructuring implies breaking down a complex structure into simpler parts.
//In JavaScript, this complex structure is usually an object or an array. 
const address = {
  street: 'Evergreen Terrace',
  number: '742',
  city: 'Springfield',
  state: 'NT',
  zip: '49007',
};

const { street: s, city: c } = address;
console.log(s) //Evergreen Terrace
console.log(c) //Springfield
//The key 'street' has a match in the data address.
//  Therefore, the data value 'Evergreen Terrace' is assigned to the variable s.

//Property value shorthand:

const { street, city } = address;
console.log(street) //Evergreen Terrace
console.log(city) //Springfield

//Other Example
let {e, f} = { e: 10, f: 20 };
console.log('e: ',e); // e: 10
console.log('f: ',f); // f: 20

//Nested object destructuring

const student = {
    name: 'John Doe',
    age: 16,
    scores: {
        maths: 74,
        english: 63
    }
};

// We define 3 local variables: name, maths, science
// Default value to the variable science, in case the key doesn't exist in the object student
const { name, scores: {maths, science = 50} } = student;

console.log(`${name} scored ${maths} in Maths and ${science} in Elementary Science.`);
// John Doe scored 74 in Maths and 50 in Elementary Science.

//scores are not defined as a variable. Instead, we use nested destructuring to extract the maths and science values from the nestedscores object.

//Object destructuring used as an assignment to a function

//Destructuring can also be applied to function parameters to extract values and assign 
//  them to local variables.

const student = {
    name: 'John Doe',
    age: 16,
    scores: {
        maths: 74,
        english: 63,
        science: 85
    }
};

// Without Destructuring
function displaySummary(student) {
    console.log('Hello, ' + student.name);
    console.log('Your Maths score is ' + (student.scores.maths || 0));
    console.log('Your English score is ' + (student.scores.english || 0));
    console.log('Your Science score is ' + (student.scores.science || 0));
}

// With Destructuring
function displaySummary({name, scores: { maths = 0, english = 0, science = 0 }}) {
    console.log('Hello, ' + name);
    console.log('Your Maths score is ' + maths);
    console.log('Your English score is ' + english);
    console.log('Your Science score is ' + science);
}

displaySummary(student);

//Object destructuring used as an assignment to a function

Destructuring can also be applied to function parameters to extract values and assign them to local variables.

const student = {
    name: 'John Doe',
    age: 16,
    scores: {
        maths: 74,
        english: 63,
        science: 85
    }
};

// Without Destructuring
function displaySummary(student) {
    console.log('Hello, ' + student.name);
    console.log('Your Maths score is ' + (student.scores.maths || 0));
    console.log('Your English score is ' + (student.scores.english || 0));
    console.log('Your Science score is ' + (student.scores.science || 0));
}

// With Destructuring
function displaySummary({name, scores: { maths = 0, english = 0, science = 0 }}) {
    console.log('Hello, ' + name);
    console.log('Your Maths score is ' + maths);
    console.log('Your English score is ' + english);
    console.log('Your Science score is ' + science);
}

displaySummary(student);



//Spreading

let obj = {foo: 1, bar: 2};
let newObj = {...obj, baz: 3}
console.log(newObj) //{ foo: 1, bar: 2, baz: 3 }

// If property keys clash, the property that is mentioned last “wins”:
let obj = {foo: 1, bar: 2, baz: 3};
let newObj = {...obj, foo: true}
console.log(newObj) //{ foo: true, bar: 2, baz: 3 }

let newObj =  {foo: true, ...obj}
console.log(newObj) //{ foo: 1, bar: 2, baz: 3 }

let newObj = {...'abc'}
console.log(newObj) //{ '0': 'a', '1': 'b', '2': 'c' }

let newObj = {...['a', 'b']}
console.log(newObj) //{ '0': 'a', '1': 'b' }