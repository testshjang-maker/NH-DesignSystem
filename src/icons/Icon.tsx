import React from 'react';

import Icons from './Icons';
import Icons10 from './Icons10';
import Icons12 from './Icons12';
import Icons14 from './Icons14';
import Icons16 from './Icons16';
import Icons18 from './Icons18';
import Icons20 from './Icons20';
import Icons24 from './Icons24';
import Icons32 from './Icons32';
import Icons40 from './Icons40';
import Icons48 from './Icons48';
import Icons80 from './Icons80';

const allIcons = {
  ...Icons,
  ...Icons10,
  ...Icons12,
  ...Icons14,
  ...Icons16,
  ...Icons18,
  ...Icons20,
  ...Icons24,
  ...Icons32,
  ...Icons40,
  ...Icons48,
  ...Icons80,
};

export type IconName = keyof typeof allIcons;

export interface IconProps {
  name: IconName;
  color?: string;
  strokeColor?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  rotate?: number;
  spin?: boolean;
  transition?: number;
}

const spinKeyframes = `
  @keyframes icon-spin {
    100% { transform: rotate(360deg); }
  }
`;

const Icon = ({
  name,
  color,
  strokeColor,
  style,
  onClick,
  className,
  rotate,
  spin,
  transition = 0.2,
}: IconProps) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    height: 'fit-content',
    cursor: onClick ? 'pointer' : undefined,
    ...style,
  };

  return (
    <>
      {spin && <style>{spinKeyframes}</style>}
      <div
        className={className}
        onClick={onClick}
        style={containerStyle}
        data-icon={name}
      >
        <span
          style={{
            display: 'flex',
            color: color,
            transition: `${transition}s`,
            transform: rotate ? `rotate(${rotate}deg)` : undefined,
            animation: spin ? 'icon-spin 1000ms infinite linear' : undefined,
          }}
        >
          {allIcons[name]}
        </span>
      </div>
    </>
  );
};

export default React.memo(Icon);
