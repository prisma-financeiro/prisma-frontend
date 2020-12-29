import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface PeriodProps {
  isPeriodSelected: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const PeriodItem = styled(motion.div)`
  ${({ theme }) => css`
    margin-left: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: ${theme.radio.small};
    background-color: ${(props: PeriodProps) => props.isPeriodSelected ? theme.colors.primary : 'none'};
    color: ${(props: PeriodProps) => props.isPeriodSelected ? theme.colors.background : 'none'};
    text-align: center;
    font-size: ${theme.fontSizes.small};

    :hover {
      background-color: ${(props: PeriodProps) => props.isPeriodSelected ? theme.colors.primary : theme.colors.secondary};
      color: ${theme.colors.background};
    }
  `};
`;
