import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 12rem;
  padding: 2.5rem;
  width: 35rem;
  height: 30rem;
  background: ${({ theme }) => theme.colors.background};

  > h1 {
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
    height: 100%;
  }
`;

export const InputControl = styled.div`
  margin: 0.8rem;
`;

export const ValidatorMessage = styled.div`
  margin: 0.3rem;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
`;

export const AccountOptions = styled.div`
  margin-top: 3rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};                        
  
  > p {
    margin: 1rem;
  }

`;