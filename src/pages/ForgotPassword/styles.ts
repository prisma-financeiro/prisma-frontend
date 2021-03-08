import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  ju stify-content: flex-start;
  align-items: center;
  width: 40rem;
  background: ${({ theme }) => theme.colors.background};

  Button {
    margin-bottom: 1.5rem;
  }

  Button:last-child {
    margin-bottom: 3rem;
  }

  > h1 {
    text-align: center;
    margin: 3rem 3rem;
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

export const SpinnerContainer = styled.div`    
    height: 100%;
`;