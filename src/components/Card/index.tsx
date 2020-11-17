import React from 'react';

import { Container } from './styles';

export interface CardProps {
  color: string,
  height: number,
  width: number
}

const Card: React.FC<CardProps> = ({ color, height, width, children }) => {
  return (
    <Container 
      color={color}
      width={width}
      height={height}>
        {children}
    </Container>
  );
}

export default Card;