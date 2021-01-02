import styled, { css } from 'styled-components';

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

export const Container = styled.div`
  ${({ theme }) => css`
    position:relative;
    display: flex;
    flex-direction: column;

    :focus-within {
      ${IconContainer} {
          color: ${theme.colors.grey};
        };
    }
  `}  
`;

export const StyledInput = styled.input`
  ${({ theme }) => css`
    width: 100%;
    padding: 1rem;
    padding-right: 5rem;
    border-radius: ${theme.radio.small};
    background-color: ${theme.colors.darkGrey};
    color: ${theme.colors.grey};
    outline: none;
    border: none;

    :focus {
      outline: none;
    }
  `}  
`;

export const List = styled.ul`
  ${({ theme }) => css`
    position: absolute;
    width: 100%;
    top: 4.5rem;
    margin-top: 1rem 0;
    border-radius: ${theme.radio.small};
    border: ${theme.colors.background} 1px solid;
    background-color: ${theme.colors.darkGrey};
    z-index: 10;
    cursor: pointer;
  `}
`;

export const ListItem = styled.li`
  ${({ theme }) => css`
      padding: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      :hover {
        background-color: ${theme.colors.greyLowerOpacity}
      }
  `}  
`;

export const ListItemImage = styled.div`
  ${({ theme }) => css`
      max-width: 10%;
      margin: 0 1rem;
  `}  
`;

export const ListItemBody = styled.div`
  ${({ theme }) => css`
    margin: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h2 {
      color: ${theme.colors.primary}
    }
  `}  
`;

export const ListItemType = styled.div`
  ${({ theme }) => css`
    margin: 0 1rem;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}  
`;