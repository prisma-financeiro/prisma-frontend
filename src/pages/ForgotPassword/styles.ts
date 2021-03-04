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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40rem;
  height: 45rem;
  background: ${({ theme }) => theme.colors.background};

  > h1 {
    text-align: center;
    margin-bottom: 3rem;
  }

  > form {
    width: 90%
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    width: 100%;
    height: 100%;
  }
`;

export const InputControl = styled.div`
  margin: 1.5rem;
`;

export const ValidatorMessage = styled.div`
  margin: 0.3rem;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.default};
`;

export const AccountOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
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

export const ConfirmationModalButtonContainer = styled.div`  
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  > Button {    
    margin-top: 3rem;
  }

  > Button:last-child {    
    margin-left: 0.8rem;
  }
`;