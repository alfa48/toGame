import React from 'react';
import { UserProfile } from '../types';
import '../public/style/nes-fix.css';


interface UserInfoModalProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  totalMessages: number;
}


const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onClose, currentUser }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-2 sm:p-4">
      <div className="nes-dialog is-rounded bg-[#212529] rounded-lg shadow-lg w-full max-w-md sm:max-w-lg p-4 flex flex-col">
        <h2 className="text-lg sm:text-xl text-center mb-4 font-bold">arquivo do player</h2>

        <section className="message -right">
          <div className="nes-balloon from-right is-dark">
            <p className="text-white text-sm truncate">Olá, eu sou {currentUser.displayName}</p>
            <p> meu score: <span className='text-yellow-400 text-xs'>{currentUser.score}</span></p>
          </div>
           <img 
            src={currentUser.photoURL} 
            alt="user avatar" 
            className="nes-avatar is-medium is-rounded" 
            style={{ imageRendering: 'pixelated' }}
          />
        </section>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="nes-btn is-error"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
