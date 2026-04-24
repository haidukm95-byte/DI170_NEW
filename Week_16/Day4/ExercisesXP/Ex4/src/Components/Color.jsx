import { useState, useEffect } from "react";

function Color() {
    const [favoriteColor, setFavoriteColor] = useState("red");
    
    useEffect(() => {
        setFavoriteColor("yellow");
        alert("useEffect reached");
    }, []);
//The empty dependency array [] ensures the alert fires only once, right after the first render.
    return (
        <>
            <h1>My favorite color is <i>{favoriteColor}</i></h1>
            <button type="button" onClick={() => setFavoriteColor("blue")}>Change to blue!</button>
        </>
    );
}

export default Color;
