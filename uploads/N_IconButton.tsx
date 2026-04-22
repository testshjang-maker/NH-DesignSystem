import React from 'react';

import styled, { css } from 'styled-components';

import Color from '@src/components/color/Color';
import { BackgroundColor } from '@src/components/color/NeutralColorTokens';
import { IconName } from '@src/components/icon/Icon';
import Icons from '@src/components/icon/svg/Icons';

export type IconSize = 20 | 24 | 28 | 32 | 36 | 40;
export type Icon = IconName;

// 사이즈별 border-radius 매핑 (Figma 기준)
// 20, 24, 28, 32 → 4px / 36 → 6px / 40 → 8px
const borderRadiusMap: Record<IconSize, number> = {
  20: 4,
  24: 4,
  28: 4,
  32: 4,
  36: 6,
  40: 8,
};

// 사이즈별 내부 아이콘 사이즈 매핑 (Figma 기준)
// 20, 24 → 12px / 28 → 14px / 32 → 18px / 36 → 20px / 40 → 24px
const iconSizeMap: Record<IconSize, number> = {
  20: 12,
  24: 12,
  28: 14,
  32: 18,
  36: 20,
  40: 24,
};

const buttonShapeMap = {
  lightMode: {
    borderless: css`
      background: transparent;
      path {
        fill: ${Color.GRAY_8};
      }

      :hover {
        background: ${Color.HoverOpacity_1};
      }

      :disabled {
        path {
          fill: ${Color.GRAY_4};
        }
      }
    `,
    border: css`
      background: ${BackgroundColor.BackgroundPrimary};
      border: 1px solid ${Color.GRAY_3};
      path {
        fill: ${Color.GRAY_8};
      }

      :hover {
        background: ${Color.HoverOpacity_1};
      }

      :disabled {
        path {
          fill: ${Color.GRAY_4};
        }
      }
    `,
    filled: css`
      background: ${Color.GRAY_9};
      path {
        fill: ${Color.WHITE};
      }

      :hover {
        background: ${Color.GRAY_10};
      }

      :disabled {
        background: ${Color.GRAY_4};

        path {
          fill: ${Color.WHITE};
        }
      }
    `,
  },
  darkMode: {
    borderless: css`
      background: transparent;
      path {
        fill: ${Color.WHITE};
      }

      :hover {
        background: ${Color.Overlay_30};
      }

      :disabled {
        path {
          fill: ${Color.GRAY_5};
        }
      }
    `,
    border: css`
      background: transparent;
      border: 1px solid ${Color.GRAY_6};
      path {
        fill: ${Color.WHITE};
      }

      :hover {
        background: ${Color.Overlay_30};
      }

      :disabled {
        path {
          fill: ${Color.GRAY_5};
        }
      }
    `,
    filled: css`
      background: ${Color.GRAY_9};
      path {
        fill: ${Color.WHITE};
      }

      :hover {
        background: ${Color.GRAY_10};
      }

      :disabled {
        background: ${Color.GRAY_4};

        path {
          fill: ${Color.WHITE};
        }
      }
    `,
  },
};

const Container = styled.button<{
  $size: IconSize;
  $shape: keyof (typeof buttonShapeMap)['lightMode'];
  $buttonBackground?: string;
  $hoverBackground?: string;
  $iconColor?: string;
  $hoverColor?: string;
  $rotate?: number;
  disabled?: boolean;
  $spin?: boolean;
  $mode: keyof typeof buttonShapeMap;
}>`
  display: flex;
  align-items: center;
  padding: 0;
  justify-content: center;
  outline: none;
  box-shadow: none;
  white-space: nowrap;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ $size }) => $size}px;
  min-width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  min-height: ${({ $size }) => $size}px;
  transition: 0.2s;
  border-radius: ${({ $size }) => borderRadiusMap[$size]}px;

  ${(props) => buttonShapeMap[props.$mode][props.$shape]};

  ${({ disabled, $hoverBackground, $hoverColor }) =>
    !disabled &&
    css`
      :hover {
        background: ${$hoverBackground};

        path {
          fill: ${$hoverColor};
        }
      }
    `}

  background: ${(props) => (props.$buttonBackground ? props.$buttonBackground : undefined)};

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  path {
    fill: ${({ $iconColor }) => $iconColor};
  }

  svg {
    width: ${({ $size }) => iconSizeMap[$size]}px;
    height: ${({ $size }) => iconSizeMap[$size]}px;
    animation: ${(props) => props.$spin && 'spin 1000ms infinite linear'};
    transition: 0.2s;
    transform: ${(props) => props.$rotate && `rotate(${props.$rotate}deg);`};
  }
`;

interface Props {
  size: IconSize;
  type?: keyof (typeof buttonShapeMap)['lightMode'];
  style?: React.CSSProperties;
  icon: Icon;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  buttonBackground?: string;
  hoverBackground?: string;
  hoverColor?: string;
  iconColor?: string;
  rotate?: number;
  id?: string;
  className?: string;
  tabIndex?: number;
  spin?: boolean;
  mode?: keyof typeof buttonShapeMap;
}

const N_IconButton = ({
  size,
  type = 'borderless',
  style,
  icon,
  onClick,
  disabled,
  buttonBackground,
  hoverBackground,
  iconColor,
  hoverColor,
  rotate,
  id,
  className,
  tabIndex,
  onMouseEnter,
  onMouseLeave,
  spin,
  mode = 'lightMode',
}: Props) => {
  return (
    <Container
      $size={size}
      style={style}
      $shape={type}
      disabled={disabled}
      $hoverBackground={hoverBackground}
      onClick={onClick}
      $iconColor={iconColor}
      $hoverColor={hoverColor}
      $rotate={rotate}
      id={id}
      className={className}
      $buttonBackground={buttonBackground}
      tabIndex={tabIndex}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      $spin={spin}
      $mode={mode}
    >
      {Icons[icon]}
    </Container>
  );
};

export default React.memo(N_IconButton);
