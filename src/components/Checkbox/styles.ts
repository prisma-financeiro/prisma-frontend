import styled, { css } from 'styled-components';

export const Container = styled.div`
 ${({ theme }) => css`
    display: inline-block;

    > input {
      display: none;
    }

    > input + label {
      position: relative;
      padding-left: 28px;
      cursor: pointer;

      &:before {
        content: '';
        position: absolute;
        left:0; 
        top: 2px;
        width: 20px; 
        height: 20px;
        border: 1px solid ${theme.colors.darkGrey};
        background-color: ${theme.colors.darkGrey};
        border-radius: 3px;
        box-shadow: inset 0 1px 3px rgba(0,0,0,.3)
      }

      &:after {
        content: '✓';
        position: absolute;
        top: 0.5px; 
        left: 3px;
        color: ${theme.colors.primary};
        font-weight: 800;
        font-size: 18px;
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
        border: 1px dotted blue;
      }
    }
  `} 
`;
