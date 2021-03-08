import styled from "styled-components";

export const InputControl = styled.div`
  margin: 1.5rem;
`;

export const ValidatorMessage = styled.div`
  margin: 0.3rem;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
`;