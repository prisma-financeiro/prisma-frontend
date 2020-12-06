import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background: ${theme.colors.darkGrey};
    width: 18rem;
    height: 15rem;
    border-radius: 5px;
    margin: 1rem 1rem 0 0;
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  margin: 5px 0 5px 5px;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;

    > h1 {
      font-weight: 500;
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.large};
    }

    > p {
      color: ${theme.colors.grey};
      font-size: ${theme.fontSizes.small};
    }
  `}
`

export const Content = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`

export const Value = styled.p`
  ${({ theme }) => css`
      font-weight: 700;
      color: ${theme.colors.yellow};
      font-size: ${theme.fontSizes.large};
  `}
`