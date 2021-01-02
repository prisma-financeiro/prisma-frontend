import React, { memo, useState, useEffect } from 'react';
import history from '../../services/history';

import {
  AnimatedContainer,
  Wrapper,
  AnimatedLeftNav,
  AnimatedRightNav,
  MenuItems,
  MenuItem,
  Icon,
  IconContainer
} from './styles';
import AccountDropdown from './AccountDropdown';
import { CONTAINER_ANIMATION, NAVS_ANIMATION } from './animations';
import { TOP_NAVIGATION } from '../../constants';

import useAuth from '../../contexts/auth';
import Typeahead from '../Typeahead';
import { FiSearch } from 'react-icons/fi';
import Modal from '../Modal';

const Header = () => {

  history.listen( () => handleCloseModal());

  const { signOut } = useAuth();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const handleNavigation = (route: string) => {
    history.push(`/${route}`);
  }

  const handleShowModal = () => {
    setIsSearchModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsSearchModalOpen(false);
  }

  const handleModalConfirmed = () => {
    setIsSearchModalOpen(false);
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
          {window.innerWidth > 670 ? (
            //replace window.innerwidth with isMobile
            <Typeahead redirect={true}/>
          ): (
            <IconContainer>
              <FiSearch onClick={handleShowModal}/>
            </IconContainer>
          )}
          <AccountDropdown />
        </AnimatedRightNav>
      </Wrapper>
      <Modal
        title="Encontre um ativo"
        show={isSearchModalOpen}
        showButtons={false}
        modalClosed={handleCloseModal}
        modalConfirmed={handleModalConfirmed}>
        <Typeahead redirect={true}/>
      </Modal>
    </AnimatedContainer>
  );
};

export default memo(Header);