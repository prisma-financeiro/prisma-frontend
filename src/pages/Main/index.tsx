import React, { useEffect } from 'react';

import { Container, AnimatedWrapper } from './styles';
import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import { DASHBOARD_ANIMATION } from './animations';
import { sideBarOptionLanding } from '../../constants';
import Favorites from './Favorites';
import MarketToday from './MarketToday';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import withErrorHandler from '../../hocs/withErrorHandler';
import api from '../../services/api';

const Main = () => {
  const device = useBreakpoints();

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
          <SideBar sideBarOptions={sideBarOptionLanding} />
        }
        <MainContent>
          <Favorites />
          <MarketToday />
        </MainContent>
      </AnimatedWrapper>
    </Container>
  );
};

export default withErrorHandler(Main, api);