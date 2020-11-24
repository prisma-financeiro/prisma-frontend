import React from 'react';
import {
  AnimatedCard,
  Header,
  DataWrapper,
  SubHeader
} from './styles';
import { CARDS_ANIMATION } from '../../../constants/animations';

import { DEFAULT_TRANSITION } from '../../../constants';
import ContentBlock from '../../../components/ContentBlock';
import CompanyTickerCard from '../../../components/CompanyTickerCard';


const MarketToday = () => {

  return (
    <ContentBlock>
      <AnimatedCard
        key="statement"
        variants={CARDS_ANIMATION}
        transition={DEFAULT_TRANSITION}
      >
        <Header>
          <h2>Mercado Hoje</h2>
        </Header>
        <SubHeader>
          <h3>Ibovespa</h3>
        </SubHeader>

        <DataWrapper>
          <CompanyTickerCard />
          <CompanyTickerCard />
          <CompanyTickerCard />
          <CompanyTickerCard />
          <CompanyTickerCard />
          <CompanyTickerCard />
          <CompanyTickerCard />
        </DataWrapper>
      </AnimatedCard>
    </ContentBlock>
  );
};

export default MarketToday;
