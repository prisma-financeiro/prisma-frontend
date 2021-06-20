import styled, { css } from 'styled-components';

import { ButtonProps } from '.';

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.darkGrey};

    :hover {
      background: ${({ theme }) => theme.colors.secondary};
    }
  `,
  secondary: css`
  background: ${({ theme }) => theme.colors.background};
  border: 0.1rem solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};

  :hover {
    background: ${({ theme }) => theme.colors.darkGrey};
    color: ${({ theme }) => theme.colors.secondary};
  }
`,
  transparent: css`
    background: transparent;
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    border: 0.1rem solid ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.background};

    :hover {
      background: ${({ theme }) => theme.colors.dangerLight};
      color: ${({ theme }) => theme.colors.background};
    }
`,
};

export const Container = styled.button<ButtonProps>`
  ${({ theme, variant, color, background }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${background || theme.colors.background};
    border: 0;
    padding: 0.8rem 2.4rem;
    border-radius: ${theme.radio.small};
    color: ${color || theme.colors.secondary};
    transition: ${theme.transition.default};
    width: 100%;

    * {
      transition: ${theme.transition.default};
    }

    ${variant && variants[variant]};

    :disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  `}
`;
