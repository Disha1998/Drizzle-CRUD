'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
    id: number;
    task: string;
}

const TodoList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [editTaskContent, setEditTaskContent] = useState('');


    // Fetch tasks from the Express backend
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            console.log(response, '---');

            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Add a new task
    const addTask = async () => {
        try {
            await axios.post('http://localhost:5000/api/tasks', { task: newTask });
            setNewTask('');
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Delete a task
    const deleteTask = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };


    // Set up edit mode for a task
    const editTask = (id: number, currentTask: string) => {
        setEditTaskId(id);
        setEditTaskContent(currentTask);
    };

    // Update the task in the backend
    const updateTask = async () => {
        if (editTaskId === null) return;

        try {
            await axios.put(`http://localhost:5000/api/tasks/${editTaskId}`, { task: editTaskContent });
            setEditTaskId(null);
            setEditTaskContent('');
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };



    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Todo List</h1>
        
        <div className="flex mb-4">
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
                className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
                onClick={addTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
            >
                Add Task
            </button>
        </div>
        
        <ul className="space-y-4">
            {tasks.map((task) => (
                <li key={task.id} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
                    {editTaskId === task.id ? (
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={editTaskContent}
                                onChange={(e) => setEditTaskContent(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            <button
                                onClick={updateTask}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditTaskId(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between w-full">
                            <span className="text-gray-700 text-lg">{task.task}</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => editTask(task.id, task.task)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    </div>
    
    );
};

export default TodoList;
