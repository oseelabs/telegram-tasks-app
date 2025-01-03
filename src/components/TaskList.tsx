import { db } from "@/lib/firebase";
import { Task } from "@/types/task";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

interface TaskListProps {
    groupId: string;
};

export default function TaskList({ groupId }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const q = query(
            collection(db, 'tasks'),
            where('groupId', '==', groupId),
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const taskList: Task[] = [];
            querySnapshot.forEach((doc) => {
                taskList.push({
                    id: doc.id,
                    ...doc.data()
                } as Task);
            });
            console.log(taskList);
            setTasks(taskList);
        });

        return () => unsubscribe();
    }, [groupId]);

    return (
        <ul className="space-y-4">
            { tasks.map(
                (task) => (
                    <TaskItem key={task.id} task={task} />
                )
            ) }
        </ul>
    );
};