import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    position:relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 50rem;
    min-width: 20rem;
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
      max-width: 15%;
      margin: 0 0.5rem;
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

export const MultiSelectedItems = styled.div`
  ${({ theme }) => css`
    padding: 1rem 0;
    display: inline-flex;
    flex-wrap: wrap;
    gap: 1rem;
  `}  
`;

export const MultiSelectLabel = styled.p`
  ${({ theme }) => css`
    padding-top: 2rem;
    font-size: ${theme.fontSizes.small}
  `}  
`;