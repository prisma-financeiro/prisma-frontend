import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 1rem;
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
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${theme.fontSizes.xlarge};
  `}
`;

export const Field = styled.div`
  ${({ theme }) => css`
    width: 19rem;
    height: 4rem;
    margin-top: 0.5rem;
    background: ${theme.colors.darkGrey};
    display: flex;
    align-items: center;
    justify-content: center;
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