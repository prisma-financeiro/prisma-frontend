import styled from 'styled-components';

export const Container = styled.div`
  flex: 1 0 auto;
  display: flex;
  margin-top: 9rem;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.6rem;
  
  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    padding: 0;
    margin-top: 6rem;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 1rem;
  min-width: 20rem;
  max-width: 30rem;
`;

export const PersonalInformationBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > svg {
    margin-right: 1rem;
  }
`

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1rem 0;
  width: 100%;

  > * {
    margin-bottom: 1.5rem;
  }
`

export const AccordionContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`