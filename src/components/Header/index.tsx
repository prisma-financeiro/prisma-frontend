import React, { memo, useState } from 'react';
import history from '../../services/history';

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
import Typeahead from '../Typeahead';
import { search } from '../../services/search';
import { SearchResult } from '../../models';
import { debounce } from '../../utils/debounce';

const Header = () => {
  const { signOut } = useAuth();

  const handleNavigation = (route: string) => {
    history.push(`/${route}`);
  }

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
            <MenuItem key={key} onClick={() => handleNavigation(value.route)}>
              <Icon>{value.icon}</Icon>
              <p>{key}</p>
            </MenuItem>
          ))}
        </MenuItems>
        <AnimatedRightNav variants={NAVS_ANIMATION}>
          <Typeahead />
          <AccountDropdown />
        </AnimatedRightNav>
      </Wrapper>
    </AnimatedContainer>
  );
};

export default memo(Header);
