import React from 'react';

interface CurtainTransitionProps {
  curtainState: 'idle' | 'up' | 'down';
  color?: string;
}

export const CurtainTransition: React.FC<CurtainTransitionProps> = ({
  curtainState,
  color = '#b64232'
}) => {
  if (curtainState === 'idle') return null;

  return (
    <div
      aria-hidden="true"
      className={`cinematic-curtain ${curtainState === 'up' ? 'sweep-up' : 'sweep-down'}`}
      style={{
        backgroundColor: color
      }}
    />
  );
};
