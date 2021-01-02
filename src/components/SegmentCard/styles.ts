import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.darkGrey};
    width: 100%;
    height: 100%;
    border-radius: ${theme.radio.default};   
    padding: ${theme.spacing.default};
    margin-right: ${theme.spacing.default};
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: ${theme.deviceWidth.mobile}) {      
      padding: 0.5rem;
      margin-right: 0;
      margin-bottom: ${theme.spacing.default};
    }
  `}  
`;

export const Title = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 300;
    color: ${theme.colors.lightGrey};
    font-size: ${theme.fontSizes.large};

    @media (max-width: ${theme.deviceWidth.mobile}) {      
      font-size: ${theme.fontSizes.default};      
    }
  `}
`

export const Description = styled.div`
  ${({ theme }) => css`
      width: 100%;
      font-weight: 500;     
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.xlarge};

      @media (max-width: ${theme.deviceWidth.mobile}) {      
        font-size: ${theme.fontSizes.large};
      }
  `}
`

export const CountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const CountSubtitle = styled.p`
  ${({ theme }) => css`  
      font-weight: 400;
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.default};

      @media (max-width: ${theme.deviceWidth.mobile}) {
        font-size: ${theme.fontSizes.small};
      }
  `}
`

export const Count = styled.p`
  ${({ theme }) => css`
      font-weight: 600;
      color: ${theme.colors.primary};
      font-size: ${theme.fontSizes.xxlarge};

      @media (max-width: ${theme.deviceWidth.mobile}) {
        font-size: ${theme.fontSizes.xlarge};
        font-weight: 500;
      }
  `}
`