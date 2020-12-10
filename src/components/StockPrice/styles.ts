import styled, { css } from 'styled-components';

export const Content = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`

export const Price = styled.p`
${({ theme }) => css`
    font-weight: 700;
    color: ${theme.colors.grey};
    font-size: ${theme.fontSizes.large};
`}
`

export const IconUp = styled.div`
${({ theme }) => css`    
    color: ${theme.colors.success};
    font-size: ${theme.fontSizes.large};
`}
`

export const IconDown = styled.div`
${({ theme }) => css`    
    color: ${theme.colors.error};
    font-size: ${theme.fontSizes.large};
`}
`

export const StockVariation = styled.div`
${({ theme }) => css`
    margin-top: 0.5rem;
    display: flex;
    font-weight: 500;
    color: ${theme.colors.grey};
    font-size: ${theme.fontSizes.default};
`}
`