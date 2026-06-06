import { useState } from "react";

interface Greeting {
    name: string;
    messageCount: number;
}

export default function GreetingComponent() {
    const [inputValue, setInputValue] = useState("");
    const [greeting, setGreeting] = useState<Greeting | null>(null);

    const handleCount = () => {
        if (!greeting) return;
        setGreeting({ ...greeting, messageCount: greeting.messageCount + 1 });
    };

    const handleSubmit = (value: string): string => {
        const newGreeting: Greeting = { name: value, messageCount: 1 };
        setGreeting(newGreeting);
        return newGreeting.name;
    };

    return (
        <div className="greeting-message">
            <h2>Hello{greeting ? `, ${greeting.name}` : ""}!</h2>
            <input
                type="text"
                placeholder="Enter your name here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={() => handleSubmit(inputValue)}>Submit</button>
            <button onClick={handleCount}>Count: {greeting?.messageCount ?? 0}</button>
        </div>
    );
}
