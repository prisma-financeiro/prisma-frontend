import React, { memo } from 'react';

import { AnimatedContainer, MenuItems, MenuItem, Icon } from './styles';
import { GRADIENT_ANIMATION } from './animations';
import { TOP_NAVIGATION } from '../../../constants';

const Gradient = () => (
  <AnimatedContainer
    variants={GRADIENT_ANIMATION}
    initial="unMounted"
    animate="mounted"
  >
    <MenuItems>
      {Object.entries(TOP_NAVIGATION).map(([key, value]) => (
        <MenuItem>
        <Icon>{value.icon}</Icon>
        {key}
        </MenuItem>
      ))}
    </MenuItems>
  </AnimatedContainer>
);
export default memo(Gradient);
