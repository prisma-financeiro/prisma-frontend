import React from 'react';
import {
  AnimatedCard,
  DataWrapper,
  SubHeader
} from './styles';
import { CARDS_ANIMATION } from '../../../constants/animations';

import { DEFAULT_TRANSITION } from '../../../constants';
import ContentBlock from '../../../components/ContentBlock';
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
    <ContentBlock title="Mercado hoje">
      <AnimatedCard
        key="statement"
        variants={CARDS_ANIMATION}
        transition={DEFAULT_TRANSITION}
      >
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
          <CompanyTickerCard
            companyLogo={fakeData.companyLogo}
            companyName={fakeData.companyName}
            tickerCode={fakeData.tickerCode}
            stockPrice={fakeData.stockPrice}
            variationPercentage={fakeData.variationPercentage}
            variationReal={fakeData.variationReal} />
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

export default MarketToday;
