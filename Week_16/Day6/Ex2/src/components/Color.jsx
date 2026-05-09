import React from "react";

class Color extends React.Component {
    constructor(props) {
        super(props);
        this.state = { color: "red" };
    }

    componentDidMount() {
        this.setState({ color: "yellow" });
        alert("componentDidMount reached");
    }

    render() {
        return (
            <>
                <h1>My favorite color is <i>{this.state.color}</i></h1>
                <button type="button" onClick={() => this.setState({ color: "blue" })}>Change to blue!</button>
            </>
        );
    }
}

export default Color;
