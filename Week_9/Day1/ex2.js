function checkAge(age) {
  if (age < 18) {
    var message = "Sorry, you're too young.";
  } else {
    var message = "Yay! You're old enough!";
  }

  return message;
}

console.log(checkAge(21));

//same-named const can`t be declared twice. Change from 'const' to 'var'

//OR :
//const message=age<18 ? "Sorry, you're too young." : "Yay! You're old enough!";
//OR: 
//return message without any variables
