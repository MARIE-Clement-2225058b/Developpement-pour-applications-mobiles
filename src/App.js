import React, { useState } from 'react';

// Task component
function Task({ task }) {
  return <li>{task}</li>;
}

// TaskList component
function TaskList({ tasks }) {
  return (
      <ul>
        {tasks.map((task, index) => (
            <Task key={index} task={task} />
        ))}
      </ul>
  );
}

// TaskInput component
function TaskInput({ addTask }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      addTask(input);
      setInput('');
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
  );
}

// App component
function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
      <div>
        <TaskInput addTask={addTask} />
        <TaskList tasks={tasks} />
      </div>
  );
}

export default App;