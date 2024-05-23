import React from 'react';

import { Task } from '../types';


interface TaskProps {
    task: Task;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, toggleTask, deleteTask }) => {
    return (
        <div className="task-item">

            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
            />

            <span
                className={`task-text ${task.completed ? 'completed' : ''}`}
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
            </span>

            <button onClick={() => deleteTask(task.id)} className="delete-task-button">
                Delete
            </button>

        </div>
    );
};

export default TaskComponent;
