"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import Image from "next/image";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

const TaskBoardClient = dynamic(() => Promise.resolve(TaskBoard), {
  ssr: false,
});

export default function Home() {
  return (
    <Suspense fallback={ <div className="p-8">Loading...</div> }>
      <TaskBoardClient />
    </Suspense>
  )
};

function TaskBoard() {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const launchParams = useLaunchParams();

  useEffect(() => {
    const initializeComponent = async () => {
      try {
        if (launchParams?.startParam) {
          const encodedGroupId = launchParams.startParam;
          try {
            const decodedGroupId = atob(encodedGroupId);
            console.log(decodedGroupId);
            setGroupId(decodedGroupId);
          } catch (err) {
            console.error('Error decoding group ID: ', err);
            setError('Invalid group ID format');
          }
        } else {
          console.log('No start param found');
          setError('No group ID provided');
        }
      } catch (err) {
        console.error('Error initializing component: ', err);
        setError('An error occurred while initializing the component');
      } finally {
        setIsLoading(false);
      }
    };

    initializeComponent();
  }, [launchParams]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!groupId) {
    return <div className="p-8">Please provide a valid group Id</div>;
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8">
      <header className="flex items-center justify-between">
        <Image
          className="dark:invert"
          src="/tg-app.png"
          alt="Telegram App Logo"
          width={64}
          height={36}
          priority
        />
        <h1 className="text-2xl font-bold">Task Board — Group {groupId}</h1>
      </header>

      <main className="flex fle-col gap-8">
        <TaskForm groupId={groupId} />
        <TaskList groupId={groupId} />
      </main>

      <footer className="flex justify-center text-sm text-gray-500">
        Powered by Oseelabs
      </footer>
    </div>
  )
};
