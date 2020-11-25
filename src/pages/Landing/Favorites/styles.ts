import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const AnimatedCard = styled(motion.article)`
  ${({ theme }) => css`
    background: ${theme.colors.background};
    width: 100%;
    height: 100%;
    min-height: 17.6rem;
    border-radius: ${theme.radii.default};
    padding: 1.6rem 2.4rem;
    box-shadow: ${theme.shadows.flat};
    display: flex;
    flex-direction: column;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;

    > h2 {
      font-weight: 500;
      text-transform: uppercase;
      color: ${theme.colors.greyLowerOpacity};
      font-size: ${theme.fontSizes.large};
    }
  `}
`;


export const ContentHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    padding-right: 0.3rem;    

    > h2 {
      font-weight: 400;
      text-transform: uppercase;      
      color: ${theme.colors.greyLowerOpacity};
      font-size: ${theme.fontSizes.large};
    }

    > svg {
      width: 2.2rem;
      height: 2.2rem;
      margin-left: 0.5rem;
      align-self: center;
      color: ${theme.colors.greyLowerOpacity};
      font-size: ${theme.fontSizes.large};
      cursor: pointer;

      :hover {
        border-radius: 50%;
        background: ${({ theme }) => theme.colors.background};
      }
     
    }
  `}
`;

export const SubHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;

    > h3 {
      font-weight: 500;
      color: ${theme.colors.darkGrey};
      font-size: ${theme.fontSizes.default};
    }
  `}
`;

export const DataWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 2.1rem;
`;