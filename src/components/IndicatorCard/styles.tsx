import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    background: linear-gradient(to top, ${theme.colors.darkGrey}, #414345);
    width: 20rem;
    height: 15rem;
    border-radius: 5px;
    margin: 1rem 1rem 0 0;

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      width: 100%;
      height: 10rem;
      margin: 0.5rem 0.5rem 0 0;
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;  
  margin-top: 1.5rem;
  margin-left: 2.0rem;
  z-index: 10;
  
  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    margin-top: 0.5rem;
    margin-left: 1.0rem;    
  }
`;

export const Value = styled.h2`
  ${({ theme }) => css`
      margin-bottom: 0.5rem;      
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.xlarge};
  `}
`

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

export const Content = styled.div`
  height: 55%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
`