import { useState } from "react";

const Todo = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, {text:input,completed:false}]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const toggleBtn=(index)=>{
    setTasks(tasks.map((task,i)=>{
      if(i===index){
        return {...task,completed:!task.completed};
      }
      return task;
    }))
  }
  return (
    <>
      <h1>Todo List</h1>
      <input 
        type="text"
        value={input}
        placeholder="Enter Task"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key==="Enter"){
            addTask();
          }
        }}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task,index) => (
          <li key={index}>
            {task.text} <button onClick={() => toggleBtn(index)}>{task.completed? "✅":"❌"}</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
