import styled, { css } from 'styled-components';

export const Content = styled.div`
  margin: 10px;
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
    font-weight: 500;
    color: ${theme.colors.success};
    font-size: ${theme.fontSizes.large};
    margin-right: 5px;
`}
`

export const IconDown = styled.div`
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