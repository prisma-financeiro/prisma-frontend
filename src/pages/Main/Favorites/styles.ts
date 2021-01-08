import styled, { css } from 'styled-components';

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;

    > h2 {
      font-weight: 500;
      text-transform: uppercase;
      color: ${theme.colors.h2};
    }
  `}
`;

export const SubHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    margin-top: 2.5rem;
    margin-bottom: 1rem;

    > h3 {
      font-weight: 500;
      color: ${theme.colors.h3};
    }
  `}
`;

export const DataWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 2.1rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
`;

export const ButtonContainer = styled.div`
  width: 15%;
  max-width: 15rem;
  min-width: 10rem;
  margin: 1rem 0;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;