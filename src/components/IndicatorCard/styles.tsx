import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.darkGrey};
    width: 20rem;
    height: 15rem;
    border-radius: ${theme.radio.small};
    padding: 1rem 1rem 0 1.5rem;
    cursor: pointer;
    z-index: 1;
    -webkit-box-shadow: 7px 7px 7px -6px #232222;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -moz-box-shadow:    7px 7px 7px -6px #232222;  /* Firefox 3.5 - 3.6 */
    box-shadow:         7px 7px 7px -6px #232222; 


    @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
      padding: 0;
      width: 100%;
      height: 10rem;
      margin: 0.5rem 0.5rem 0 0;
      -webkit-box-shadow: 15px 15px 7px -6px #232222;  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
      -moz-box-shadow:    15px 15px 7px -6px #232222;  /* Firefox 3.5 - 3.6 */
      box-shadow:         15px 15px 7px -6px #232222; 
    }
  `}
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
  
  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    margin-top: 0.5rem;
    margin-left: 1.0rem;    
  }
`;

export const Value = styled.h2`
  ${({ theme }) => css`
      margin-bottom: 0.5rem;      
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.xlarge};
  `}
`

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;

    > p {
      font-weight: 400;
      color: ${theme.colors.lightGrey};
      font-size: ${theme.fontSizes.default};
    }
  `}
`

export const Content = styled.div`
  height: 55%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
`