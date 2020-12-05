import React, { memo } from 'react';

import {
  AnimatedContainer,
  Wrapper,
  AnimatedLeftNav,
  AnimatedRightNav,
  MenuItems,
  MenuItem,
  Icon,
} from './styles';
import AccountDropdown from './AccountDropdown';
import { CONTAINER_ANIMATION, NAVS_ANIMATION } from './animations';
import { TOP_NAVIGATION } from '../../constants';

import useAuth from '../../contexts/auth';
import Input from '../Input';

const Header = () => {
  const { signOut } = useAuth();

  return (
    <AnimatedContainer
      variants={CONTAINER_ANIMATION}
      initial="unMounted"
      animate="mounted"
      exit="unMounted"
    >
      <Wrapper>
        <AnimatedLeftNav variants={NAVS_ANIMATION}>
        </AnimatedLeftNav>
        <MenuItems>
          {Object.entries(TOP_NAVIGATION).map(([key, value]) => (
            <MenuItem>
              <Icon>{value.icon}</Icon>
              <p>{key}</p>
            </MenuItem>
          ))}
        </MenuItems>
        <AnimatedRightNav variants={NAVS_ANIMATION}>
          <div>
            <Input  showIcon={true} placeholder="Ação, Empresa, Índice"/>
          </div>
          <AccountDropdown />
        </AnimatedRightNav>
      </Wrapper>
    </AnimatedContainer>
  );
};

export default memo(Header);
