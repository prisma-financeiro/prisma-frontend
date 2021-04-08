import React, { useRef, useEffect } from 'react';

import { useBreakpoints } from '../../hooks/useBreakpoints';
import { getSideBarOptionsLanding, scrollTo } from '../../constants/sidebar-navigation';
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

  const top = useRef(null);
  const stocks = useRef(null);
  const marketToday = useRef(null);

  useEffect(() => {
    scrollTo(top);
  })

  return (
    <Container ref={top}>
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
            sideBarOptions={getSideBarOptionsLanding(stocks, marketToday)} 
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