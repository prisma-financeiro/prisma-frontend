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


const Favorites = () => {

  const fakeData = {
    companyLogo: 'https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png',
    tickerCode: 'MGLU3',
    companyName: 'Magazine Luiza',
    stockPrice: 10.58,
    variationReal: -0.18,
    variationPercentage: -0.51,
  }

  return (
    <ContentBlock title="Seus Favoritos">
      <AnimatedCard
        key="statement"
        variants={CARDS_ANIMATION}
        transition={DEFAULT_TRANSITION}
      >
        <SubHeader>
          <h3>Ações</h3>
        </SubHeader>

        <DataWrapper>
          <CompanyTickerCard
            companyLogo={fakeData.companyLogo}
            companyName={fakeData.companyName}
            tickerCode={fakeData.tickerCode}
            stockPrice={fakeData.stockPrice}
            variationPercentage={fakeData.variationPercentage}
            variationReal={fakeData.variationReal} />
          <CompanyTickerCard
            companyLogo={fakeData.companyLogo}
            companyName={fakeData.companyName}
            tickerCode={fakeData.tickerCode}
            stockPrice={fakeData.stockPrice}
            variationPercentage={fakeData.variationPercentage}
            variationReal={fakeData.variationReal} />
          <CompanyTickerCard
            companyLogo={fakeData.companyLogo}
            companyName={fakeData.companyName}
            tickerCode={fakeData.tickerCode}
            stockPrice={fakeData.stockPrice}
            variationPercentage={fakeData.variationPercentage}
            variationReal={fakeData.variationReal} />
          <CompanyTickerCard
            companyLogo={fakeData.companyLogo}
            companyName={fakeData.companyName}
            tickerCode={fakeData.tickerCode}
            stockPrice={fakeData.stockPrice}
            variationPercentage={fakeData.variationPercentage}
            variationReal={fakeData.variationReal} />
          <CompanyTickerCard
            companyLogo={fakeData.companyLogo}
            companyName={fakeData.companyName}
            tickerCode={fakeData.tickerCode}
            stockPrice={fakeData.stockPrice}
            variationPercentage={fakeData.variationPercentage}
            variationReal={fakeData.variationReal} />
          <CompanyTickerCard
            companyLogo={fakeData.companyLogo}
            companyName={fakeData.companyName}
            tickerCode={fakeData.tickerCode}
            stockPrice={fakeData.stockPrice}
            variationPercentage={fakeData.variationPercentage}
            variationReal={fakeData.variationReal} />
          <CompanyTickerCard
            companyLogo={fakeData.companyLogo}
            companyName={fakeData.companyName}
            tickerCode={fakeData.tickerCode}
            stockPrice={fakeData.stockPrice}
            variationPercentage={fakeData.variationPercentage}
            variationReal={fakeData.variationReal} />
        </DataWrapper>
      </AnimatedCard>
    </ContentBlock>
  );
};

export default Favorites;
