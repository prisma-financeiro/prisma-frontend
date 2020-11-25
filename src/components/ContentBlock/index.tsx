import React, { useState } from 'react';

import { AnimatedContainer } from './styles';
import { CONTAINER_ANIMATION } from '../../constants/animations';
import { ContentHeader } from '../../pages/Landing/Favorites/styles';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ContentBlock: React.FC<{ title?: string }> = ({ title, children }) => {
  const [toggled, setToggle] = useState(true);

  return (
    <>
      <ContentHeader onClick={() => setToggle(!toggled)}>
        <h2>{title}</h2>
        {toggled ? <FiChevronUp /> : <FiChevronDown />}
      </ContentHeader>
      <AnimatedContainer hidden={!toggled} variants={CONTAINER_ANIMATION}>
        {children}
      </AnimatedContainer>
    </>
  );
}

export default ContentBlock;