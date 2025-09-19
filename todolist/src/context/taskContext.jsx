import { createContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext();

export function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setTasks([
        ...tasks,
        { id: uuidv4(), title: e.target.value, state: false },
      ]);
      e.target.value = "";
    }
  };

  function toggleTaskState(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, state: !task.state };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function editTask(id, title) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        if (title !== "") {
          return { ...task, editeMode: !task.editeMode, title: title };
        } else {
          return { ...task, editeMode: !task.editeMode };
        }
      }
      return { ...task, editeMode: false };
    });
    setTasks(updatedTasks);
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTaskState, deleteTask, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
