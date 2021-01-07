import styled, { css } from 'styled-components';
import DefaultButton from '../../components/Button';

export const Container = styled.div`
  ${({ theme }) => css`    
    flex: 1 0 auto;
    margin-top: 8.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;    
    justify-content: center;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      flex-direction: column;
    }
  `}
`;

export const AccordionContent = styled.article`
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
    padding: 1rem 2rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 10.5rem; 
    z-index: 10;
    border: 0;
    margin-bottom: 3rem;
    box-shadow: 0px 10px 15px 20px ${theme.colors.darkGrey}, 0px -10px 10px 30px ${theme.colors.darkGrey};
  
    @media (max-width: 1080px) {
      flex-direction: column;
      justify-content: center;
    }

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      top: -4.5rem;
      border-radius: 0;
      padding: 0.5rem 1rem;
      margin-bottom: 1.5rem;
    }
  `}  
`;

export const AccordionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    font-weight: 500;
    color: ${theme.colors.lightGrey};
    font-size: ${theme.fontSizes.large};

    @media (max-width: ${theme.deviceWidth.mobile}) {
      font-weight: 400;
      font-size: ${theme.fontSizes.small};
    }
  `}
`

export const StockPriceContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;  
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.5rem 1rem;

    > div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    @media (max-width: ${theme.deviceWidth.mobile}) {
      justify-content: center;
      margin: 0.5rem 0;

      > div {
        align-items: flex-start;
      }
    }
  `}  
`;

export const Value = styled.p`
  ${({ theme }) => css`
      font-weight: 700;
      color: ${theme.colors.yellow};
      font-size: ${theme.fontSizes.large};
      
      @media (max-width: ${theme.deviceWidth.mobile}) {
        font-weight: 700;
        color: ${theme.colors.yellow};
        font-size: ${theme.fontSizes.small};        
      }
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
      margin: 0.5rem 1rem;
    }  

    @media (max-width: ${theme.deviceWidth.mobile}) {
      width: 100%;

      > * {
        margin: 1rem 0.5rem;
      }  
    }
  `}
`;

export const Button = styled(DefaultButton)`
    width: 100%;
`

export const QuoteInfoContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: ${theme.spacing.default} 0;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;      
      column-gap: 1rem;
      row-gap: 1rem;
    }

    div:last-child {
      margin-right: 0;
    }
  `}  
`;

export const SegmentContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: ${theme.spacing.default} 0;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      flex-direction: column;
    }

    div:last-child {
      margin-right: 0;

      @media (max-width: ${theme.deviceWidth.mobile}) {
        margin-bottom: 0;
      }
    }
  `}  
`;

export const InfoContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;      
    column-gap: 2rem;
    row-gap: 2rem;
    justify-content: center;
    margin: ${theme.spacing.default} 0;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      display: grid;
      grid-template-columns: 1fr 1fr;      
      column-gap: 1rem;
      row-gap: 1rem;
    }

    div:last-child {
      margin-right: 0;
    }
  `}  
`;

export const ContatoContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
    row-gap: 2rem;
    justify-content: center;
    margin: ${theme.spacing.default} 0;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      display: flex;
      flex-direction: column;    
    }

    div:last-child {
      margin-right: 0;
    }
  `}  
`;

export const InfoCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.darkGrey};
    width: 100%;
    height: 100%;
    border-radius: ${theme.radio.default};   
    padding: ${theme.spacing.default};
    margin-right: ${theme.spacing.default};
    display: flex;
    flex-direction: column;

    > p {
      margin-bottom: 0.5rem;
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.large};
    }

    > div {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      font-weight: 600;
      color: ${theme.colors.primary};
      font-size: ${theme.fontSizes.large};
    }

    @media (max-width: ${theme.deviceWidth.mobile}) {      
      padding: 0.5rem;
      width: 100%;
      height: 100%;

      > p {
        font-size: ${theme.fontSizes.small};
      }

      > div {
        font-weight: 400;
        font-size: ${theme.fontSizes.small};
        margin-top: 0;
      }
    }
  `}  
`;