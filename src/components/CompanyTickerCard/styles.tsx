import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${theme.colors.lightGrey};
    width: 19rem;
    height: 15rem;
    border-radius: 5px;
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  margin: 10px 0 10px 10px;
`;

export const CompanyLogo = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
`
export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;

    > h1 {
      font-weight: 500;
      color: ${theme.colors.darkGrey};
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

export const StockPrice = styled.p`
  ${({ theme }) => css`
      font-weight: 700;
      color: ${theme.colors.yellow};
      font-size: ${theme.fontSizes.large};
  `}
`

export const Icon = styled.div`
  ${({ theme }) => css`
      font-weight: 500;
      color: ${theme.colors.error};
      font-size: ${theme.fontSizes.large};
      margin-right: 5px;
  `}
`

export const StockVariation = styled.div`
  ${({ theme }) => css`
      margin-top: 5px;
      display: flex;
      font-weight: 500;
      color: ${theme.colors.grey};
      font-size: ${theme.fontSizes.default};
  `}
`