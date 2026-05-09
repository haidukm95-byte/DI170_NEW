import { useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTask, isDone, removeTask } from "../redux/actions";
import './Todo.css'
import tickIcon from './tick.png';
import deleteIcon from './delete-button.png';

export default function Todo() {
    const tasks = useSelector((state) => state.todos.tasks);
    const dispatch = useDispatch();
    const inputRef = useRef();
    const dateRef = useRef();

    const grouped = tasks.reduce((acc, task) => {
      acc[task.date] = acc[task.date] || [];
      acc[task.date].push(task);
      return acc;
    }, {});
    
    const handleAddTask = () => {
        const taskName = inputRef.current.value.trim();
        const taskDate = dateRef.current.value;
        if (taskName && taskDate) {
            dispatch(addTask(taskName, taskDate));
            inputRef.current.value = '';
        }
    }

        return (
            <div className="wrapper">
                <div className="input_div">
                    <input ref={dateRef} type="date" lang="en-GB" defaultValue={new Date().toISOString().split('T')[0]}/>
                    <input ref={inputRef} placeholder="Enter your task..." />
                    <button onClick={handleAddTask}> Add task! </button>
                </div>
                { Object.entries(grouped).sort(([a], [b])=> a.localeCompare(b)).map(([date, tasks])=>
                    <div key={date} className="date_div">
                        <h3>{ date}</h3>
                    {tasks.map(task => (
                        <div key={task.id} className="task_div">
                            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                                {task.name}
                            </span>
                            <button className="task-done" onClick={() => dispatch(isDone(task.id))}><img src={tickIcon} alt=" V "/></button>
                            <button className="task-delete" onClick={() => dispatch(removeTask(task.id))}><img src={deleteIcon} alt=" X "/></button>
                        </div>
                    ))}
                    </div>
                    )}
            </div>
        )
    }
