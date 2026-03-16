//Exercise 3 : SwapCase
//Instructions

//Write a JavaScript function which takes a string as an argument and swaps the case of each character.
//For example :

//if you input 'The Quick Brown Fox' 
//the output should be 'tHE qUICK bROWN fOX'.

const swapCase=(string)=>{
    return string.split('').map(char=>{
        if(char===char.toUpperCase()){
            return char.toLowerCase()
        } else {
            return char.toUpperCase()
        }
    }).join('');
}

console.log(swapCase('The Quick Brown Fox'));