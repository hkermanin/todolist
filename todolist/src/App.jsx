import Todo from "./components/todo";
import { TaskContextProvider } from "./context/taskContext";

function App() {
  return (
    <TaskContextProvider>
      <div className="h-screen bg-gray-200 flex justify-center items-center">
        <Todo />
      </div>
    </TaskContextProvider>
  );
}

export default App;
