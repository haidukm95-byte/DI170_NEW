//Exercise 2 : Abbrev_name
//Instructions

//Write a JavaScript function to convert a string into an abbreviated form.

//console.log(abbrevName("Robin Singh")); --> "Robin S."

const abbrevName=(string)=>{
    var parts=string.split(' ');
    var lastName=parts.pop();
    var lastNameAbbr=`${lastName.charAt(0)}.`;
    parts.push(lastNameAbbr);
    var newString=parts.join(' ');
    console.log(newString);
}

abbrevName('Robin Singh');
abbrevName('George W. Bush');
