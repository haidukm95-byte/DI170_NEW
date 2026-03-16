//Instructions
//Create a variable called sentence. The value of the variable should be a 
// string that contains the words “not” and “bad”.

// For example, “The movie is not that bad, I like it”.
let sentence = prompt('Please enter the sentence containing words \'not\' and \'bad\'')
// Create a variable called wordNot where it’s value is the first 
// appearance (ie. the position) of the substring “not” (from the sentence
//  variable).
let wordNot = sentence.indexOf('not');
// Create a variable called wordBad where it’s value is the first 
// appearance (ie. the position) of the substring “bad” (from the sentence
//  variable).
let wordBad = sentence.indexOf('bad');
// If the word “bad” comes after the word “not”, you should replace the
//  whole “not…bad” substring with “good”, then console.log the result.
if (wordBad > wordNot) {
  let result = sentence.substring(0, wordNot) + "good" + sentence.substring(wordBad + 3);
  console.log(result);
} else {
  console.log(sentence);
}
// For example, the result here should be : “The movie is good, I like it”

// If the word “bad” does not come after “not” or the words are not in the 
// sentence, console.log the original sentence.
