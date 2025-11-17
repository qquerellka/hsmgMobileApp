import React from 'react';
import { SvgProps } from 'react-native-svg';

import ProfileIcon from '../../assets/icons/navProfileIcon.svg';
import BurgerIcon from '../../assets/icons/navBurderIcon.svg';
import CloseIcon from '../../assets/icons/closeBurgerIcon.svg';
import LinkIcon from '../../assets/icons/linkIcon.svg';
import TgIcon from "../../assets/icons/tgIcon.svg";

import { theme } from '@shared/config/theme';

const ICONS = {
  profile: ProfileIcon,
  burger: BurgerIcon,
  close: CloseIcon,
  link: LinkIcon,
  tg: TgIcon
} as const;

export type IconName = keyof typeof ICONS;

export type UIIconProps = {
  name: IconName;
  size?: number;
  color?: string;
} & Omit<SvgProps, 'width' | 'height'>;

export const UIIcon: React.FC<UIIconProps> = ({
  name,
  size = 24,
  color = theme.palette.white,
  ...rest
}) => {
  const IconComponent = ICONS[name];

  return (
    <IconComponent
      width={size}
      height={size}
      fill={color}
      color={color}
      {...rest}
    />
  );
};
