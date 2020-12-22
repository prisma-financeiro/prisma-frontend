import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  margin-top: 8.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;    
  justify-content: center;  
`;

export const AnimatedCard = styled(motion.article)`
  ${({ theme }) => css`    
    background: ${theme.colors.background};
    width: 100%;
    border-radius: ${theme.radio.default};   
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `}
`;

export const Divider = styled.div`
  ${() => css`
    border-color: ${({ theme }) => theme.colors.greyLowerOpacity};
    opacity: 50%;
    width: 100%;
  `}
`;


export const HeaderContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background};  
    border-radius: ${theme.radio.default};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 10.5rem; 
    z-index: 10;
    border: 0;
    margin-bottom: 4rem;
    box-shadow: 0px 10px 15px 20px ${theme.colors.darkGrey}, 0px -10px 10px 30px ${theme.colors.darkGrey};
  
    @media (max-width: 1080px) {
      flex-direction: column;
      justify-content: center;
    }
  `}  
`;

export const CardContainer = styled.div`  
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
  `}
`;

export const CompanyHeader = styled.div`
  ${({ theme }) => css`
    padding: 1.6rem 2.4rem;  
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  `}  
`;


export const CompanyLogo = styled.img`
  margin-right: 1rem;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
`

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;

    > h1 {
      font-weight: 500;
      color: ${theme.colors.lightGrey};
      font-size: 2rem;
    }

    > p {
      color: ${theme.colors.grey};
      font-size: ${theme.fontSizes.small};
    }
  `}
`

export const ValueContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;  
    justify-content: center;
    align-items: center;
    
    > * {
      margin: 2rem;
    }
  `}  
`;

export const ValueCard = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;    
  `}  
`;

export const Value = styled.p`
  ${({ theme }) => css`
      font-weight: 700;
      color: ${theme.colors.yellow};
      font-size: ${theme.fontSizes.large};
  `}
`


export const ButtonContainer = styled.div`
  ${({ theme }) => css`    
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;  
    justify-content: center;
    align-items: center;
    
    > * {
      margin: 1rem;    
    }  
  `}  
`;

export const AnimatedWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 670px) {
    flex-direction: column;
  }
`;


export const Interval = styled.div` 
  // border: 1px solid red; 
  width: 100%;
  display: flex;  
  flex-direction: row;  
  justify-content: flex-end;
  align-items: center;
`;

export const IntervalItem = styled.p`  
  ${({ theme }) => css`
    margin: 2rem;
    font-weight: 500;

    :hover {    
      color: ${theme.colors.primary};
      cursor: pointer;
    }
  `}
`;

export const InfoContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;    
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media (max-width: 670px) {
      flex-direction: column;
    }
  `}  
`;


export const InfoCard = styled.div`
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

export const InfoCardValue = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    > p {
      font-weight: 600;
      color: ${theme.colors.primary};
      font-size: ${theme.fontSizes.xlarge};
    }
  `}
`

export const InfoCardTitle = styled.h2`
  ${({ theme }) => css`
      margin-bottom: 0.5rem;      
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.xlarge};
  `}
`