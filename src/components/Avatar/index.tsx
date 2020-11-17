import React from 'react';

import { Container } from './styles';

export interface AvatarProps {
  image: string,
  size: number,
}

const Avatar: React.FC<AvatarProps> = ({ image, size}) => {
  return (
    <Container size={size}>
      <img src={image} alt=""/>
    </Container>
  );
}

export default Avatar;