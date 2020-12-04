import React from 'react';
import {
  AnimatedCard,
  DataWrapper,
  SubHeader
} from './styles';
import { CARDS_ANIMATION } from '../../../constants/animations';

import { DEFAULT_TRANSITION } from '../../../constants';
import Card, { CardSizes } from '../../../components/Card';
import CompanyTickerCard from '../../../components/CompanyTickerCard';
import ContentDivider from '../../../components/ContentDivider';


const MarketToday = () => {
  const fakeData = {
    companyLogo: 'https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png',
    tickerCode: 'MGLU3',
    companyName: 'Magazine Luiza',
    stockPrice: 10.58,
    variationReal: -0.18,
    variationPercentage: -0.51,
  }

  return (
    <Card 
      title="Mercado hoje"
      size={CardSizes.large}>
      <SubHeader>
        <h3>Ibovespa</h3>
      </SubHeader>

      <DataWrapper>
        <CompanyTickerCard
          companyLogo={fakeData.companyLogo}
          companyName={fakeData.companyName}
          tickerCode={fakeData.tickerCode}
          stockPrice={fakeData.stockPrice}
          variationPercentage={fakeData.variationPercentage}
          variationReal={fakeData.variationReal}
          emptyCard={false}
          removeCardCallback={()=>{}}
          addNewCardCallback={() => { }} />
      </DataWrapper>

      <ContentDivider />

      <SubHeader>
        <h3>IFIX</h3>
      </SubHeader>

      <DataWrapper>
        <CompanyTickerCard
          companyLogo={fakeData.companyLogo}
          companyName={fakeData.companyName}
          tickerCode={fakeData.tickerCode}
          stockPrice={fakeData.stockPrice}
          variationPercentage={fakeData.variationPercentage}
          variationReal={fakeData.variationReal}
          emptyCard={false}
          removeCardCallback={()=>{}}
          addNewCardCallback={() => { }} />
      </DataWrapper>
    </Card>
  );
};

export default MarketToday;
