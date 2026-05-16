import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
    tasks: []
},

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => { 
            const { name, date } = action.payload;
            const task = {
                id: nanoid(),
                name,
                date,
                active: true
            }
            state.tasks.push(task);

            state.tasks = state.tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

        },
        deleteTask: (state, action) => { 
            state.tasks = state.tasks.filter(item => item.id !== action.payload);

        }
    }
})

export const { addTask, deleteTask } = tasksSlice.action;
export default tasksSlice.reducer;
