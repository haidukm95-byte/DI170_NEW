import { useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTask, isDone, removeTask } from "../redux/actions";

export default function Todo() {
    const tasks = useSelector((state) => state.todos.tasks);
    const dispatch = useDispatch();
    const inputRef = useRef();
    const handleAddTask = () => {
        const taskName = inputRef.current.value.trim();
        if (taskName) {
            dispatch(addTask(taskName));
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
                    {tasks.map(task => (
                        <div key={task.id}>
                            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                                {task.name}
                            </span>
                            <button onClick={() => dispatch(isDone(task.id))}> V </button>
                            <button onClick={() => dispatch(removeTask(task.id))}> X </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
