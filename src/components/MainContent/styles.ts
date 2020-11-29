import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 2.0rem;
  width: 100%;
  max-width: 113rem;
  padding-left: 25rem;

  @media (max-width: 670px) {
    margin: 2.4rem 0 0;
  }
`;
