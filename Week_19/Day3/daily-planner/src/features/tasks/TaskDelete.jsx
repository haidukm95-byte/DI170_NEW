import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../state/slice";

export default function TaskRemove({ id }) { 
    const d = useDispatch();

    return (
        <div>
            <button onClick={() => d(deleteTask(id))}>Delete</button>
        </div>
    );
}