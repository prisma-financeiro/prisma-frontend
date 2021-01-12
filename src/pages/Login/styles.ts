import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  margin-top: 12rem;
  width: 35rem;
  height: 34rem;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    margin-top: 5.8rem;
    width: 100%;
    height: 100%;
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  height: 100%;

  > h1 {
    text-align: center;
  }
`;

export const InputControl = styled.div`
  margin: 0.8rem;
`;

export const ValidatorMessage = styled.div`
  margin 0.3rem;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
`;

export const AccountOptions = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};                        
  
  > p {
    margin: 1rem;
  }

`;