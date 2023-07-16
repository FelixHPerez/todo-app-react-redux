import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  tasksList: [],
  maxLength: 180,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.tasksList.push(payload);
    },
    removeTask: (state, { payload }) => {
      state.tasksList = state.tasksList.filter((task) => task.id !== payload);
    },
    toggleChecked: (state, { payload }) => {
      const foundTask = state.tasksList.find((task) => task.id === payload);
      foundTask.checked = !foundTask.checked;
    },
    modifyTask: (state, { payload }) => {
      const foundTask = state.tasksList.find(
        (task) => task.id === payload.taskId
      );
      foundTask.text = payload.filteredNewText;
    },
  },
});

export const { addTask, removeTask, toggleChecked, modifyTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
