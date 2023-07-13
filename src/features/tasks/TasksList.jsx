import { useState } from "react";
import { useSelector } from "react-redux";
// import { AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

const TasksList = () => {
  const tasksList = useSelector((state) => state.tasks.tasksList);
  const [columnsActive, setColumnsActive] = useState(false);

  return (
    <ul className="grid gap-4">
      {/* <AnimatePresence mode="popLayout"> */}
      {tasksList.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {/* </AnimatePresence> */}
    </ul>
  );
};

export default TasksList;
