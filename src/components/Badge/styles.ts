import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface BadgeProps {
  backgroundColor: string;
  color: string;
  fontSize: string;
}

export const Container = styled.div<BadgeProps>`
  ${({ theme }) => css`
    position: relative;
    background-color: ${(props: BadgeProps) => props.backgroundColor};  
    font-size: ${(props: BadgeProps) => props.fontSize}; 
    color: ${(props: BadgeProps) => props.color};  
    border-radius: ${theme.radio.small};
    padding: 0.5rem;
  `}
`;

export const RemoveButton = styled(motion.button)`
  ${({ theme }) => css`
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      top: -0.5rem;
      right: -0.5rem;
      background-color: ${theme.colors.danger};
      color: ${theme.colors.color4};
      font-size: ${theme.fontSizes.tiny};
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
  `}
`