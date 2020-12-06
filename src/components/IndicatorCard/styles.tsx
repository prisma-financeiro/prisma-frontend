import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    // background: ${theme.colors.darkGrey};
    // background: linear-gradient(to top, #000000, #434343);
    background: linear-gradient(to top, #232526, #414345);
    width: 20rem;
    height: 15rem;
    border-radius: 5px;
    margin: 1rem 1rem 0 0;
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;  
  margin-top: 1.5rem;
  margin-left: 2.0rem;
  z-index: 10;
`;

export const Value = styled.p`
  ${({ theme }) => css`
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.xlarge};
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;

    > h1 {
      font-weight: 400;
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.default};
    }
  `}
`

export const Content = styled.div`
  padding: 0.5rem;  
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
`