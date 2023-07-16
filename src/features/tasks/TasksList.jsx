import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

const TasksList = () => {
  const { tasksList } = useSelector((state) => state.tasks);

  return (
    <ul>
      <AnimatePresence mode="popLayout">
        {tasksList.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TasksList;
