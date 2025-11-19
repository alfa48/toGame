import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onLogout: () => void;
  onCreateTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onCreateTask }) => {
  const canCreateTask = user.score >= 42;

  return (
    <header className="bg-[#212529] p-4 sticky top-0 z-10 border-b-4 border-gray-700 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Logo */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl text-white truncate">toGame</h1>
        </div>

        {/* Player info */}
        <div className="flex items-center gap-3 order-last sm:order-none">
          <div className="text-right">
            <p className="text-white text-sm truncate">{user.displayName}</p>
            <p className="text-yellow-400 text-xs">Score: {user.score}</p>
          </div>
          <img 
            src={user.photoURL} 
            alt="user avatar" 
            className="nes-avatar is-medium is-rounded" 
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-end w-full sm:w-auto">
          {canCreateTask && (
            <button 
              type="button" 
              className="nes-btn is-primary"
              onClick={onCreateTask}
            >
              Nova missão
            </button>
          )}
          <button 
            type="button" 
            className="nes-btn is-error"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;