import Header from "./features/darkMode/Header";
import AddTaskForm from "./features/tasks/AddTaskForm";

const App = () => {
  return (
    <>
      <Header />
      <main className="mx-auto min-w-min px-4 sm:w-10/12 lg:w-8/12">
        <AddTaskForm />
      </main>
    </>
  );
};
export default App;
