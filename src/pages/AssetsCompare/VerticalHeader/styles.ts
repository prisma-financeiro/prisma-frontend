import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
  `}
`;

export const FieldGroup = styled.div`
  ${({ theme }) => css`
    margin-top: 0.5rem;
  `}
`;

export const Title = styled.div`
  ${({ theme }) => css`
    width: 19rem;
    height: 5rem;
    display: flex;
    padding-bottom: 0.5rem;
    align-items: flex-end;
    justify-content: center;
    font-size: ${theme.fontSizes.xlarge};
    color: ${theme.colors.grey};
    font-weight: 600;

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      width: 12rem;
      height: 4rem;
      font-size: ${theme.fontSizes.default};
    }
  `}
`;

export const Field = styled.div`
  ${({ theme }) => css`
    width: 19rem;
    height: 4rem;
    margin-top: 0.5rem;
    background: ${theme.colors.background};
    display: flex;
    align-items: center;
    justify-content: center;

    :nth-child(odd) {
      background: ${theme.colors.color4};
    }

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      width: 15rem;
      height: 4rem;
      font-size: ${theme.fontSizes.small};
    }
  `}
`;

export const AssetHeader = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
  `}  
`;
