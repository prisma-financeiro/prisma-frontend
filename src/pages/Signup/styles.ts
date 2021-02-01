import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 12rem;
  padding: 2.5rem;
  width: 35rem;
  height: 50rem;
  border-radius: 5px;
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

  > label {
    display:inline-block;
    float:left;
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
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