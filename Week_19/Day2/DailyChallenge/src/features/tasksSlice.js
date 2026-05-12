import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksTotal: {
    tasks: [],
    day: {},
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { text, date } = action.payload;
      const newTask = {
        id: Date.now(),
        text,
        date,
        completed: false,
      };
      state.tasksTotal.tasks.push(newTask);
      if (!state.tasksTotal.day[date]) {
        state.tasksTotal.day[date] = [];
      }
      state.tasksTotal.day[date].push(newTask);
    },

    editTask: (state, action) => {
      const { id, text, date } = action.payload;

      const task = state.tasksTotal.tasks.find((t) => t.id === id);
      if (!task) return;

      const oldDate = task.date;

      // Remove task from old date bucket
      state.tasksTotal.day[oldDate] = state.tasksTotal.day[oldDate].filter(
        (t) => t.id !== id,
      );
      if (state.tasksTotal.day[oldDate].length === 0) {
        delete state.tasksTotal.day[oldDate];
      }

      // Add updated task to new date bucket (may be the same date)
      if (!state.tasksTotal.day[date]) {
        state.tasksTotal.day[date] = [];
      }
      state.tasksTotal.day[date].push({ ...task, text, date });

      // Update task in flat list
      task.text = text;
      task.date = date;
    },

    toggleTask: (state, action) => {
      const task = state.tasksTotal.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },

    deleteTask: (state, action) => {
      const id = action.payload;
      const task = state.tasksTotal.tasks.find((t) => t.id === id);
      if (task) {
        state.tasksTotal.day[task.date] = state.tasksTotal.day[
          task.date
        ].filter((t) => t.id !== id);
        if (state.tasksTotal.day[task.date].length === 0) {
          delete state.tasksTotal.day[task.date];
        }
      }
      state.tasksTotal.tasks = state.tasksTotal.tasks.filter(
        (t) => t.id !== id,
      );
    },
  },
});

export const { addTask, editTask, toggleTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
