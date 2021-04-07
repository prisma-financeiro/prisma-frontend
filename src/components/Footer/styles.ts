import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';

export const AnimatedContainer = styled(motion.footer)`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 3.2rem;
  z-index: 500;
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
    padding: 1.6rem;
    align-items: center;

    h4 {
      color: ${theme.colors.secondary};
      font-size: ${theme.fontSizes.default};
    }

    > span {
      display: block;
      font-size: ${theme.fontSizes.small};

      :first-of-type {
        margin-bottom: 0.8rem;
      }
    }

    > img {
      margin-top: 1.6rem;
    }

    > p {
      margin: 2rem;
      width: 60%;
      text-align: center;
      font-size: ${theme.fontSizes.tiny};
    }

    @media (max-width: ${theme.deviceWidth.mobile}) {
      flex-direction: column;
      text-align: center;
      
      > p {
        width: 80%;
      }
    }
  `}
`;

export const FooterSection = styled(AnimatedContainer) <{ background?: string }>`
  ${({ theme, background }) => css`
    background: ${background || transparentize(0.92, theme.colors.grey)};
    margin-top: 0;

    :last-of-type {
      ${Wrapper} {
        padding: 2.4rem 1.6rem;
      }
    }
  `}
`;
