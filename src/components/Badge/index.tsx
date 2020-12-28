import React from 'react';

import { Container } from './styles';

interface BadgeProps {
  backgroundColor: string;
  color: string;
  fontSize: string;
}

const Badge: React.FC<BadgeProps> = ({ backgroundColor, color, fontSize, children }) => {
  return <Container backgroundColor={backgroundColor} color={color} fontSize={fontSize}>
    {children}
  </Container>;
}

export default Badge;