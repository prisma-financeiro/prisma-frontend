import React, { useState, useRef, useCallback } from 'react';

import { useTheme } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { FiLogOut, FiUser } from 'react-icons/fi';

import { Container, AnimatedDropdown, NavButton } from './styles';
import { DROP_DOWN_ANIMATION } from './animations';

import useEventListener from '../../../hooks/useEventListener';
import { removeHashFromColor } from '../../../utils';
import useAppTheme from '../../../contexts/theme';
import useAuth from '../../../contexts/auth';
import { signOut as apiSignOut } from "../../../services/login";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { Creators } from '../../../store/ducks/application';

const AccountDropdown = () => {

  const dispatch = useDispatch();
  
  const { currentTheme, toggleTheme } = useAppTheme();
  const { darkGrey, secondary } = useTheme().colors;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();

  const handleDropdownVisibility = (): void => {
    setIsDropdownVisible(true);
  };

  const handleSignOut = (): void => {
    apiSignOut().then(() => {
      signOut();
      toast.success("Logout efetuado com sucesso.");
      dispatch(Creators.navigate('/'));
    })
  };

  const handleCloseDropdown = useCallback(
    ({ target }: Event): void => {
      if (dropdownRef.current?.contains(target as Node)) {
        return;
      }

      setIsDropdownVisible(false);
    },
    [setIsDropdownVisible],
  );

  const navigateToProfile = () => {
    dispatch(Creators.navigate('/profile'));
  }

  useEventListener('click', handleCloseDropdown, {
    enabled: isDropdownVisible,
  });

  return (
    <Container onClick={handleDropdownVisibility}>
      <img
        src={`https://ui-avatars.com/api/?rounded=true&format=svg&background=${removeHashFromColor(
          darkGrey,
        )}&color=${removeHashFromColor(secondary)}&name=Daniel`}
        alt={`Conta de Daniel`}
      />

      <AnimatePresence>
        {isDropdownVisible && (
          <AnimatedDropdown
            variants={DROP_DOWN_ANIMATION}
            initial="hidden"
            animate="visible"
            exit="hidden"
            ref={dropdownRef}
          >
            <ul>
              {/* //todo: include better light-mode colors 
              <NavButton onClick={toggleTheme}>
                {currentTheme === 'light' ? <FiMoon /> : <FiSun />}
                Alterar Tema
              </NavButton> */}
              <NavButton onClick={navigateToProfile}>
                <FiUser />
                Meu Perfil
              </NavButton>
              <NavButton onClick={handleSignOut}>
                <FiLogOut />
                Sair da Conta
              </NavButton>
            </ul>
          </AnimatedDropdown>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default AccountDropdown;
