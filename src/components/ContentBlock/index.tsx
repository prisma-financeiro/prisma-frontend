import React from 'react';

import { AnimatedContainer } from './styles';
import { CONTAINER_ANIMATION } from '../../constants/animations';

const ContentBlock: React.FC = ({ children }) => {
  return (
    <AnimatedContainer variants={CONTAINER_ANIMATION}>
      {children}
    </AnimatedContainer>
  );
}

export default ContentBlock;