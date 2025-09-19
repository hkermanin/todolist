import { useRef , useContext} from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { TaskContext } from "../context/taskContext";

export default function Task({ task}) {

  const {toggleTaskState,deleteTask,editTask} = useContext(TaskContext);
  

  const editRef = useRef(null);
  useOnClickOutside(editRef, () => {
    if (task.editeMode) {
      editTask(task.id, "");
    }
  });

  return (
    <div className="border-b-2 border-gray-300 p-3 flex justify-between text-2xl font-serif">
      <div className="flex gap-2 items-center">
        <input
          onChange={() => {
            toggleTaskState(task.id);
          }}
          checked={task.state}
          className="cursor-pointer scale-150"
          type="checkbox"
        />
        {task.editeMode ? (
          <input
            autoFocus
            ref={editRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editTask(task.id, e.target.value);
              }
            }}
            className="outline-none border-b border-gray-400"
            type="text"
            defaultValue={task.title}
          />
          
        ) : (
          <span className={`${task.state ? "line-through" : ""}`}>
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-0.5">
        <div
          
          onClick={() => {
            editTask(task.id,'');
          }}
          className="text-blue-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>

        <div
          onClick={() => {
            deleteTask(task.id);
          }}
          className="text-red-700 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
