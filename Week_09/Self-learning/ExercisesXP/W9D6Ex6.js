//Exercise 6 : Challenges

//Evaluate these (ie True or False)

//[2] === [2]
//the output will be false, because they are different nodes and are stored in different memory cells
//{} === {}
//the output will be false, because they are different nodes and are stored in different memory cells

//What is, for each object below, the value of the property number and why?

    const object1 = { number: 5 }; 
    const object2 = object1; 
    const object3 = object2; 
    const object4 = { number: 5};

    object1.number = 4;
    console.log(object2.number);
    // Output: 4, because of being an object, after declaring object2=object1, its value has been cloned from object1
    console.log(object3.number);
    // Output: 4, because of being an object, after declaring object3=object2 and previously object2=object1, its value has been cloned from object1
    console.log(object4.number);
    //Output: 5, because it wasn`t tied to any object from above, so it`s value hasn`t been changed

//Create a class Animal with the attributes name, type and color. The type is the animal 
// type, for example: dog, cat, dolphin etc …
class Animal{
    constructor(name, type, color){
        this.name=name;
        this.type=type;
        this.color=color;
    }
}
//Create a class Mammal that extends from the Animal class. Inside the class, add a 
// method called sound(). This method takes a parameter: the sound the animal makes, 
// and returns the details of the animal (name, type and color) as well as the sound 
// it makes.
class Mammal extends Animal{
    sound(snd){
        return `${snd}, I\'m a ${this.name}, named ${this.type} and I\'m ${this.color}`
    }
}

//Create a farmerCow object that is an instance of the class Mammal. The object accepts 
// a name, a type and a color and calls the sound method that “moos” her information.
//For example: Moooo I'm a cow, named Lily and I'm brown and white
let farmerCow=new Mammal('cow', 'Lily', 'brown and white');
console.log(farmerCow.sound('Moooo'))