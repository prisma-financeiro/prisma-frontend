import React from 'react';

import { Wrapper, AnimatedContainer } from './styles';
import Accordion from './Accordion';
import { SideBarItem, SideBarOption } from '../../constants/sidebar-navigation';

interface SideBarProps {
  sideBarOptions: SideBarOption[],
}

const SideBar: React.FC<SideBarProps> = ({ sideBarOptions }) => {
  return (
    <Wrapper>
      <AnimatedContainer>
        {sideBarOptions.map((option: SideBarOption, index: number) => {
          return (
            <React.Fragment key={option.title}>
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
