
import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="nes-container is-dark with-title is-centered max-w-lg w-full">
        <p className="title text-2xl md:text-3xl">toGame</p>
        <p className="text-white my-6">Gamify your learning journey.</p>
        <div className="flex flex-col items-center space-y-4">
            <i className="nes-logo"></i>
            <i className="nes-jp-logo"></i>
        </div>
        
        <p className="text-sm my-8 text-gray-400">Login via Google to join the game.</p>
        
        <button type="button" className="nes-btn is-success w-full" onClick={onLogin}>
          <i className="nes-icon google is-small"></i>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
