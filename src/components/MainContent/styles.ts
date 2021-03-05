import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 2.0rem;
  width: 100%;
  max-width: 100%;
  margin-left: 30rem;

  @media (max-width: ${({ theme }) => theme.deviceWidth.mobile}) {
    margin: 0;
    max-width: 100%;
    align-self: center;
  }

  @media (max-width: ${({ theme }) => theme.deviceWidth.tablet}) {
    margin: 0;
    max-width: 100%;
    align-self: center;
  }
`;
