import React, { useState } from 'react';

import { company as CompanyService } from "../../../services";
import { user as UserService } from "../../../services";

import FavoritedCard from '../../../components/FavoritedCard';
import Accordion, { AccordionSizes } from '../../../components/Accordion';
import Button from '../../../components/Button';
import AssetSelectModal from '../../../components/AssetSelectModal';

import { AssetType, CompanyInfo, UserAccount } from '../../../models';

import {
  DataWrapper,
  SubHeader,
  ButtonContainer
} from './styles';
import { storageKey } from '../../../utils';


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

interface AssetIdentification {
  assetId: number, 
  assetTicker: string,
  assetType: AssetType
}

const Favorites = () => {

  const [favoritedCards, setFavoritedCards] = useState<CardData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const CARDS_LIMIT = 10;
  const assetsTypes: AssetType[] = [AssetType.Stock, AssetType.Reit, AssetType.Fund, AssetType.Crypto, AssetType.Index];

  const createNewCompanyTickerCard = () => {
    handleShowModal();
  }

  const removeCompanyTickerCard = (tickerId: number) => {
    //chamada para o backend para remover o card da lista salva pelo usuario;
    setFavoritedCards(favoritedCards.filter(ticker => ticker.id !== tickerId));
  }

  const handleShowModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleModalConfirmed = async (selectedAssets: AssetIdentification[]) => {
    const newCards: CardData[] = [];
    for await (const asset of selectedAssets) {
      //await UserService.setUserFavorite(userAccount.id, asset.companyId, assetType, asset.companyTicker)
      newCards.push(await getAssetInformation(asset.assetId, asset.assetTicker, AssetType.Stock));
      
    }
    setIsModalOpen(false);
    setFavoritedCards([...favoritedCards, ...newCards]);
  }

  const getAssetInformation = async (companyId: number, tickerCode: string, assetType: AssetType) => {
    
    const company: CompanyInfo = await CompanyService.getCompany(companyId);
    const tickerPriceInfo = await CompanyService.getTickerPrice(tickerCode);
    const cardData: CardData = {
      id: company.id,
      companyName: company.name,
      companyLogo: company.logo,
      tickerCode: tickerCode,
      stockPrice: tickerPriceInfo.price,
      variationReal: tickerPriceInfo.variationValue,
      variationPercentage: tickerPriceInfo.variationPercentage,
      type: assetType,
    }

    return cardData;
  }

  const renderFavoriteCards = (assetType: AssetType) => {
    return favoritedCards.find(card => card.type === assetType) && (
      <React.Fragment key={assetType}>
        <SubHeader>
          <h3>
            {getSubHeader(assetType)}
          </h3>
        </SubHeader>

        <DataWrapper>
          {favoritedCards.map(card => {
            return card.type === assetType && (
              <FavoritedCard
                key={card.id}
                companyLogo={card.companyLogo}
                companyName={card.companyName}
                tickerCode={card.tickerCode}
                companyId={card.id}
                stockPrice={card.stockPrice}
                variationPercentage={card.variationPercentage}
                variationReal={card.variationReal}
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

        {favoritedCards.length === 0 && (
          <FavoritedCard
            emptyCard={true}
            removeCardCallback={() => { }}
            addNewCardCallback={createNewCompanyTickerCard}
          />
        )}

        {favoritedCards.length > 0 && (
          <ButtonContainer>
            <Button
              onClick={handleShowModal}
              variant="primary"
              disabled={favoritedCards.length >= CARDS_LIMIT}
            >
              Adicionar
            </Button>
          </ButtonContainer>
        )}

        {assetsTypes.map(assetType => renderFavoriteCards(assetType))}

      </Accordion>
      <AssetSelectModal 
        show={isModalOpen} 
        modalClosed={handleCloseModal}
        modalConfirmed={handleModalConfirmed}
        isMulti={true}
        maxSelection={CARDS_LIMIT - favoritedCards.length}/>
    </>
  );
};

export default Favorites;
