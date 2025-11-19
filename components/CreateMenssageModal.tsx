import React from 'react';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  totalMessages: number;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onClose, userName, totalMessages }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-2 sm:p-4">
      <div className="bg-[#212529] rounded-lg shadow-lg w-full max-w-md sm:max-w-lg p-4 flex flex-col">
        <h2 className="text-lg sm:text-xl text-center mb-4 font-bold">Informações do Jogador</h2>

        <section className="message -right">
          <div className="nes-balloon from-right is-dark">
            <p>Olá, eu sou {userName}!</p>
          </div>
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
