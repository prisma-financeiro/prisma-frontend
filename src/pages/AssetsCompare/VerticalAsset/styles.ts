import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin: 0 0.5rem;
  `}
`;

export const FieldGroup = styled.div`
  ${({ theme }) => css`
    width: 100%;
  `}
`;

export const DataField = styled.div`
  ${({ theme }) => css`
    width: 19rem;
    height: 4rem;
    margin-top: 0.5rem;
    background: ${theme.colors.background};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    :nth-child(odd) {
      background: ${theme.colors.color4};
    }

    > span {
      color: ${theme.colors.secondary};
      font-size: ${theme.fontSizes.small};
      position: absolute;
      left: 1rem;
    }

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      width: 15rem;
      height: 4rem;
      font-size: ${theme.fontSizes.small};
    }
  `}
`;

export const EmptyBlock = styled.div<{first?: boolean}>`
  ${({ theme, first }) => css`
      width: 19rem;
      height: ${first ? '3rem' : '5rem'};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.fontSizes.xlarge};

      @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
        width: 15rem;
        height: 4rem;
        font-size: ${theme.fontSizes.small};
      }
  `}
`;

export const AssetHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > span {
      margin-top: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: ${theme.fontSizes.large};
      color: ${theme.colors.secondary};

      > p {
        padding: 0 0.5rem;
      }
    }
  `}  
`;