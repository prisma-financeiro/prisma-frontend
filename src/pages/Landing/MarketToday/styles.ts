import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const AnimatedCard = styled(motion.article)`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    width: 100%;
    height: 100%;
    min-height: 17.6rem;
    border-radius: ${theme.radio.default};
    padding: 1.6rem 2.4rem;
    box-shadow: ${theme.shadows.flat};
    display: flex;
    flex-direction: column;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;

    > h2 {
      font-weight: 500;
      color: ${theme.colors.h2};
    }
  `}
`;

export const SubHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;

    > h3 {
      font-weight: 500;
      color: ${theme.colors.h3};
    }
  `}
`;

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: row;  

  div:last-child {
    margin-right: 0;
  }

  @media (max-width: 680px) {
    flex-direction: column;
    justify-content: center;   
    
    div:last-child {      
      margin-bottom: 0rem;
    }
  }
`;

export const TableWrapper = styled.div`
${({ theme }) => css`
  background: ${theme.colors.darkGrey};
  display: flex;
  flex-direction: Column;  
  height: 100%;
  width: 100%;  
  border-radius: ${theme.radio.default};
  padding: 1.6rem 2.4rem;
  box-shadow: ${theme.shadows.flat};
  margin-right: 2rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 680px) {
      margin-right: 0;
      margin-bottom: 2rem;
  }
  `}
`;


export const TableHeader = styled.div`
  ${({ theme }) => css`    
  display: flex;
  flex-direction: row;
  align-items: center;
  `}
`;

export const TableHeaderIcon = styled.div`
  ${({ theme }) => css`
    min-height: 3rem;
    min-width: 3rem;
    margin-left: 2rem;
  `}
`;

