import Header from "./features/darkMode/Header";
import AddTaskForm from "./features/tasks/AddTaskForm";
import TasksList from "./features/tasks/TasksList";

const App = () => {
  return (
    <>
      <Header />
      <main className="mx-auto min-w-min px-4 sm:w-10/12 lg:w-8/12">
        <AddTaskForm />
        <TasksList />
      </main>
    </>
  );
};

export default App;
