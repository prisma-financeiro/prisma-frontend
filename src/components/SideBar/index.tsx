import React from 'react';

import { Wrapper, AnimatedContainer } from './styles';
import Accordion from './Accordion';

import { DEFAULT_TRANSITION } from '../../constants';
import { SideBarItem, SideBarOption } from '../../constants/sidebar-navigation';
import { Divider } from '../ContentDivider/styles';

const animation = {
  unMounted: { opacity: 0, y: -50 },
  mounted: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, ...DEFAULT_TRANSITION },
  },
};

interface SideBarProps {
  sideBarOptions: SideBarOption[],
}

const SideBar: React.FC<SideBarProps> = ({ sideBarOptions }) => {
  return (
    <Wrapper>
      <AnimatedContainer variants={animation}>
        {sideBarOptions.map((option: SideBarOption, index: number) => {
          return (
            <React.Fragment key={option.title}>
              {/* {index > 0 && (<Divider />)} */}
              <p>{option.title}</p>
              {option.items.map((item: SideBarItem) => (<Accordion key={item.name} icon={item.icon} sectionName={item.name} expand={item.expand} onClick={item.onClick} />))}
            </React.Fragment>
          )
        })
        }
      </AnimatedContainer>
    </Wrapper>
  );
};

export default SideBar;
