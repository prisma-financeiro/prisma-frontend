import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
  `}
`;

export const FieldGroup = styled.div`
  ${({ theme }) => css`
    margin-top: 0.5rem;
  `}
`;

export const DataField = styled.div`
  ${({ theme }) => css`
    width: 19rem;
    height: 4rem;
    margin-top: 0.5rem;
    background: ${theme.colors.background};
    display: flex;
    align-items: center;
    justify-content: center;

    :nth-child(odd) {
      background: ${theme.colors.color4};
    }
  `}
`;

export const EmptyBlock = styled.div`
  ${({ theme }) => css`
      width: 19rem;
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.fontSizes.xlarge};
  `}
`;

export const AssetHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20rem;
    height: 20rem;
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 10.5rem;
    background: ${theme.colors.color4};
    box-shadow: 0 8px 6px -7px black, 0px -35px 1px ${theme.colors.darkGrey};

    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      top: -4.5rem;
      border-radius: 0;
      padding: 0.5rem 1rem;
      margin-bottom: 1.5rem;
    }
  `}  
`;