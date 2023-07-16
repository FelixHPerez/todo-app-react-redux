import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import darkModeReducer from "../features/darkMode/darkModeSlice";
import { loadState, saveState } from "../utils/localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    darkMode: darkModeReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
    darkMode: store.getState().darkMode,
  });
});
