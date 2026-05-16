import React from "react";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { addTask } from "../state/slice";

export default function TasksInput() {
    const nameRef = useRef();
    const dateRef = useRef();
    const dispatch = useDispatch();

    const addNewTask = () => { 
        const name = nameRef.current.value;
        const date = dateRef.current.value;
        if (name.trim() === '') return;
        dispatch(addTask({ name, date }));
    }

    return (
        <div>
            <input ref={ nameRef} placeholder="Add Task..." />
            <input ref={ dateRef}type="date"/>
            <button onClick={() => { addNewTask()}}>Add New Task</button>
        </div>
    )

}