import { useState } from "react";

function Garage() {
    const [size, setSize] = useState("small");
    return (
        <h2>Who lives in my { size} garage?</h2>
    )
};

export default Garage