//The throw operator

//It generates an error.

//Syntax

//throw <error object>


//JavaScript has many built-in constructors for standard errors: Error, SyntaxError, ReferenceError, TypeError and others.
//Error 	Meaning
//EvalError 	Creates an instance representing an error that occurs regarding the global function eval()
//InternalError 	Creates an instance representing an error that occurs when an internal error in the JavaScript engine is thrown. E.g., “too much recursion”.
//RangeError 	Creates an instance representing an error that occurs when a numeric variable or parameter is outside of its valid range.
//ReferenceError 	Creates an instance representing an error that occurs when de-referencing an invalid reference.
//SyntaxError 	Creates an instance representing a syntax error.
//TypeError 	Creates an instance representing an error that occurs when a variable or parameter is not of a valid type.
//URIError 	Creates an instance representing an error that occurs when encodeURI() or decodeURI() are passed invalid parameters.

//Example

const func1 = () => {
    try {
        console.log("starting the try block")
        hello
        console.log("finishing the try block")
    } catch (err) {
        //Check the type of error
        if (err instanceof ReferenceError) {
            console.log(`
                Error Name : ${err.name}, 
                Error Msg : ${err.message},
                Error Stack : ${err.stack}`)
        } else {
            console.log("Other Error")
        }
    } finally {
        console.log("Function done")
    }
}

func1()


Example

const func2 = (a, b) => {
    let result;
    try {
        result = a / b
        if (b == 0) {
            throw new Error('Cannot divide by Zero');
        }
    } catch (err) {
        if (err instanceof ReferenceError) {
            console.log(`
                Error Name : ${err.name}, 
                Error Msg : ${err.message}`
            )
        } else {
            console.log("Other Error")
            console.log(`
                Error Name : ${err.name}, 
                Error Msg : ${err.message}`
            )
        }
    } finally {
        console.log("Function done")
    }
}

func2(3, 0)


//You get :

//Other Error

//    Error Name: Error, 
//    Error Msg: Cannot divide by Zero

//Function done
