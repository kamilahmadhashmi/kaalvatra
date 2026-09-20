import React from 'react';

interface ArchitecturalMotifProps {
  motif: 'taj' | 'gateway' | 'peaks' | 'fort' | 'temple' | 'minarets' | 'arch' | 'coast' | string;
  className?: string;
  color?: string;
}

export const ArchitecturalMotif: React.FC<ArchitecturalMotifProps> = ({
  motif,
  className = 'w-32 h-32',
  color = 'currentColor'
}) => {
  const strokeColor = color;
  const fillColor = 'none';

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} motif-animated`}
      fill={fillColor}
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {motif === 'taj' && (
        <g strokeWidth="1.4">
          <rect x="6" y="80" width="88" height="5" strokeWidth="1.2" />
          {[13, 25, 71, 83].map((x) => (
            <g key={x}>
              <rect x={x} y="40" width="3.4" height="40" strokeWidth="1" />
              <circle cx={x + 1.7} cy="39" r="2.2" fill={strokeColor} fillOpacity="0.2" />
            </g>
          ))}
          <path d="M37,46 C31,37 33,26 50,11 C67,26 69,37 63,46 Z" strokeWidth="1.6" fill={strokeColor} fillOpacity="0.1" />
          <line x1="50" y1="11" x2="50" y2="4" strokeWidth="1.6" />
          <circle cx="50" cy="3" r="1.5" fill={strokeColor} />
          <path d="M43,80 L43,57 A7,7 0 0 1 57,57 L57,80 Z" strokeWidth="1.4" />
          <line x1="0" y1="88" x2="100" y2="88" strokeWidth="1.4" strokeOpacity="0.4" />
          <line x1="6" y1="93" x2="100" y2="93" strokeWidth="1.4" strokeOpacity="0.3" />
        </g>
      )}

      {motif === 'gateway' && (
        <g strokeWidth="1.4">
          <rect x="6" y="78" width="88" height="6" strokeWidth="1.2" />
          <rect x="17" y="40" width="9" height="38" strokeWidth="1.2" />
          <rect x="74" y="40" width="9" height="38" strokeWidth="1.2" />
          <rect x="26" y="36" width="48" height="42" strokeWidth="1.4" />
          <rect x="22" y="30" width="56" height="7" strokeWidth="1.2" />
          <path d="M37,78 L37,52 A13,13 0 0 1 63,52 L63,78 Z" strokeWidth="1.6" />
          <line x1="50" y1="30" x2="50" y2="19" strokeWidth="1.6" />
          <circle cx="50" cy="18" r="1.6" fill={strokeColor} />
          <line x1="0" y1="88" x2="100" y2="88" strokeWidth="1.4" strokeOpacity="0.4" />
        </g>
      )}

      {motif === 'peaks' && (
        <g strokeWidth="1.4">
          <path d="M0,80 L14,48 L26,64 L40,34 L54,60 L68,42 L82,64 L100,40 L100,80 Z" strokeWidth="1.6" fill={strokeColor} fillOpacity="0.1" />
          <path d="M0,80 L20,56 L34,70 L50,28 L64,58 L78,46 L94,72 L100,68 L100,80 Z" strokeWidth="1.2" />
          <line x1="50" y1="28" x2="50" y2="14" strokeWidth="1.4" />
          <path d="M50,16 C60,17 66,21 76,21" strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="0" y1="88" x2="100" y2="88" strokeWidth="1.4" strokeOpacity="0.4" />
        </g>
      )}

      {motif === 'fort' && (
        <g strokeWidth="1.4">
          <path d="M0,86 C18,80 24,62 50,60 C76,62 82,80 100,86 Z" strokeWidth="1.4" fill={strokeColor} fillOpacity="0.08" />
          <rect x="24" y="46" width="52" height="38" strokeWidth="1.4" />
          {[25, 33, 41, 49, 57, 65].map((x) => (
            <rect key={x} x={x} y="42" width="5" height="4" strokeWidth="1" />
          ))}
          <path d="M44,84 L44,53 A6,6 0 0 1 56,53 L56,84 Z" strokeWidth="1.4" />
          <line x1="0" y1="90" x2="100" y2="90" strokeWidth="1.4" strokeOpacity="0.4" />
        </g>
      )}

      {motif === 'temple' && (
        <g strokeWidth="1.4">
          <rect x="6" y="80" width="88" height="5" strokeWidth="1.2" />
          <path d="M32,70 L38,28 L62,28 L68,70 Z" strokeWidth="1.6" fill={strokeColor} fillOpacity="0.1" />
          <line x1="34" y1="58" x2="66" y2="58" strokeWidth="1.2" />
          <line x1="36" y1="48" x2="64" y2="48" strokeWidth="1.2" />
          <line x1="38" y1="38" x2="62" y2="38" strokeWidth="1.2" />
          <circle cx="50" cy="22" r="2.5" fill={strokeColor} />
          <path d="M44,80 L44,56 A6,6 0 0 1 56,56 L56,80 Z" strokeWidth="1.4" />
          <line x1="0" y1="88" x2="100" y2="88" strokeWidth="1.4" strokeOpacity="0.4" />
        </g>
      )}

      {motif === 'minarets' && (
        <g strokeWidth="1.4">
          <rect x="8" y="80" width="84" height="5" strokeWidth="1.2" />
          <rect x="26" y="32" width="5" height="48" strokeWidth="1.2" />
          <rect x="69" y="32" width="5" height="48" strokeWidth="1.2" />
          <rect x="22" y="46" width="56" height="34" strokeWidth="1.4" />
          <path d="M38,80 L38,58 A12,12 0 0 1 62,58 L62,80 Z" strokeWidth="1.6" />
          <line x1="0" y1="88" x2="100" y2="88" strokeWidth="1.4" strokeOpacity="0.4" />
        </g>
      )}

      {motif === 'arch' && (
        <g strokeWidth="1.4">
          <rect x="10" y="80" width="80" height="5" strokeWidth="1.2" />
          <rect x="28" y="30" width="44" height="50" strokeWidth="1.6" />
          <rect x="24" y="23" width="52" height="8" strokeWidth="1.2" />
          <path d="M40,80 L40,50 A10,10 0 0 1 60,50 L60,80 Z" strokeWidth="1.8" />
          <line x1="50" y1="15" x2="50" y2="8" strokeWidth="1.6" />
          <circle cx="50" cy="7" r="1.5" fill={strokeColor} />
          <line x1="0" y1="88" x2="100" y2="88" strokeWidth="1.4" strokeOpacity="0.4" />
        </g>
      )}

      {motif === 'coast' && (
        <g strokeWidth="1.4">
          <path d="M17,80 C14,62 14,50 19,36" strokeWidth="2.5" />
          <path d="M19,36 C9,28 3,32 0,39" strokeWidth="1.8" />
          <path d="M19,36 C29,26 37,29 41,36" strokeWidth="1.8" />
          <path d="M19,36 C14,24 18,17 26,14" strokeWidth="1.8" />
          <path d="M30,74 L70,74 L64,82 L36,82 Z" strokeWidth="1.6" fill={strokeColor} fillOpacity="0.15" />
          <line x1="52" y1="74" x2="52" y2="48" strokeWidth="1.8" />
          <line x1="0" y1="88" x2="100" y2="88" strokeWidth="1.4" strokeOpacity="0.4" />
        </g>
      )}
    </svg>
  );
};
