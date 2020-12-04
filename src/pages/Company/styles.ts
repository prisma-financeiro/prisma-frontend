import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  margin-top: 8rem;
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
    height: 100%;
    min-height: 17.6rem;
    border-radius: ${theme.radio.default};
    padding: 1.6rem 2.4rem;
    box-shadow: ${theme.shadows.flat};
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
  `}
`;

export const Divider = styled.div`
${() => css`
  border-bottom: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.greyLowerOpacity};
  opacity: 50%;
  width: 100%
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
  top: 8.1rem;
  z-index: 0;
  margin-bottom: 1.0rem;
 
  @media (max-width: 1080px) {
    flex-direction: column;
    justify-content: center;
  }
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

  > p:last-child {
    color: ${theme.colors.grey};
    font-size: ${theme.fontSizes.small};
  }
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


