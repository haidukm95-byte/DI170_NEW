/* Create a function called validateUnionType(value: any, allowedTypes: string[]): boolean that takes a value and an 
array of allowed types (as strings). The function should return true if the value is one of the allowed types; otherwise,
it should return false. Demonstrate its usage by validating variables with different types. */

function validateUnionType(value: any, allowedTypes: string[]): boolean {
    if (!allowedTypes.includes(typeof value)) return false;
    return true;
}

console.log(validateUnionType('hello', ['string', 'number'])); 
console.log(validateUnionType(42, ['string', 'number']));      
console.log(validateUnionType(true, ['string', 'number']));    


