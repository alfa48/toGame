import React, { useState } from 'react';
import { Task, TaskState, UserProfile } from '../types';
import StarIcon from './icons/StarIcon';
import { truncate } from '../utils/text';
import { getDaysLeft } from '../utils/date';
import CreateMessageModal from './CreateMenssageModal'; // import do modal

interface TaskCardProps {
  task: Task;
  currentUser: UserProfile;
  onSelect: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, currentUser, onSelect, onComplete }) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const canSelect = task.state === TaskState.FREE && currentUser.score >= task.requiredScore;
  const isAssignedToCurrentUser = task.assignedTo === currentUser.uid;
  const canComplete = task.state === TaskState.BUILDING && isAssignedToCurrentUser;

  const stateConfig = {
    [TaskState.FREE]: { text: 'Disponível', color: 'is-primary' },
    [TaskState.BUILDING]: { text: 'Em Progresso', color: 'is-warning' },
    [TaskState.COMPLETED]: { text: 'Concluída', color: 'is-success' },
  };

  const difficultyStars = Array.from({ length: 4 }, (_, i) => (
    <StarIcon key={i} type={i < task.difficulty ? 'full' : 'empty'} />
  ));


  return (
    <div>
      <div className="nes-container is-dark with-title is-rounded flex flex-col h-full p-4 sm:p-3 min-w-[250px] max-w-[400px]">
        
        {/* Título truncado */}
        <p className="title truncate text-sm sm:text-base">
          {truncate(task.title, 10)}
        </p>

        <div className="flex-grow mt-2 flex flex-col">
          {/* Dificuldade e Estado */}
          <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
            <div className="flex items-center gap-1">{difficultyStars}</div>
            <span className="nes-badge">
              <span className={stateConfig[task.state].color}>{stateConfig[task.state].text}</span>
            </span>
          </div>

          {/* Descrição truncada e scroll para mobile */}
          <p className="text-sm text-gray-300 mb-4 max-h-[80px] sm:max-h-[100px] overflow-y-auto break-words">
            {task.description}
          </p>

          {/* Tags responsivas */}
          <div className="flex flex-wrap gap-1 mb-4">
            {task.tags.map(tag => (
              <a
                href="#"
                key={tag}
                className="nes-badge is-splited max-w-full sm:max-w-[120px] truncate"
              >
                <span className="is-dark">#</span>
                <span className="is-primary truncate">{tag}</span>
              </a>
            ))}
          </div>

          {/* Info de Score / Points / Deadline */}
          <div className="nes-container is-rounded is-dark !border-dashed !p-2 mb-4 text-xs flex flex-col gap-2">
            <div className="flex justify-between w-full">
              <span>Score player:</span> <span className="text-yellow-400">{task.requiredScore}</span>
            </div>

            <div className="flex justify-between w-full">
              <span>Reward:</span> <span className="text-green-400">{task.points} Pontos</span>
            </div>

            <div className="flex justify-between w-full">
              <span>Prazo:</span> 
              <span className="text-red-500">{getDaysLeft(task.deadline)} dias</span>
            </div>

            {task.assignedToName && (
              <div
                className="flex justify-between w-full cursor-pointer"
                onClick={() => setIsMessageOpen(true)}
              >
                <span>Jogador:</span>
                <span className="text-blue-400 truncate">{task.assignedToName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Botões responsivos */}
        <div className="mt-4 sm:mt-auto flex flex-col gap-2">
          {canSelect && (
            <button type="button" className="nes-btn is-success w-full" onClick={() => onSelect(task.id)}>
              Iniciar Missão
            </button>
          )}
          {canComplete && (
            <button type="button" className="nes-btn is-primary w-full" onClick={() => onComplete(task.id)}>
              Concluir Missão
            </button>
          )}
          {task.state === TaskState.COMPLETED && (
            <button type="button" className="nes-btn is-disabled w-full" disabled>
              Concluída
            </button>
          )}
          {task.state === TaskState.BUILDING && !isAssignedToCurrentUser && (
            <button type="button" className="nes-btn is-disabled w-full" disabled>
              Em Progresso
            </button>
          )}
        </div>
      </div>

      {/* Modal de mensagem */}
      <CreateMessageModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
      />
    </div>
  );
};

export default TaskCard;
