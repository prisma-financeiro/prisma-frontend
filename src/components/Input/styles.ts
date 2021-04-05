import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    border-radius: ${theme.radio.small};
    background-color: ${theme.colors.darkGrey};

    :focus-within {
      ${IconContainer} {
          color: ${theme.colors.grey};
        };
    }
  `}  
`;

export const StyledInput = styled.input`
  ${({ theme }) => css`
    width: 90%;
    padding: 1rem;
    color: ${theme.colors.grey};
    border-radius: ${theme.radio.small};
    background-color: ${theme.colors.darkGrey};
    outline: none;
    border: none;

    :focus {
      outline: none;
    }
  `}  
`;

export const IconContainer = styled.div`
  ${({ theme }) => css`
    position:absolute;
    bottom:1rem;
    right:1rem;
    width:2.5rem;
    height:2.5rem;
    font-size: ${theme.fontSizes.xlarge};
    color: ${theme.colors.greyLowerOpacity};

  `}  
`;