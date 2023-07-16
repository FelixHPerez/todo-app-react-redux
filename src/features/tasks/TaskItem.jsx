import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, toggleChecked } from "./tasksSlice";
import { Switch } from "@headlessui/react";
// import { motion } from "framer-motion";
import { CheckIcon, DeleteIcon, ModifyIcon } from "../../components/Icons";
import EditTaskModal from "./EditTaskModal";

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

  return (
    <>
      <div
        className="relative"
        ref={ref}
        //   layoutId={task.id}
        //   variants={addedTaskVariant}
        //   initial="hidden"
        //   animate="visible"
        //   exit="hidden"
      >
        <li
          className="grid gap-4 rounded-xl bg-slate-200/80 p-4 dark:bg-slate-900/80"
          //   layout
        >
          <div className="flex items-center">
            <div className="mr-2 flex h-full items-center border-r border-slate-900/10 pr-2 dark:border-slate-50/[0.06]">
              <Switch
                className="rounded-full"
                type="checkbox"
                checked={task.checked}
                onChange={() => dispatch(toggleChecked(task.id))}
                aria-label={`Mark as ${
                  task.checked ? "uncompleted" : "completed"
                } the task ${task.text}`}
                id="task-text"
              >
                <CheckIcon
                  className={`h-5 w-5 rounded-full p-1 transition-[background-color] duration-300 ${
                    task.checked
                      ? "bg-green-400/70 hocus:bg-green-300/70 dark:hocus:bg-green-300/70"
                      : "bg-slate-900/10 hocus:bg-slate-900/40 dark:bg-slate-50/[0.06] dark:hocus:bg-slate-50/[0.02]"
                  }`}
                />
              </Switch>
            </div>
            <label
              htmlFor="task-text"
              className={`transition-opacity duration-300 dark:text-white ${
                task.checked ? "line-through opacity-30" : ""
              }`}
            >
              {task.text}
            </label>
          </div>

          <div className="flex items-center justify-center gap-5">
            <button
              className="transition-[opacity, background-color] rounded-full bg-orange-400/70 px-4 py-1 duration-300 disabled:cursor-not-allowed disabled:bg-orange-300/60 hocus:bg-orange-400 dark:bg-orange-400 dark:disabled:bg-orange-300/30 dark:hocus:bg-orange-500"
              onClick={() => setEditMode(true)}
              disabled={task.checked}
              aria-label={`Modify the task ${task.text}`}
            >
              <ModifyIcon
                className={`h-4 w-4 transition-[opacity] duration-300 ${
                  task.checked ? "opacity-50" : "opacity-100"
                }`}
              />
            </button>
            <button
              className="rounded-full bg-red-400/70 px-4 py-1 hocus:bg-red-400 dark:bg-red-400 dark:hocus:bg-red-500"
              onClick={() => dispatch(removeTask(task.id))}
              aria-label={`Delete the task ${task.text}`}
            >
              <DeleteIcon className="h-4 w-4" />
            </button>
          </div>
        </li>
      </div>

      <EditTaskModal
        editMode={editMode}
        setEditMode={setEditMode}
        task={task}
      />
    </>
  );
});

export default TaskItem;
