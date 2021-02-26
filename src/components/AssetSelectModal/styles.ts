import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  ${({ theme }) => css`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 500;
    width: 70%;
    border-radius: ${theme.radio.medium};
    left: 15%;
    top: 30%;
    transition: all 0.3s ease-out;
    background-color: ${theme.colors.background};

    @media (min-width: 600px) {
      width: 500px;
      left: calc(50% - 250px);
    }

    @media (max-width: ${theme.deviceWidth.mobile}) {
      width: 90%;
      left: 5%;
    }
  `}  
`;

export const Header = styled.div`
  ${({ theme }) => css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin: 1rem;
      min-height: 5rem;
      
      h1: {
        color: ${theme.colors.h1};
      }
  `} 
`;

export const CloseIcon = styled(motion.div)`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.xlarge};
    cursor: pointer;
  `}
`;

export const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 50rem;
  min-width: 20rem;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 1rem;
  padding: 1rem;
  min-height: 5rem;
`;


export const List = styled.ul`
  ${({ theme }) => css`
    width: 100%;
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

