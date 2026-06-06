import { useRef, useState } from "react";


interface User{
    name?: string;
    age?: number;
    role?: string
}


export default function UserCard({ name : defaultName = 'Anonymous', age: defaultAge = 0, role: defaultRole = "Guest" }: User) {
    const [name, setName]=useState<string>(defaultName);
    const [age, setAge]=useState<number>(defaultAge);
    const [role, setRole]=useState<string>(defaultRole);

    const nameRef=useRef<HTMLInputElement>(null)
    const ageRef=useRef<HTMLInputElement>(null)
    const roleRef=useRef<HTMLInputElement>(null)

    const submitHandler=():void=>{
        setName(nameRef.current?.value || defaultName);
        setAge(Number(ageRef.current?.value) || defaultAge);
        setRole(roleRef.current?.value || defaultRole);
    }
    return (
        <div>
            <input ref={nameRef} placeholder="Enter your name"/>
            <input ref={ageRef} placeholder="Enter your age"/>
            <input ref={roleRef} placeholder="Enter your role"/>
            <button onClick={submitHandler}>Submit!</button>

            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Role: {role}</p>
        </div>
        );
    }