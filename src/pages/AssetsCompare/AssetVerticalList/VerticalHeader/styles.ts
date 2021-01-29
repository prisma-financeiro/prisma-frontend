import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
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
  `}
`;

export const EmptyBox = styled.div`
    ${({ theme }) => css`
    padding: 1rem;
    width: 19rem;
    height: 15rem;

    @media (max-width: ${theme.deviceWidth.mobile}) {
      width: 100%;
      height: 6rem;    
    }
  `}
`;

export const AssetHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20rem;
    height: 20rem;
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 10.5rem;
    background: ${theme.colors.color4};
    box-shadow: 0 8px 6px -7px black, 0px -35px 1px ${theme.colors.darkGrey};

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      top: -4.5rem;
      border-radius: 0;
      padding: 0.5rem 1rem;
      margin-bottom: 1.5rem;
    }
  `}  
`;