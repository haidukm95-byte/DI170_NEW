import { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, toggleTask, deleteTask } from "./tasksSlice.js";
import tickIcon from './tick.png';
import deleteIcon from './delete-button.png'
import './Tasks.css'

export default function TasksApp() {
    const tasks = useSelector((state) => state.tasks.tasksTotal.tasks);
    const dispatch = useDispatch();

    const inputRef = useRef();
    const dateRef = useRef();
    const editInputRef = useRef();
    const editDateRef = useRef();

    const [editingTaskId, setEditingTaskId] = useState(null);

    const grouped = tasks.reduce((acc, task) => {
        acc[task.date] = acc[task.date] || [];
        acc[task.date].push(task);
        return acc;
    }, {});

    const handleAddTask = () => {
        const taskName = inputRef.current.value.trim();
        const taskDate = dateRef.current.value;
        if (taskName && taskDate) {
            dispatch(addTask({ text: taskName, date: taskDate }));
            inputRef.current.value = '';
        }
    };

    const handleEditTask = (id) => {
        const editTaskName = editInputRef.current.value.trim();
        const editTaskDate = editDateRef.current.value;
        if (editTaskName && editTaskDate) {
            dispatch(editTask({ id, text: editTaskName, date: editTaskDate }));
            setEditingTaskId(null);
        }
    };

    return (
        <div className="wrapper">
            <div className="input_div">
                <input ref={dateRef} type="date" />
                <input ref={inputRef} type="text" placeholder="Enter your task..." />
                <button onClick={handleAddTask}> Add task! </button>
            </div>
            {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([date, tasks]) =>
                <div key={date} className="date_div">
                    <h3>{date}</h3>
                    {tasks.map(task => (
                        <div key={task.id} className="task_div">
                            {editingTaskId === task.id ? (
                                <>
                                    <input ref={editInputRef} type="text" defaultValue={task.text} />
                                    <input ref={editDateRef} type="date" defaultValue={task.date} />
                                    <button onClick={() => handleEditTask(task.id)}>Save</button>
                                    <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                        {task.text}
                                    </span>
                                    <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
                                    <button className="task-done" onClick={() => dispatch(toggleTask(task.id))}><img src={tickIcon} alt=" V " /></button>
                                    <button className="task-delete" onClick={() => dispatch(deleteTask(task.id))}><img src={deleteIcon} alt=" X " /></button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
