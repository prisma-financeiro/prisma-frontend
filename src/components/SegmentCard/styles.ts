import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  ${({ theme }) => css`    
    // background: ${theme.colors.darkGrey};
    background: linear-gradient(to top, ${theme.colors.darkGrey}, #414345);
    width: 100%;
    border-radius: ${theme.radio.default};   
    padding: ${theme.spacing.default};
    margin: ${theme.spacing.default};
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 670px) {
      margin: 1rem 1rem 0 0;
    }
  `}  
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;

    > p {
      font-weight: 400;
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.default};
    }
  `}
`

export const Description = styled.h2`
  ${({ theme }) => css`
      margin-bottom: 0.5rem;      
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.xlarge};
  `}
`


export const CountWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  `}
`

export const CompaniesCount = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;
  `}
`

export const CountSubtitle = styled.p`
  ${({ theme }) => css`  
      font-weight: 400;
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.default};  
  `}
`

export const Count = styled.p`
  ${({ theme }) => css`
      font-weight: 600;
      color: ${theme.colors.primary};
      font-size: ${theme.fontSizes.xxlarge};
    
  `}
`