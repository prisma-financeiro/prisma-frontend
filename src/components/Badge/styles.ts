import styled, { css } from 'styled-components';

interface BadgeProps {
  backgroundColor: string;
  color: string;
  fontSize: string;
}

export const Container = styled.div<BadgeProps>`
  ${({ theme }) => css`
    background-color: ${(props: BadgeProps) => props.backgroundColor};  
    font-size: ${(props: BadgeProps) => props.fontSize}; 
    color: ${(props: BadgeProps) => props.color};  
    border-radius: ${theme.radio.small};
    padding: 0.5rem;
  `}
`;
