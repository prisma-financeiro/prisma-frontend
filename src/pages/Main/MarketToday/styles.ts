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
    margin: 1rem 0;

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

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {  
    flex-direction: column;
    justify-content: center;  
    width: 100%;
    
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

    @media (max-width: ${theme.deviceWidth.mobile}) { 
        margin-right: 0;
        margin-bottom: 1rem;
        padding: 1rem;
    }
  `}
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TableTitle = styled.p`
  ${({ theme }) => css`    
    font-weight: 700;
    font-size:${theme.fontSizes.xxlarge};
    color: ${theme.colors.grey};

    @media (max-width: ${theme.deviceWidth.mobile}) {      
      font-size:${theme.fontSizes.xlarge};
    }    
  `}
`;

export const TableHeaderIcon = styled.div`
  ${({ theme }) => css`
    display: flex;
    max-height: 5rem;
    max-width: 5rem;
    padding: 1rem;
    text-align: center;
    align-items: center;    

    @media (max-width: ${theme.deviceWidth.mobile}) {
      padding: 1rem;
    }    
  `}
`;

export const TableFooter = styled.div`
  ${({ theme }) => css`
  margin-top: 1rem;    
  width: 100%;
  text-align: center;
  font-weight: 400;
  font-size:${theme.fontSizes.tiny};
  color: ${theme.colors.grey};
  opacity: 80%;
  `}
`;

export const SpinnerContainer = styled.div`
  ${({ theme }) => css`
    border-radius: ${theme.radio.small};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    min-height: 5rem;
  `}
`;