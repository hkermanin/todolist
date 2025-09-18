import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Task from "./task";

export default function Todo() {
  const [tasks, setTasks] = useState([
    {id:uuidv4(),title:'test',state:true,editeMode:false},
    {id:uuidv4(),title:'test 2',state:false,editeMode:false},
    {id:uuidv4(),title:'test 3',state:true,editeMode:false}
  ]);

  const addTask = (e)=>{
    if(e.key === 'Enter' && e.target.value.trim() !== ''){
      setTasks([...tasks,{id:uuidv4(),title:e.target.value,state:false}])
      e.target.value = '';
    }
  }

  function toggleTaskState(id){
    const updatedTasks = tasks.map((task)=>{
      if(task.id === id){
        return {...task, state: !task.state}
      }
      return task;
    })
    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const updatedTasks = tasks.filter((task)=> task.id !== id);
    setTasks(updatedTasks);
  }

  function editTask(id,title){
    const updatedTasks = tasks.map((task)=>{
      if(task.id === id){
        if(title!==''){
          return {...task, editeMode: !task.editeMode, title:title}
        }else{
          return {...task, editeMode: !task.editeMode}
        }
      }
      return {...task, editeMode:false};
    })
    setTasks(updatedTasks);
    
  }

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
        {tasks.map((task, i)=>{
          return <Task key={i} editTask={editTask} deleteTask={deleteTask} toggleTaskState={toggleTaskState} task={task}/>
        })}
        
      </div>
    </div>
  );
}
