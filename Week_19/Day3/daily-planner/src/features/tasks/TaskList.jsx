import React from "react";
import { useSelector } from "react-redux";
import TaskRemove from "./TaskDelete";


export default function TaskList() { 
    const tasks = useSelector((state) => state.tasks.tasks);
    return (
        <>
            <h2>Task List</h2>
            { 
                tasks && tasks.map(item => { 
                    return (
                        <div key={item.id}>
                            {item.id} {item.name} {item.date}
                            <TaskRemove id={ item.id}/>
                        </div>
                    )
                })
            }
        </>
    );
}