import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const remainingTasks = tasks.filter(task => !task.isChecked).length;
    const totalTasks = tasks.length;


    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks && savedTasks.length > 0) {
            setTasks(savedTasks);
        }
    }, []);

    // Save tasks to localStorage whenever tasks state changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const confirmAddTask = () => {
        setTasks([...tasks, { title: newTask, isChecked: false, dueDate: newTaskDueDate }]); // Include due date
        setNewTask('');
        setNewTaskDueDate(''); // Reset due date input field
        setIsModalOpen(false);
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
    const filteredTasks = searchText.length >= 3 ? tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
    ) : tasks;

    const searchInput = (
        <input
            type="text"
            placeholder="Rechercher des tâches..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />
    );

    const addTaskButton = (
        <button onClick={openModal}>Ajouter une tâche</button>
    );


    return (
        <div className="App">
            <Header remainingTasks={remainingTasks} totalTasks={totalTasks} />
            <div className="task-container">
                <ul>
                    {filteredTasks.map((task, index) => (
                        <li key={index}>
                            <span>{index + 1} </span>
                            {new Date(task.dueDate) < new Date() ?
                                <img src={process.env.PUBLIC_URL + '/alarme.gif'} alt="Alarme" width="40" height="40" /> :
                                <span style={{visibility: 'hidden'}}>
                                    <img src={process.env.PUBLIC_URL + '/alarme.gif'} alt="Alarme" width="40" height="40" />
                                </span>
                            }
                            <input
                                type="checkbox"
                                checked={task.isChecked}
                                onChange={() => toggleTask(index)}
                            />

                            <button onClick={() => deleteTask(index)}>Supprimer</button>
                            <button onClick={() => moveTask(index, 'up')} disabled={index === 0}>↑</button>
                            <button onClick={() => moveTask(index, 'down')} disabled={index === tasks.length - 1}>↓</button>
                            <span className={task.isChecked ? 'checked' : ''}> {task.title} </span>
                            <span> / {task.dueDate} </span>
                        </li>
                    ))}
                </ul>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Confirmation Modal">
                    <h2>Créer une nouvelle tâche</h2>
                    <input
                        type="text"
                        placeholder="Ajouter une nouvelle tâche..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <input
                        type="date"
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                    />
                    <button onClick={confirmAddTask}>Confirmer</button>
                    <button onClick={() => setIsModalOpen(false)}>Annuler</button>
                </Modal>
            </div>
            <Footer searchInput={searchInput} addTaskButton={addTaskButton} />
        </div>
    );
}

export default App;
