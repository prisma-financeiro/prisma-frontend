import React from 'react';

import { Wrapper, AnimatedContainer } from './styles';
import Accordion from './Accordion';

import { DEFAULT_TRANSITION } from '../../constants';
import { SideBarOptions } from '../../constants/sidebar-navigation';

const animation = {
  unMounted: { opacity: 0, y: -50 },
  mounted: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, ...DEFAULT_TRANSITION },
  },
};

interface SideBarProps {
  title: string;
  sideBarOptions: SideBarOptions[],
}

const SideBar: React.FC<SideBarProps>  = ({ sideBarOptions, title }) => {
  return (
    <Wrapper>
      <AnimatedContainer variants={animation}>
        <p>{title}</p>
        {sideBarOptions.map(item => (
          <Accordion key={item.name} icon={item.icon} sectionName={item.name} expand={item.expand}/>
        ))}
      </AnimatedContainer>
    </Wrapper>
  );
};

export default SideBar;
