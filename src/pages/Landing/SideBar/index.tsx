import React from 'react';

import { Wrapper, AnimatedContainer } from './styles';
import Accordion from './Accordion';

import { DEFAULT_TRANSITION, SIDE_BAR_NAVIGATION } from '../../../constants';

const animation = {
  unMounted: { opacity: 0, y: -50 },
  mounted: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, ...DEFAULT_TRANSITION },
  },
};

const SideBar  = () => {
  return (
    <Wrapper>
      <AnimatedContainer variants={animation}>
        {Object.entries(SIDE_BAR_NAVIGATION).map(([key, value]) => (
          <Accordion key={key} icon={value.icon} sectionName={key} />
        ))}
      </AnimatedContainer>
    </Wrapper>
  );
};

export default SideBar;
