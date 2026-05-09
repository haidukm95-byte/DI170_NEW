import React from "react";

class Actor extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "Bruce",
            lastName: "Willis",
            image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIF.vHV5Ee9D8p8xQZeHc6hLVA%3Fpid%3DApi&f=1&ipt=8cf577a75d39a74d315d6473abcd849cebc6f53e7db25c8584dd315a2028de7c&ipo=images"
        }
    }
    render() {
        return (
            <div>
                <img src={this.state.image} /><br />
                <p>Last name: {this.state.lastName}</p>
                <p>First name: {this.state.firstName}</p>
            </div>
            
        );
    }
}

export default Actor