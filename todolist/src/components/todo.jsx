import { useContext } from "react";
import Task from "./task";
import { TaskContext } from "../context/taskContext";

export default function Todo() {
  const { tasks, addTask } = useContext(TaskContext);

  return (
    <div className="flex flex-col gap-5 w-[700px] p-5 shadow bg-white">
      <h1 className="text-blue-600 font-bold text-3xl">
        To-Do Project | Hossein Kermani
      </h1>
      <input
        onKeyDown={addTask}
        className="border border-gray-300 p-2 rounded outline-none"
        placeholder="What needs to be done today?"
        type="text"
      />

      <div className="max-h-[400px] overflow-y-auto">
        {tasks.map((task, i) => {
          return <Task key={i} task={task} />;
        })}
      </div>
    </div>
  );
}
