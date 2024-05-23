import React, { useState, useEffect } from 'react';

import { Task } from '../types';
import Todo from './Task';
import { saveTasks, loadTasks } from '../utils/localStorage';


const ToDoList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskText, setTaskText] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedTasks = loadTasks();
        setTasks(storedTasks);
    }, []);

    const addTask = () => {
        if (taskText.trim() === '') {
            setError('Task cannot be empty.');
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        const updatedTasks = [...tasks, newTask];
        if (saveTasks(updatedTasks)) {
            setTasks(updatedTasks);
            setTaskText('');
            setError(null);
        }
        else {
            setError('Failed to save the new task.');
        }
    };


    const toggleTask = (id: number) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );

        if (saveTasks(updatedTasks)) {
            setTasks([
                ...updatedTasks.filter((task) => !task.completed),
                ...updatedTasks.filter((task) => task.completed),
            ]);
            setError(null);
        }
        else {
            setError('Failed to update the task.');
        }
    };

    const deleteTask = (id: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        if (saveTasks(updatedTasks)) {
            setTasks(updatedTasks);
            setError(null);
        }
        else {
            setError('Failed to delete the task.');
        }
    };


    return (
        <div className="todo-list">

            <h1>To-Do List</h1>

            {error && <p className="error-message">{error}</p>}

            <div className="task-input-container">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    className="task-input"
                />
                <button onClick={addTask} className="add-task-button">Add</button>
            </div>

            <div className="tasks-container">
                {tasks.map((task) => (
                    <Todo
                        key={task.id}
                        task={task}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                    />
                ))}

            </div>

        </div>
    );
};

export default ToDoList;
