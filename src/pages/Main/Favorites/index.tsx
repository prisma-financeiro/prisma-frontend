import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Creators, FavoritesStore } from '../../../store/ducks/favorites';

import FavoritedCard from '../../../components/FavoritedCard';
import Accordion, { AccordionSizes } from '../../../components/Accordion';
import Button from '../../../components/Button';
import AssetSelectModal from '../../../components/AssetSelectModal';

import { AssetType } from '../../../models';

import {
  DataWrapper,
  SubHeader,
  ButtonContainer
} from './styles';

interface AssetIdentification {
  assetId: number, 
  assetTicker: string,
  assetType: AssetType,
  assetTickerId: number
}

const Favorites = () => {

  const dispatch = useDispatch();
  const favorites = useSelector((state: FavoritesStore) => state.favorites);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const CARDS_LIMIT = 10;
  const assetsTypes: AssetType[] = [AssetType.Stock, AssetType.Reit, AssetType.Fund, AssetType.Crypto, AssetType.Index];


  useEffect(() => {
    dispatch(Creators.handleFetchFavorites());
  }, [dispatch]);

  const createNewCompanyTickerCard = () => {
    handleShowModal();
  }

  const removeCompanyTickerCard = async (favoriteId: number) => {
    dispatch(Creators.handleDeleteFavorite(favoriteId));
  }

  const handleShowModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleModalConfirmed = async (selectedAssets: AssetIdentification[]) => {

    for await (const asset of selectedAssets) {
      dispatch(Creators.handleAddFavorite(asset.assetTickerId));
    }

    setIsModalOpen(false);
  }

  const renderFavoriteCards = (assetType: AssetType) => {
    return favorites.find(card => card.type === assetType) && (
      <React.Fragment key={assetType}>
        <SubHeader>
          <h3>
            {getSubHeader(assetType)}
          </h3>
        </SubHeader>

        <DataWrapper>
          {favorites.map(favorite => {
            return favorite.type === assetType && (
              <FavoritedCard
                key={favorite.id}
                companyLogo={favorite.companyLogo}
                companyName={favorite.companyName}
                tickerCode={favorite.tickerCode}
                companyId={favorite.companyId}
                stockPrice={favorite.stockPrice}
                variationPercentage={favorite.variationPercentage}
                variationReal={favorite.variationReal}
                addNewCardCallback={() => { }}
                removeCardCallback={() => removeCompanyTickerCard(favorite.id)}
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

        {favorites.length === 0 && (
          <FavoritedCard
            emptyCard={true}
            removeCardCallback={() => { }}
            addNewCardCallback={createNewCompanyTickerCard}
          />
        )}

        {favorites.length > 0 && (
          <ButtonContainer>
            <Button
              onClick={handleShowModal}
              variant="primary"
              disabled={favorites.length >= CARDS_LIMIT}
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
        maxSelection={CARDS_LIMIT - favorites.length}/>
    </>
  );
};

export default Favorites;
