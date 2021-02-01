import styled, { css } from 'styled-components';

export const Container = styled.div`
 ${({ theme }) => css`
    display: inline-block;

    > input {
      display: none;
    }

    > input + label {
      position: relative;
      padding-left: 2.8rem;
      cursor: pointer;

      &:before {
        content: '';
        position: absolute;
        left:0;
        width: 2rem; 
        height: 2rem;
        border: 0.1rem solid ${theme.colors.darkGrey};
        background-color: ${theme.colors.darkGrey};
        border-radius: 0.3rem;
        box-shadow: inset 0 0.1rem 0.3rem rgba(0,0,0,.3)
      }

      &:after {
        content: '✓';
        position: absolute;
        left: 0.4rem;
        color: ${theme.colors.primary};
        font-weight: 800;
        font-size: 1.6rem;
        transition: all .2s;
      }
    }

    > input:not(:checked) + label {
        &:after {
          opacity: 0;
          transform: scale(0);
        }
    }
    > input:disabled:not(:checked) + label {
        &:before {
          box-shadow: none;
          border-color: ${theme.colors.grey};
          background-color: ${theme.colors.grey};
        }
    }
    > input:checked + label {
      &:after {
        opacity: 1;
        transform: scale(1);
      }
    }

    > input:disabled:checked + label {
      &:after {
        color: ${theme.colors.primary};
        background-color: ${theme.colors.primary}
      }
    }

    > input:disabled + label {
      color: ${theme.colors.grey};
    }

    > input:checked:focus + label {
      &:before {
        border: 0.1rem dotted blue;
      }
    }
  `} 
`;
