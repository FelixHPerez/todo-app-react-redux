import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./tasksSlice";
import { v4 as uuidv4 } from "uuid";
import { EnterIcon } from "../../components/Icons";
import CharacterCounter from "../../components/CharacterCounter";

const counterVariants = {
  hidden: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const AddTaskForm = () => {
  const [inputText, setInputText] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { tasksList, maxLength } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredText = inputText.replace(/\s{2,}/g, " ").trim();
    if (filteredText !== "") {
      const taskObj = {
        id: uuidv4(),
        text: filteredText,
        checked: false,
      };
      dispatch(addTask(taskObj));
    }
    setInputText("");
    setIsInputValid(false);
  };

  const handleChange = (e) => {
    setIsInputValid(e.target.value.trim() !== "");
    setInputText(e.target.value);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative mb-14"
      initial={{ opacity: 0, marginTop: "10rem" }}
      animate={{
        opacity: 1,
        marginTop: tasksList.length > 0 ? "7rem" : "10rem",
      }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div className="relative">
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="What's next?"
          maxLength={maxLength}
          className={`w-full rounded-2xl bg-slate-200/80 py-4 pl-4 pr-16 text-slate-900 placeholder:text-slate-500 focus:outline focus:outline-2 dark:bg-slate-900/80 dark:text-white sm:pr-32
          ${isInputValid ? "focus:outline-blue-400" : "focus:outline-red-400"}`}
          required
          autoFocus
        />
        <button
          type="submit"
          className="absolute right-4 top-2/4 h-9 w-10 -translate-y-2/4 rounded-md bg-slate-500 duration-300 disabled:cursor-not-allowed disabled:bg-slate-400/50 enabled:hocus:bg-slate-600 dark:bg-slate-300 dark:disabled:bg-slate-500 dark:enabled:hocus:bg-slate-400 sm:flex sm:w-24 sm:items-center sm:justify-around"
          disabled={!isInputValid}
        >
          <code className="hidden text-xs tracking-widest sm:inline sm:text-sm">
            Enter
          </code>
          <EnterIcon className="mx-auto h-4 w-4 sm:m-0" />
        </button>
      </div>

      <CharacterCounter
        className="absolute -left-2 -z-50 ml-4 mt-1 rounded-md bg-slate-200/80 px-1 text-[10px] tracking-normal dark:bg-slate-900/80 sm:text-xs"
        textColor="text-black/50 dark:text-white/50"
        isInputFocused={isInputFocused}
        currentLength={inputText.length}
        maxLength={maxLength}
        variants={counterVariants}
        animate={isInputFocused ? "visible" : "hidden"}
      />
    </motion.form>
  );
};

export default AddTaskForm;
