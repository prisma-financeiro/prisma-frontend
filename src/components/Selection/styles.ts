import styled, { css } from 'styled-components';

export const Select = styled.select`
    ${({ theme }) => css`    
        background: ${theme.colors.darkGrey};
        width: 100%;
        max-width: 100%;
        max-height: 4rem;
        line-height: 1.3;
        font-weight: 700;
        margin: 0.5rem;
        padding: 1rem;
        color: ${theme.colors.lightGrey};
        border: none;
        border-radius: ${theme.radio.default};

        > ::-ms-expand {
    display: none;
}
    `}

`;

export const StyledOption = styled.option`
    border: 1px solid #e5e5e5;
  padding: 10px;
`;