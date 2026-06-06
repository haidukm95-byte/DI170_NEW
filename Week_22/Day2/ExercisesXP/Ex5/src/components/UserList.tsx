import { useState, useEffect } from "react";

interface User{
    id: number;
    name: string;
    username: string;
    email: string;
    address:{
        street: string;
        city: string
    };
};

export default function UserList(){
    const [users, setUsers]=useState<User[]>([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState<string | null>(null);

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>{
            if(!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            return res.json()
        })
        .then((data: User[])=>setUsers(data))
        .catch((err: Error)=>setError(err.message))
        .finally(()=>setLoading(false))
    }, [])
    return(
        <ul>
            {users.map((user)=>(
                <li key={user.id}>
                    <strong>{user.name}</strong> ({user.username}) — {user.email}
                    <br />
                    <small>{user.address.street}, {user.address.city}</small>
                </li>
            ))}
        </ul>
    )
}