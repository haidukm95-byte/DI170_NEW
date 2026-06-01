/* 
Exercise 1: Intersection Types

Task

Define an intersection type PersonWithAddress that combines Person and Address types. 
Create a variable of this type with properties from both types.
The Person type should contain name and age, the Address type should contain street and city
*/

type Person={
    name: string,
    age: number
};
type Address={
    street: string,
    city: string,
};

export type PersonWithAddress=Person & Address;

export const user1: PersonWithAddress={
    name: "Patrick Johnson",
    age: 35,
    street: "5th Avenue",
    city: "New York City"
};




