import React, { useState } from 'react';

import { Container, AnimatedWrapper, ButtonContainer } from './styles';
import Button from '../../components/Button';
import AssetVerticalList from './AssetVerticalList';
import FavoritedCard from '../../components/FavoritedCard';

export interface Valuation {
  pl: number,
  lpa: number,
  vpa: number,
}

export interface Rentabilidade {
  roe: number,
  roa: number,
  roic: number
}
export interface Asset {
  id: number,
  ticker: string,
  logo: string,
  name: string,
  price: number,
  flutuation: number,
  valuation: Valuation
  rentabilidade: Rentabilidade
}

const AssetsCompare: React.FC = () => {

  const [assetList, setAssetList] = useState<Asset[]>([]);

  const handleAdicionatAsset = () => {
    const asset: Asset = {
      id: Math.random(),
      ticker: 'MGLU3',
      logo: 'https://pd-fintech.s3.eu-central-1.amazonaws.com/logos/mglu.png',
      name: 'Magazine Luiza',
      price: 15,
      flutuation: 15,
      rentabilidade: {
        roa: 1.2,
        roe: 3.3,
        roic: 2.4
      },
      valuation: {
        lpa: 1.5,
        pl: 2.7,
        vpa: 4.3
      }
    }
    setAssetList([...assetList, asset])
  }

  const handleAssetRemove = (assetId: number) => {
    const assets = assetList.filter(asset => asset.id !== assetId);
    setAssetList(assets);
  }

  return (
    <Container>
      <AnimatedWrapper>
          <AssetVerticalList assetList={assetList} onAssetRemove={(assetId) => handleAssetRemove(assetId)}/>

          { assetList.length < 5 && (
            <ButtonContainer>
              <FavoritedCard
                emptyCard={true}
                removeCardCallback={() => { }}
                addNewCardCallback={handleAdicionatAsset}
              />
            </ButtonContainer>
          )}
      </AnimatedWrapper>
    </Container>
  );
}

export default AssetsCompare;