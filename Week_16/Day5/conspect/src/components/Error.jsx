import React from "react";

//HERE IS AN EXAMPLE OF ERROR HANDLING IN REACT

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: "", errorInfo: "" };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <img src="link_image" />
                    <p>Something went wrong...</p><br></br>
                    <p><u>The error is</u> {this.state.error.toString()} </p><br></br>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

/*In the code snippet above, we have a class named ErrorBoundary that has the state attribute, this.state.

When render() is called and there is an error thrown, static getDerivedStateFromError() catches this error and makes 
the attribute this.state true. This attribute can then be used to trigger fallback UI.

Moreover, componentDidCatch() catches this error and logs the exact error.

NOTE: Error boundaries only catch errors in the components below them in the tree.



Error boundaries vs. try…catch?

Try…catch is used in specific code blocks where you program the functionality of the application.

Try…catch deals with imperative code while error boundaries deal with declarative code. Imperative programming is how 
you do something and declarative programming is what you do.

With error boundary, if there is an error, you can trigger a fallback UI; whereas, with try…catch, you can catch 
errors in your code.

For example, if your method showButton() throws an error, you can deal with it accordingly in the catch() block:
` try { showButton(); } catch (error) { // ... }
*/