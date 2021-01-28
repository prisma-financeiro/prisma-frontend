import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-right: 1rem;
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
    background: ${theme.colors.darkGrey};
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export const EmptyBlock = styled.div`
  ${({ theme }) => css`
      width: 19rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.fontSizes.xlarge};
  `}
`;