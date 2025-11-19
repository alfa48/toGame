import React from 'react';
import { Task, UserProfile } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  currentUser: UserProfile;
  onSelectTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, currentUser, onSelectTask, onCompleteTask }) => {
  console.log("Rendering TaskList with tasks:", tasks);
  if (!tasks.length) {
    console.log("No tasks to display");
    return (
      <div className="flex justify-center items-center h-64">
        <div className="nes-container is-dark is-centered p-4 text-center">
          <p className="text-sm sm:text-base">No quests available. Create one to begin!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          currentUser={currentUser}
          onSelect={onSelectTask}
          onComplete={onCompleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
