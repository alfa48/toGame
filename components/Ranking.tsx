import React, { useState } from 'react';
import { UserProfile } from '../types';
import CreateMessageModal from './CreateMenssageModal'; // import do modal


interface RankingProps {
  users: UserProfile[];
}


const Ranking: React.FC<RankingProps> = ({ users }) => {

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const getTrophyIcon = (index: number) => {
    if (index === 0) return <i className="nes-icon trophy is-small"></i>;
    if (index === 1) return <i className="nes-icon star is-small"></i>; // Silver-like
    if (index === 2) return <i className="nes-icon coin is-small"></i>; // Bronze-like
    return <span>{index + 1}</span>;
  }

  return (
    <div className="nes-container is-dark with-title">
      <p className="title">Ranking</p>
      <div className="nes-table-responsive">
        <table className="nes-table is-bordered is-dark w-full text-sm">
          <thead>
            <tr>
              <th className="w-[10%]">#</th>
              <th className="w-[60%]">Player</th>
              <th className="w-[30%] text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {users.sort((a, b) => b.score - a.score)  // maior score primeiro
              .slice(0, 3).map((user, index) => (
                <tr key={user.uid}>
                  <td className="text-center">{getTrophyIcon(index)}</td>
                  <td className="flex items-center gap-2">
                    <img src={user.photoURL} alt={user.displayName} className="nes-avatar is-small" style={{ imageRendering: 'pixelated' }} />

                    <span
                      className="truncate cursor-pointer nes-text is-primary hover:underline"
                      onClick={() => {
                        setSelectedUser(user);        // guarda o usuário
                        setIsUserModalOpen(true);     // abre o modal
                      }}
                    >
                      {user.displayName}
                    </span>


                  </td>
                  <td className="text-right truncate">{user.score}</td>
                </tr>
              ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center">No players yet!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <CreateMessageModal
          currentUser={selectedUser}
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
        />
      )}

    </div>
  );
};

export default Ranking;