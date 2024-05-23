import { Task } from '../types';


export const saveTasks = (tasks: Task[]): boolean => {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return true;
    }
    catch (error) {
        console.error("Failed to save tasks to local storage:", error);
        return false;
    }
};

export const loadTasks = (): Task[] => {
    try {
        const tasks = localStorage.getItem("tasks");
        return tasks ? JSON.parse(tasks) : [];
    }
    catch (error) {
        console.error("Failed to load tasks from local storage:", error);
        return [];
    }
};
