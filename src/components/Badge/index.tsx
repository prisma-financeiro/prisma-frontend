import React from 'react';

import { Container, RemoveButton } from './styles';

interface BadgeProps {
  backgroundColor: string;
  color: string;
  fontSize: string;
  onRemove?: () => void;
}

const Badge: React.FC<BadgeProps> = ({ backgroundColor, color, fontSize, children, onRemove }) => {
  return <Container backgroundColor={backgroundColor} color={color} fontSize={fontSize}>
    {children}
    {
      !!onRemove  && (
        <RemoveButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onRemove}>
          x
        </RemoveButton>
      )
    }
  </Container>;
}

export default Badge;