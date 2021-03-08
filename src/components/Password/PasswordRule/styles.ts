import styled from "styled-components";

interface ContainerProps {
  match: boolean;
}

export const Container = styled.p<ContainerProps>`
    ${({ theme, match }) => `
      text-align: left;
      color: ${match ? theme.colors.success : theme.colors.danger};
    `}
  `;