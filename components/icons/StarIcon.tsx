
import React from 'react';

interface StarIconProps {
  type: 'full' | 'half' | 'empty';
}

const StarIcon: React.FC<StarIconProps> = ({ type }) => {
  const className = `nes-icon star ${type === 'half' ? 'is-half' : ''} ${type === 'empty' ? 'is-empty' : ''}`;
  return <i className={className}></i>;
};

export default StarIcon;
