import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AnimatedContainer = styled(motion.aside)`
  width: 100%;
  height: 6.4rem;
  align-self: flex-start;
  position: absolute;
  top: 100%;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%);`};
`;

export const MenuItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;  
  align-items: center;
  height: 100%;  
  color: ${({ theme }) => theme.colors.background}; 
`;

export const MenuItem = styled.div`
  margin-right: 5rem;
  margin-left: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  :hover {
    color: ${({ theme }) => theme.colors.darkGrey};
    cursor: pointer;
    border-bottom: 0.3rem solid ${({ theme }) => theme.colors.darkGrey};
  }  
`;

export const Icon = styled.div`
  font-size: 24px;
`;