import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { modifyTask } from "./tasksSlice";
import { CheckIcon, DeleteIcon } from "../../components/Icons";
import CharacterCounter from "../../components/CharacterCounter";

const EditTaskModal = ({ editMode, setEditMode, task }) => {
  const [newText, setNewText] = useState("");
  const { maxLength } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editMode) {
      setNewText(task.text);
    }
  }, [editMode]);

  const handleClose = () => {
    setEditMode(false);
    setNewText("");
  };

  const handleAcceptEdit = (taskId, newText) => {
    const filteredNewText = newText.replace(/\s{2,}/g, " ").trim();
    dispatch(modifyTask({ taskId, filteredNewText }));
    handleClose();
  };

  const handleKeyDown = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      handleAcceptEdit(task.id, newText);
    }
  };

  return (
    <Transition appear show={editMode} as={Fragment}>
      <Dialog as="div" onClose={handleClose} className="fixed z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-md"
            aria-hidden="true"
          ></div>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-0"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-0"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="relative rounded-2xl bg-slate-400/60 p-3 dark:bg-slate-900/80 sm:p-4">
              <textarea
                className="mb-1 w-full resize-none rounded-xl bg-slate-200 p-2 shadow-md focus:outline-blue-400 dark:bg-slate-400"
                cols="40"
                rows="5"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label={`The current task being edited is ${newText}`}
              ></textarea>
              <CharacterCounter
                className="absolute left-1 ml-4 mt-1 rounded-md bg-slate-200 px-1 text-[10px] tracking-normal dark:bg-slate-400/70 sm:text-xs"
                textColor="text-black/50"
                currentLength={newText.length}
                maxLength={maxLength}
              />
              <div className="mt-5 flex justify-center gap-3 sm:gap-8">
                <button
                  className="rounded-full bg-green-400 px-4 py-1 shadow-md focus:outline-blue-400 hocus:bg-green-500 dark:bg-green-500 dark:hocus:bg-green-600"
                  aria-label={`Accept the edit of the current task ${newText}`}
                  onClick={() => handleAcceptEdit(task.id, newText)}
                >
                  <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
                <button
                  className="rounded-full bg-red-400 px-4 py-1 shadow-md focus:outline-blue-400 hocus:bg-red-500 dark:bg-red-500 dark:hocus:bg-red-600"
                  aria-label={`Decline the edit of the current task ${newText}`}
                  onClick={handleClose}
                >
                  <DeleteIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
export default EditTaskModal;
