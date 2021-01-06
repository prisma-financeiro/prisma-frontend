import React, { useState } from 'react';
import {
  DataWrapper,
  SubHeader,
  ButtonContainer
} from './styles';
import CompanyTickerCard from '../../../components/CompanyTickerCard';
import Modal from '../../../components/Modal';
import Accordion, { AccordionSizes } from '../../../components/Accordion';
import Typeahead from '../../../components/Typeahead';
import { AssetType } from '../../../models';
import Button from '../../../components/Button';

interface CardData {
  id: number
  companyLogo: string,
  tickerCode: string,
  companyName: string,
  stockPrice: number,
  variationReal: number,
  variationPercentage: number,
  type: AssetType
}

const Favorites = () => {

  const [favoriteCards, setFavoriteCards] = useState<CardData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const CARDS_LIMIT = 10;
  const assetsTypes: AssetType[] = [AssetType.Stock, AssetType.Reit, AssetType.Fund, AssetType.Crypto, AssetType.Index];

  const fakeData: CardData = {
    id: 1,
    companyLogo: 'https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png',
    tickerCode: 'MGLU3',
    companyName: 'Magazine Luiza',
    stockPrice: 10.58,
    variationReal: -0.18,
    variationPercentage: -0.51,
    type: AssetType.Stock
  }

  const createNewCompanyTickerCard = () => {
    handleShowModal();
  }

  const removeCompanyTickerCard = (tickerId: number) => {
    //chamada para o backend para remover o card da lista salva pelo usuario;
    setFavoriteCards(favoriteCards.filter(ticker => ticker.id !== tickerId));
  }

  const handleShowModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleModalConfirmed = () => {
    setIsModalOpen(false);
  }

  const handleSelectedOption = (type: AssetType, companyId: number, companyTicker: string) => {
    // chamada para o backend para adicionar o card a lista salva pelo usuário
    const newCard: CardData = fakeData;
    newCard.type = type;
    newCard.id = Math.random();
    newCard.tickerCode = companyTicker;
    setFavoriteCards([...favoriteCards, newCard]);
  }

  const renderFavoriteCards = (assetType: AssetType) => {
    return favoriteCards.find(card => card.type === assetType) && (
      <React.Fragment key={assetType}>
        <SubHeader>
        <h3> 
          { getSubHeader(assetType) } 
        </h3>
        </SubHeader>

        <DataWrapper>
          {favoriteCards.map(card => {
            return card.type === assetType && (
              <CompanyTickerCard
                key={card.id}
                companyLogo={card.companyLogo}
                companyName={card.companyName}
                tickerCode={card.tickerCode}
                stockPrice={card.stockPrice}
                variationPercentage={card.variationPercentage}
                variationReal={card.variationReal}
                emptyCard={false}
                addNewCardCallback={() => { }}
                removeCardCallback={() => removeCompanyTickerCard(card.id)}
              />
            );
          })}
        </DataWrapper>
      </React.Fragment>
    )
  }

  const getSubHeader = (assetType: AssetType): string => {
    const header: { [key: string]: string } = {
      'stock': 'Ações',
      'reit': 'Fundos Imobiliários',
      'fund': 'Fundos',
      'crypto': 'Cryptomoedas',
      'index': 'Index',
    };
    return header[assetType];
  }

  return (
    <>
      <Accordion
        title="Meus Favoritos"
        size={AccordionSizes.large}>

        {favoriteCards.length === 0 && (
          <CompanyTickerCard
            emptyCard={true}
            removeCardCallback={() => { }}
            addNewCardCallback={createNewCompanyTickerCard}
          />
        )}

        {favoriteCards.length > 0 && (
          <ButtonContainer>
            <Button
              onClick={handleShowModal}
              variant="primary"
              disabled={favoriteCards.length >= CARDS_LIMIT}
            >
              Adicionar
            </Button>
          </ButtonContainer>
        )}

        {assetsTypes.map(assetType => renderFavoriteCards(assetType))}

      </Accordion>
      <Modal
        title="Adicionar um favorito"
        show={isModalOpen}
        showButtons={false}
        modalClosed={handleCloseModal}
        modalConfirmed={handleModalConfirmed}>
        <Typeahead
          redirect={false}
          selectedOption={(type: AssetType, companyId: number, companyTicker: string) => {
            handleSelectedOption(type, companyId, companyTicker)
          }
          } />
      </Modal>
    </>
  );
};

export default Favorites;
