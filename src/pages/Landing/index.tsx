import React from 'react';

import { Container, AnimatedWrapper } from './styles';
import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import { DASHBOARD_ANIMATION } from './animations';
import { sideBarOptionLanding } from '../../constants';
import Favorites from './Favorites';
import MarketToday from './MarketToday';
import SideCard from '../../components/SideCard';

const Landing = () => {
  return (
    <Container>
      <AnimatedWrapper
        variants={DASHBOARD_ANIMATION}
        initial="unMounted"
        animate="mounted"
        exit="unMounted"
        transition={{ duration: 1.5 }}
      >
        <SideBar sideBarOptions={sideBarOptionLanding} />
        <MainContent>
          <Favorites />
          <MarketToday />
        </MainContent>
        <SideCard title="Últimos Eventos"/>
      </AnimatedWrapper>
    </Container>
  );
};

export default Landing;
