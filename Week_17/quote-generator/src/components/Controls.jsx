import { useState } from "react";

export default function Controls({ onFetch, loading }) { 
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");

    function handleKeyDown(e) { 
        if (e.key === 'Enter') onFetch({ category, author });
    }

    return (
        <>
            <div className="controls">
                <input
                    type='text'
                    placeholder="Category (e.g. wisdom, success)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={() => onFetch({ category, author })} disabled={loading}>
                    {loading ? "Loading..." : "Get Quote"}
                </button>
            </div>
        </>
    );
}