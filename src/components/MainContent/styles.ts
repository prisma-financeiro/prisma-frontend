import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 2.0rem;
  width: 100%;
  max-width: 70%;
  margin-left: 30rem;

  @media (max-width: 670px) {
    margin: 0;
    max-width: 100%;
    align-self: center;
  }
`;
