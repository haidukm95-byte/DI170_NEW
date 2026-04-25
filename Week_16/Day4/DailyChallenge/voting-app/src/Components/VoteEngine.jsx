import { useState } from "react";
import "./VoteEngine.css";


function Vote(){
    const [languages, setLanguages] = useState([
        { name: "Php", votes: 0 },
        { name: "Python", votes: 0 },
        { name: "JavaSript", votes: 0 },
        { name: "Java", votes: 0 }
    ]);

    const ButtonRender = () => {
        return languages.map((lang, i) => {
            const voteOnclick = () => {
                setLanguages(prev =>
                    prev.map((l, j) => j === i ? { ...l, votes: l.votes + 1 } : l)
                );
            };
            return (
                <div key={i} className="language">
                    <p>{lang.votes}</p>
                    <p>{lang.name}</p>
                    <button className="vote" type="button" onClick={voteOnclick}>Click Here</button>
                </div>
            );
        });
    };
    


    return (
        <>
            <div id="wrapper">
                <ButtonRender/>
            </div>
        </>
    )
}

export default Vote;