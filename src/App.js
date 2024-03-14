import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [searchText, setSearchText] = useState('');

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    // Save tasks to localStorage whenever tasks state changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Add a new task
    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { title: newTask, isChecked: false }]);
            setNewTask('');
        }
    };

    // Toggle task completion
    const toggleTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
        setTasks(updatedTasks);
    };

    // Delete a task
    const deleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    // Change task order
    const moveTask = (index, direction) => {
        const updatedTasks = [...tasks];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < tasks.length) {
            const temp = updatedTasks[index];
            updatedTasks[index] = updatedTasks[newIndex];
            updatedTasks[newIndex] = temp;
            setTasks(updatedTasks);
        }
    };

    // Filter tasks based on search text
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="App">
            <header>
                <h1>Liste de tâches</h1>
                <p>{tasks.filter(task => !task.isChecked).length} restantes sur {tasks.length}</p>
            </header>
            <div className="task-container">
                <input
                    type="text"
                    placeholder="Rechercher des tâches..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <ul>
                    {filteredTasks.map((task, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={task.isChecked}
                                onChange={() => toggleTask(index)}
                            />
                            <span className={task.isChecked ? 'checked' : ''}>{task.title}</span>
                            <button onClick={() => deleteTask(index)}>Supprimer</button>
                            <button onClick={() => moveTask(index, 'up')} disabled={index === 0}>↑</button>
                            <button onClick={() => moveTask(index, 'down')} disabled={index === tasks.length - 1}>↓</button>
                        </li>
                    ))}
                </ul>
                <div className="add-task">
                    <input
                        type="text"
                        placeholder="Ajouter une nouvelle tâche..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button onClick={addTask}>Ajouter une tâche</button>
                </div>
            </div>
        </div>
    );
}

export default App;
