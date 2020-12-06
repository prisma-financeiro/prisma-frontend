import styled, { css } from 'styled-components';
// import { motion } from 'framer-motion';

export const Select = styled.select`
    ${({ theme }) => css`    
        background: ${theme.colors.darkGrey};
        min-width: 10rem;
        max-height: 4rem;
        border-radius: ${theme.radio.default};
        margin: 0.5rem;
        padding: 1rem;
        color: ${theme.colors.lightGrey}
    `}
`;