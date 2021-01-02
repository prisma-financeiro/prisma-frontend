import React, { useState } from 'react';
import {
  DataWrapper,
  SubHeader
} from './styles';
import CompanyTickerCard from '../../../components/CompanyTickerCard';
import Modal from '../../../components/Modal';
import Card, { CardSizes } from '../../../components/Card';
import Typeahead from '../../../components/Typeahead';
import { SearchResultType } from '../../../models';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import ContentDivider from '../../../components/ContentDivider';

interface CardData {
  id: number
  companyLogo: string,
  tickerCode: string,
  companyName: string,
  stockPrice: number,
  variationReal: number,
  variationPercentage: number,
}

export enum FavoriteType {
  Stock = 'stock',
  Fund = 'fund',
  Reit = 'reit',
  Crypto = 'crypto'
}

const Favorites = () => {
  const device = useBreakpoints();

  const [companyTickerCards, setCompanyTickerCards] = useState<CardData[]>([]);
  // TODO: Implementar o botao adicionar para os ativos baixo.
  // const [reitCards, setReitCards] = useState<CardData[]>([]);
  // const [brazilianDepositaryReceiptCards, setBrazilianDepositaryReceiptCards] = useState<CardData[]>([]);
  // const [etfCards, setEtfCards] = useState<CardData[]>([]);
  // const [criptoMoedaCards, setCriptoMoedaCards] = useState<CardData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    handleShowModal();
  }

  const removeCompanyTickerCard = (tickerId: number) => {
    //chamada para o backend para remover o card da lista salva pelo usuario;
    setCompanyTickerCards(companyTickerCards.filter(ticker => ticker.id !== tickerId));
  }

  const handleShowModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleModalConfirmed = () => {
    setIsModalOpen(false);
    const newCard: CardData = fakeData;
    newCard.id = Math.random();
    setCompanyTickerCards([...companyTickerCards, newCard]);
  }

  const handleCodeSearch = (type: SearchResultType, companyId: number, companyTicker: string) => {
    //chamada para o backend aqui
    console.log(companyTicker);
  }

  return (
    <>
      <Card
        title="Meus Favoritos"
        size={CardSizes.large}>
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
                addNewCardCallback={() => { }}
                removeCardCallback={() => removeCompanyTickerCard(ticker.id)}
              />
            );
          })}
          {companyTickerCards.length < CARDS_LIMIT && (
            <CompanyTickerCard
              emptyCard={true}
              removeCardCallback={() => { }}
              addNewCardCallback={createNewCompanyTickerCard}
            />
          )}
        </DataWrapper>
        {!device.isMobile && <ContentDivider />}
        <SubHeader>
          <h3>Fundos Imobiliários</h3>
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
                addNewCardCallback={() => { }}
                removeCardCallback={() => removeCompanyTickerCard(ticker.id)}
              />
            );
          })}
          {companyTickerCards.length < CARDS_LIMIT && (
            <CompanyTickerCard
              emptyCard={true}
              removeCardCallback={() => { }}
              addNewCardCallback={createNewCompanyTickerCard}
            />
          )}
        </DataWrapper>
        {!device.isMobile && <ContentDivider />}
        <SubHeader>
          <h3>Exchange-traded Fund (ETF)</h3>
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
                addNewCardCallback={() => { }}
                removeCardCallback={() => removeCompanyTickerCard(ticker.id)}
              />
            );
          })}
          {companyTickerCards.length < CARDS_LIMIT && (
            <CompanyTickerCard
              emptyCard={true}
              removeCardCallback={() => { }}
              addNewCardCallback={createNewCompanyTickerCard}
            />
          )}
        </DataWrapper>
        {!device.isMobile && <ContentDivider />}
        <SubHeader>
          <h3>Cripto Moedas</h3>
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
                addNewCardCallback={() => { }}
                removeCardCallback={() => removeCompanyTickerCard(ticker.id)}
              />
            );
          })}
          {companyTickerCards.length < CARDS_LIMIT && (
            <CompanyTickerCard
              emptyCard={true}
              removeCardCallback={() => { }}
              addNewCardCallback={createNewCompanyTickerCard}
            />
          )}
        </DataWrapper>
      </Card>
      <Modal
        title="Adicionar um favorito"
        show={isModalOpen}
        showButtons={true}
        primaryButtonText="Adicionar"
        secondaryButtonText="Cancelar"
        modalClosed={handleCloseModal}
        modalConfirmed={handleModalConfirmed}>
        <Typeahead 
          redirect={false} 
          selectedOption={(type: SearchResultType, companyId: number, companyTicker: string) => {
            handleCodeSearch(type, companyId, companyTicker)}
          }/>
      </Modal>
    </>
  );
};

export default Favorites;
