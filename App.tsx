import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useData } from './hooks/useData';
import Login from './components/Login';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Ranking from './components/Ranking';
import CreateTaskModal from './components/CreateTaskModal';

const App: React.FC = () => {
  const { currentUser, loading: authLoading, login, logout } = useAuth();
  const { tasks, users, loading: dataLoading, addTask, assignTask, finishTask } = useData(currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const isLoading = authLoading || (currentUser && dataLoading);



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#212529] p-4 text-center">
        <p className="mb-4">Loading...</p>
        <progress className="nes-progress is-primary" max="100"></progress>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-[#212529] text-white relative">
      <Header 
        user={currentUser} 
        onLogout={logout} 
        onCreateTask={() => setIsModalOpen(true)}
      />
      <main className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-1/4 order-1 lg:order-2 space-y-6">
             <section aria-labelledby="ranking-heading">
                <h2 id="ranking-heading" className="text-xl md:text-2xl mb-4 text-center sm:text-left">Top Players</h2>
                <Ranking users={users} />
            </section>
          </div>

          <div className="w-full lg:w-3/4 order-2 lg:order-1 space-y-6">
             <section aria-labelledby="quests-heading">
                <h2 id="quests-heading" className="text-xl md:text-2xl mb-4 text-center sm:text-left">Quests Board</h2>
                <TaskList 
                    tasks={tasks} 
                    currentUser={currentUser} 
                    onSelectTask={assignTask}
                    onCompleteTask={finishTask}
                />
            </section>
          </div>

        </div>
      </main>

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={addTask}
      />

      {/* Botão Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="nes-btn is-primary fixed bottom-6 right-6 z-50"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default App;
