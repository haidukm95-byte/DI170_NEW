import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "./todoSlice";

export default function TodoEngine() { 
    const todos = useSelector((state) => state.todos.todos);

    const dispatch = useDispatch();
    const inputRef = useRef();

    const handleAddTask = () => {
        const taskName = inputRef.current.value.trim();
        if (taskName) {
            dispatch(addTodo(taskName));
            inputRef.current.value = '';
        }
    }

    return (
        <div className="wrapper">
            <div className="input_div">
                <input ref={inputRef} placeholder="Enter your task..." />
                <button onClick={handleAddTask}> Add task! </button>
            </div>
            <div className="task_div">
                {todos.map(task => (
                    <div key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span>
                        <button onClick={() => dispatch(toggleTodo(task.id))}> V </button>
                        <button onClick={() => dispatch(removeTodo(task.id))}> X </button>
                    </div>
                            ))}
            </div>
        </div>
    )
};