import { useState } from "react"

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if (!task.trim()) return
    setTasks([...tasks, task])
    setTask("")
  }

  const deleteTask = index => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="container">
      <h1>To-Do List SPA</h1>

      <div className="input-box">
        <input
          value={task}
          onChange={e => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            {t}
            <button onClick={() => deleteTask(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
