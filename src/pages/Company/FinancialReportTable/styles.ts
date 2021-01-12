import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface TableHeaderProps {
  alignLeft: boolean
}

export const AnimatedCard = styled(motion.article)`
  ${({ theme }) => css`    
    background: ${theme.colors.background};
    width: 100%;
    border-radius: ${theme.radio.default};   
    display: flex;
    justify-content: flex-start;
  `}
`;

export const TableColumnHeader = styled.p<TableHeaderProps>`  
  ${({ theme, alignLeft }) => css`
    text-align: ${alignLeft ? 'left': 'right'};
    min-width: 6rem;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      font-size: ${theme.fontSizes.small};
    }
  `}
`;

export const TableColumnValue = styled.p`  
  ${({ theme }) => css`
    text-align: right;
    min-width: 12rem;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      font-size: ${theme.fontSizes.small};
      min-width: 11rem;
    }
  `}
`;

interface TableColumnPercentualProps {
  percentual: number;
}

export const TableColumnPercentual = styled.p`  
  ${({ theme }) => css`
    text-align: right;
    font-weight: 400;
    min-width: 8rem;
    color: ${(props: TableColumnPercentualProps) => props.percentual > 0 ? theme.colors.primary : theme.colors.danger};

    @media (max-width: ${theme.deviceWidth.mobile}) {
      font-size: ${theme.fontSizes.small};
      min-width: 5rem;
    }
  `}
`;


interface TableAccountNameProps {
  root: number;
}

export const TableAccountName = styled.p`   
  ${({ theme }) => css` 
    padding-left: ${(props: TableAccountNameProps) => props.root && props.root === 1 ? 0 : props.root - 0.5}rem;
    ${(props: TableAccountNameProps) => props.root === 1 && 'font-weight:500;'}
    min-width: 30rem;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      font-size: ${theme.fontSizes.small};
      min-width: 20rem;
    }
  `}
`;


export const SelectContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TableScroll = styled.div`
  ${({ theme }) => css`
    overflow-x: scroll;
    width: 100%;

    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 1rem;      
    }
  
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255,255,255,.1);
      border-radius: 3rem;
  
      &:hover {
        background: rgba(255,255,255,.2);
        opacity: 50%;
      }
    }  
  `}
`;