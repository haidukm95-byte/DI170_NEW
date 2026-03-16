const morse = {
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
};


//1. Create three functions. The two first functions should return a promise..

//2. The first function is named toJs():
        //this function converts the morse json string provided above to a morse javascript object.
        //if the morse javascript object is empty, throw an error (use reject)
        //else return the morse javascript object (use resolve)

function toJs(){
    let jsMorse = JSON.parse(JSON.stringify(morse));
    return new Promise((resolve, reject)=>{
        if (Object.keys(jsMorse).length === 0){
            reject(new Error("Morse object is empty"));
        }
        else {
            resolve(jsMorse);
        }
    });
}

//3. The second function called toMorse(morseJS), takes one argument: the new morse 
// javascript object.
        //This function asks the user for a word or a sentence.
        //if the user entered a character that doesn’t exist in the new morse javascript 
        // object, 
        // throw an error. (use reject)
        //else return an array with the morse translation of the user’s word.

        //if the user enters the word "Hello", the promise resolves with this value 
        // ["....", ".", ".-..", ".-..","---"]
        //if the user entered the word "¡Hola!", the promise rejects because the character 
        // "¡" doesn't exist in the morse javascript object

function toMorse(morseJS){
    let userInput = prompt('Enter a word or a sentence: ');
    return new Promise((resolve, reject)=>{
        if(!userInput){
            return reject(new Error('No input provided'));
        }
        let morseArray = [];
        for (let char of userInput.toLowerCase()) {
            if (char===' ') {
                morseArray.push(' ');
                continue;
            } 
            if(morseJS.hasOwnProperty(char)){
                morseArray.push(morseJS[char]);
            }
            else {
                return reject(new Error(`Character '${char}' is not supported in Morse code`));
            }
        }
        resolve(morseArray);
    });
}

//4. The third function called joinWords(morseTranslation), takes one argument: the morse translation array
       // this function joins the morse translation by using line break and display it on the page (ie. On the DOM)

function joinWords(morseTranslation){
    let morseString = morseTranslation.join('\n');
    let p=document.createElement('p');
    p.textContent = morseString;
    document.body.appendChild(p);
};

//5. Chain the three functions.

toJs()
    .then(jsObj=>toMorse(jsObj))
    .then(morseArr=>joinWords(morseArr))
    .catch(err=>console.error(err));
