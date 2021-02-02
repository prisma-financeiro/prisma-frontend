import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35rem;
  height: 45rem;
  background: ${({ theme }) => theme.colors.background};

  > h1 {
    text-align: center;
  }

  > div {
    display: flex; 
    flex-direction: row
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
    height: 100%;
  }
`;
export const InputControl = styled.div`
  margin: 2rem;
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