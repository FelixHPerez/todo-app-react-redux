import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, toggleChecked } from "./tasksSlice";
// import { motion } from "framer-motion";
import { CheckIcon, DeleteIcon, ModifyIcon } from "../../components/Icons";
import EditableTaskItem from "./EditableTaskItem";
import { Switch } from "@headlessui/react";

// const addedTaskVariant = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//     },
//   },
// };

const TaskItem = forwardRef(({ task }, ref) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setTransitionStart(true);
    setTimeout(() => {
      setTransitionStart(false);
    }, 2000);
  };

  return (
    <div
      className="relative"
      ref={ref}
      //   layoutId={task.id}
      //   variants={addedTaskVariant}
      //   initial="hidden"
      //   animate="visible"
      //   exit="hidden"
    >
      {editMode ? (
        <EditableTaskItem setEditMode={setEditMode} task={task} />
      ) : (
        <li
          className="grid gap-4 rounded-xl bg-slate-200/80 p-4 dark:bg-slate-900/80"
          //   className={`w-full rounded-2xl bg-slate-200/80 py-4 pl-4 pr-16 text-slate-900 placeholder:text-slate-500 focus:outline focus:outline-2 dark:bg-slate-900/80 dark:text-white sm:pr-32
          //   ${isInputValid ? "focus:outline-blue-400" : "focus:outline-red-400"}`}

          //   className={`my-6 flex items-center justify-between rounded-2xl px-4 shadow-md ${taskBackgroundColor} dark:opacity-40`}
          //   layout
        >
          <div className="flex items-center">
            <div className="mr-2 flex h-full items-center border-r border-slate-900/10 pr-2 dark:border-slate-50/[0.06]">
              <Switch
                type="checkbox"
                checked={task.checked}
                onChange={() => dispatch(toggleChecked(task.id))}
                aria-label={`Toggle check ${task.text}`}
                id="task-text"
              >
                <CheckIcon
                  className={`h-5 w-5 rounded-full p-1 transition-[background-color] duration-300 ${
                    task.checked
                      ? "bg-green-400/70"
                      : "bg-slate-900/10 dark:bg-slate-50/[0.06]"
                  }`}
                />
              </Switch>
            </div>
            <label htmlFor="task-text" className="dark:text-white">
              {task.text}
            </label>
          </div>

          <div className="flex items-center justify-center gap-5">
            <button
              className="transition-[opacity, background-color] peer rounded-full bg-orange-400/70 px-4 py-1 duration-300 disabled:cursor-not-allowed disabled:bg-orange-200 dark:bg-orange-400 dark:disabled:bg-orange-200/70"
              onClick={() => setEditMode(true)}
              disabled={task.checked}
            >
              <ModifyIcon
                className={`h-4 w-4 transition-[opacity] duration-300 ${
                  task.checked ? "opacity-50" : "opacity-100"
                }`}
              />
            </button>
            <button
              className="rounded-full bg-red-400/70 px-4 py-1 dark:bg-red-400"
              onClick={() => dispatch(removeTask(task.id))}
            >
              <DeleteIcon className="h-4 w-4" />
            </button>
          </div>
        </li>
      )}
    </div>
  );
});

export default TaskItem;
