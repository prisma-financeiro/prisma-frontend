import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface ContainerProps {
  backgroundDarker: boolean,
  roundedCorners: boolean
}

export const Container = styled(motion.div)<ContainerProps>`
  ${({ theme, backgroundDarker, roundedCorners }) => css`
    position: relative;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${backgroundDarker ? theme.colors.background : theme.colors.darkGrey};
    width: 19rem;
    height: 15rem;
    border-radius: ${roundedCorners ? '5px' : 'none'};

    @media (max-width: ${theme.deviceWidth.mobile}) {
      width: 100%;
      height: 6rem;
      flex-direction: row;      
    }
  `}
`;

export const ButtonContent = styled.button<{backgroundDarker: boolean}>`
  ${({ theme, backgroundDarker }) => css`
      height: 100%;
      border-radius: ${theme.radio.default};
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      background-color: ${backgroundDarker ? theme.colors.background : theme.colors.darkGrey };
      font-size: ${theme.fontSizes.large};
      border-style: dotted;
      border-width: 0.1rem;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: ${theme.deviceWidth.mobile}) {
        width: 100%;
      }
  `} 
`

export const CloseButton = styled(motion.button)`
  ${({ theme }) => css`
      position: absolute;
      right: 1rem;
      top: 1rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: ${theme.colors.greyLowerOpacity};
      color: ${theme.colors.lightGrey};
      opacity: 0.5;
      font-size: ${theme.fontSizes.small};
      padding-bottom: 3px;
  `}
`