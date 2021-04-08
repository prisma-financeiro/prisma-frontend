import React, { useRef } from 'react';

import { useBreakpoints } from '../../hooks/useBreakpoints';
import { getSideBarOptionLanding } from '../../constants/sidebar-navigation';
import { DASHBOARD_ANIMATION } from './animations';

import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';

import Favorites from './Favorites';
import MarketToday from './MarketToday';

import { 
  Container, 
  AnimatedWrapper 
} from './styles';

const Main = () => {
  const device = useBreakpoints();

  const stocks = useRef(null);
  const marketToday = useRef(null);

  return (
    <Container>
      <AnimatedWrapper
        variants={DASHBOARD_ANIMATION}
        initial="unMounted"
        animate="mounted"
        exit="unMounted"
        transition={{ duration: 1.5 }}
      >
        {
          !device.isTablet &&
          <SideBar 
            sideBarOptions={getSideBarOptionLanding(stocks, marketToday)} 
          />
        }
        <MainContent>
          <Favorites anchor={stocks}/>
          <MarketToday anchor={marketToday}/>
        </MainContent>
      </AnimatedWrapper>
    </Container>
  );
};

export default Main;