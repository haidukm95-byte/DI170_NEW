/*Exercise 5 : Regular Expression #1
Instructions

    Use the regular expression module to extract numbers from a string

Example

returnNumbers('k5k3q2g5z6x9bn') 
// Excepted output : 532569
*/

const returnNumbers = (string) => {
  const matches = string.match(/\d+/g);
  console.log(matches ? matches.join('') : '');
};

returnNumbers("df7832fshd932");
returnNumbers("232sd");
returnNumbers("skdhfdsf8888");
