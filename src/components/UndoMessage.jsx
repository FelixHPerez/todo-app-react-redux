import useCountdown from "../hooks/useCountdown";

const UndoMessage = ({ deletedTask, handleUndoRemove }) => {
  const remainingTime = useCountdown(5000 / 1000);

  console.log("Timer: " + remainingTime);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-white">
      <span>{`Task "${deletedTask.text}" deleted`}</span>
      <button
        className="text-blue-600 rounded-md bg-slate-300 px-4 py-1 focus:outline focus:outline-1 focus:outline-blue-400 hover:bg-slate-400 "
        onClick={handleUndoRemove}
      >
        Undo {`(${remainingTime})`}
      </button>
    </div>
  );
};

export default UndoMessage;
