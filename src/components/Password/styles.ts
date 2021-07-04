import styled from "styled-components";

export const Container = styled.div`
  > * {
    margin-bottom: 1.5rem;
  }
`;

export const ValidatorMessage = styled.div`
  margin: 0.3rem;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
`;