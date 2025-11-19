import React from 'react';
import { UserProfile } from '../types';

interface RankingProps {
  users: UserProfile[];
}

const Ranking: React.FC<RankingProps> = ({ users }) => {
  const getTrophyIcon = (index: number) => {
    if (index === 0) return <i className="nes-icon trophy is-small"></i>;
    if (index === 1) return <i className="nes-icon trophy is-small is-transparent"></i>; // Silver-like
    if (index === 2) return <i className="nes-icon star is-small"></i>; // Bronze-like
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
            {users.map((user, index) => (
              <tr key={user.uid}>
                <td className="text-center">{getTrophyIcon(index)}</td>
                <td className="flex items-center gap-2">
                  <img src={user.photoURL} alt={user.displayName} className="nes-avatar is-small" style={{imageRendering: 'pixelated'}} />
                  <span className="truncate">{user.displayName}</span>
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
    </div>
  );
};

export default Ranking;