import React from "react";
import TasksInput from "./TasksInput";
import TaskList from "./TaskList";
import TaskDelete from "./TaskDelete";

export default function Tasks() { 
    return (
        <>
            <TasksInput />
            <TaskList/>
            <TaskDelete/>
        </>
    )
}