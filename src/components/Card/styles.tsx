import styled from 'styled-components';

type ContainerProps = {
  color: string,
  width: number,
  height: number
}

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
