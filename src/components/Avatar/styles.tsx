import styled from 'styled-components';

export interface AvatarProps {
  size: number,
}

export const Container = styled.div<AvatarProps>`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-radius: 50%;
`;
