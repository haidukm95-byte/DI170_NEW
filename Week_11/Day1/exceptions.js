//Exceptions

//Exceptions are a mechanism that makes it possible for code that runs into a problem to raise (or throw) an exception. An exception can be any value.

//Their power lies in the fact that you can set “obstacles” along the stack to catch the exception. Once you’ve caught an exception, you can do something with it to address the problem and then continue to run the program.


//try catch

//Catching one is done by wrapping a piece of code in a try block, followed by the catch keyword.

//When the code in the try block causes an exception to be raised, the catch block is evaluated, with the name in parentheses bound to the exception value.

//Once the catch block finishes—or if the try block finishes without problems—the program proceeds beneath the entire try/catch statement.

//Syntax:
try {
  //lines of code
} catch (e) {

}

//finally

//Contains code that is executed regardless of the program flow, if there was an exception or if there wasn’t:

try {
  //lines of code
} catch (e) {

} finally {

}

//Example :

const func = () => {
    try {
        console.log("starting the try block")
        //Unexisting variable
        hello
        //not accessed if there is an error with the above code
        console.log("finishing the try block")
    } catch (err) {
        console.log("starting the catch block")
        console.log(err)
    } finally {
        console.log("Function done")
    }
}

func()

//You get :

//starting the try block

//starting the catch block

//ReferenceError: hello is not defined
  //  at func (script.js:5)
  //  at script.js:15

// Function done

//Note from the documentation:

//For all built-in errors, the error object has two main properties:

//    name : Error name. For instance, for an undefined variable that’s "ReferenceError".
//    message: Textual message about error details.
//    stack: Current call stack: a string with information about the sequence of nested calls that led to the error. Used for debugging purposes.

//Example :

const func1 = () => {
    try {
        console.log("starting the try block")
        //hello
        console.log("finishing the try block")
    } catch (err) {
        console.log("starting the catch block")
        console.log(`
        Error Name : ${err.name}, 
        Error Msg : ${err.message},
        Error Stack : ${err.stack}`)
    } finally {
        console.log("Function done")
    }
}
func1()


//You get:

//starting the try block

//starting the catch block

//Error Name : ReferenceError, 
//Error Msg : hello is not defined,
//Error Stack : ReferenceError: hello is not defined
//    at func (file_path)
//    at file_line

//Function done
