import React, { memo, useState } from 'react';
import history from '../../services/history';

import { TOP_NAVIGATION } from '../../constants';

import { FiSearch } from 'react-icons/fi';
import AccountDropdown from './AccountDropdown';
import Typeahead from '../Typeahead';
import Modal from '../Modal';
import { CONTAINER_ANIMATION, NAVS_ANIMATION } from './animations';

import { useBreakpoints } from '../../hooks/useBreakpoints';

import { PrismaLogo } from '../../assets';

import {
  AnimatedContainer,
  Wrapper,
  AnimatedLeftNav,
  AnimatedRightNav,
  MenuItems,
  MenuItem,
  Icon,
  Logo
} from './styles';

const Header = () => {

  history.listen( () => handleCloseModal());

  const device = useBreakpoints();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const handleNavigation = (route: string) => {
    history.push(`${route}`);
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
          <Logo>
            <PrismaLogo onClick={() => handleNavigation('/home')}/>
            Prisma
          </Logo>
        </AnimatedLeftNav>
        <MenuItems>
          {Object.entries(TOP_NAVIGATION).map(([key, value]) => (
            <MenuItem key={key} onClick={() => handleNavigation(value.route)}>
              <Icon>{value.icon}</Icon>
              <p>{key}</p>
            </MenuItem>
          ))}
          {device.isMobile && (
            <MenuItem key="search-icon" onClick={() => handleShowModal()}>
              <Icon>
                <FiSearch/>
              </Icon>
            </MenuItem>
          )}
        </MenuItems>
        <AnimatedRightNav>
          { !device.isMobile && (
            <Typeahead redirect={true}/>
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