"use client";

import { db } from "@/lib/firebase";
import { Task } from "@/types/task";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

interface TaskItemProps {
    task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
    const [isCompleted, setIsCompleted] = useState<boolean>(task.completed);

    const toggleCompleted = async () => {
        setIsCompleted(!isCompleted);
        await updateDoc(doc(db, 'tasks', task.id), {
            completed: !isCompleted,
        });
    };

    const deleteTask = async () => {
        await deleteDoc(doc(db, 'tasks', task.id));
    };

    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    id="completed"
                    checked={isCompleted}
                    onChange={toggleCompleted}
                    className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor="completed" className={isCompleted ? 'line-through text-gray-500' : ''}>
                    {task.title}
                </label>
            </div>
            <button
                onClick={deleteTask}
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </li>
    );
};