import React, { useState } from 'react';
import {
  AnimatedCard,
  DataWrapper,
  SubHeader
} from './styles';
import { CARDS_ANIMATION } from '../../../constants/animations';

import { DEFAULT_TRANSITION } from '../../../constants';
import ContentBlock from '../../../components/ContentBlock';
import CompanyTickerCard from '../../../components/CompanyTickerCard';

interface CardData {
  id: number
  companyLogo: string,
  tickerCode: string,
  companyName: string,
  stockPrice: number,
  variationReal: number,
  variationPercentage: number,
}

const Favorites = () => {

  const [companyTickerCards, setCompanyTickerCards] = useState<CardData[]>([]);
  const CARDS_LIMIT = 10;

  const fakeData: CardData = {
    id: 1,
    companyLogo: 'https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png',
    tickerCode: 'MGLU3',
    companyName: 'Magazine Luiza',
    stockPrice: 10.58,
    variationReal: -0.18,
    variationPercentage: -0.51,
  }

  const createNewCompanyTickerCard = () => {
    const newCard: CardData = fakeData;
    newCard.id = Math.random();
    setCompanyTickerCards([...companyTickerCards, newCard]);
  }

  const removeCompanyTickerCard = (tickerId: number) => {
    //chamada para o backend para remover o card da lista salva pelo usuario;
    setCompanyTickerCards(companyTickerCards.filter(ticker => ticker.id !== tickerId));
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
          {companyTickerCards.map(ticker => {
            return (
              <CompanyTickerCard
                key={ticker.id}
                companyLogo={ticker.companyLogo}
                companyName={ticker.companyName}
                tickerCode={ticker.tickerCode}
                stockPrice={ticker.stockPrice}
                variationPercentage={ticker.variationPercentage}
                variationReal={ticker.variationReal}
                emptyCard={false}
                addNewCardCallback={()=>{}}
                removeCardCallback={() => removeCompanyTickerCard(ticker.id)}
              />
            );
          })}
          {companyTickerCards.length < CARDS_LIMIT && (
            <CompanyTickerCard
              emptyCard={true}
              removeCardCallback={()=>{}}
              addNewCardCallback={createNewCompanyTickerCard}
            />
          )}
        </DataWrapper>
      </AnimatedCard>
    </ContentBlock>
  );
};

export default Favorites;
