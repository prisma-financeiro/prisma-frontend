import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;



export const FormContainer = styled.div`
${({ theme }) => `
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 40rem;
background: ${theme.colors.background};

> h1 {
  text-align: center;
  margin: 3rem 3rem;
}

> form {
  width: 90%
}

@media (max-width: ${theme.deviceWidth.mobile}) {
  width: 100%;
  height: 100%;
}
`}
`;

export const InputControl = styled.div`
  margin: 1.5rem;
`;

export const ValidatorMessage = styled.div`
  margin: 0.3rem;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
`;

export const AccountOptions = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.small};                        

  > a {
    margin: 0.5rem;

    :hover {
      color: ${({ theme }) => theme.colors.success};
      text-decoration: underline;
    }
  }
`;

export const SpinnerContainer = styled.div`    
    height: 100%;
`;