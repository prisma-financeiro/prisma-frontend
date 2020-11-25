import React from 'react';

import { AnimatedContainer } from './styles';
import { CONTAINER_ANIMATION } from '../../constants/animations';
import { Header } from '../../pages/Landing/Favorites/styles';

const ContentBlock: React.FC<{ title?: string }> = ({ title, children }) => {
  return (
    <div>
      <Header>
        <h2>{title}</h2>
      </Header>
      <AnimatedContainer variants={CONTAINER_ANIMATION}>
        {children}
      </AnimatedContainer>
    </div>
  );
}

export default ContentBlock;