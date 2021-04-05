import styled, { css } from 'styled-components';
import backgroundImg from '../../assets/images/dashboard-placeholder.png';
import { motion } from 'framer-motion';

export const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8rem;
  width: 100%;
  height: 100%;
  padding: 0 1.6rem;
`

export const Background = styled.div`
  width: 80vw;
  height: 85vh;
  margin-top: 5rem;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  filter: blur(8px);
  -webkit-filter: blur(8px);
  
  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    padding: 0;
    margin-top: 3rem;
    background-size: 100% 100%;
  }
`;


export const Content = styled(motion.div)`
  ${({ theme }) => css`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    z-index: 500;
    width: 70%;
    border-radius: ${theme.radio.medium};
    left: 15%;
    top: 30%;
    transition: all 0.3s ease-out;
    background-color: ${theme.colors.background};
    text-align: center;

    > span {
      font-size: ${({ theme }) => theme.fontSizes.xxxlarge};
      color: ${({ theme }) => theme.colors.primary}
    }

    > h3 {
      margin-top: 1rem;
    }

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

