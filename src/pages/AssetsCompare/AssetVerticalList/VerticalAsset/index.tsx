import React from 'react';

import { Container, FieldGroup, DataField, EmptyBlock } from './styles';
import { Asset } from '../..';
import FavoritedCard from '../../../../components/FavoritedCard';

interface VerticalAssetProps {
  asset: Asset,
  onAssetRemove(assetId: number): void
}

const VerticalAsset: React.FC<VerticalAssetProps> = ({ asset, onAssetRemove }) => {
  return (
    <Container
      whileHover={{ scale: 1.02 }}>
      <FavoritedCard
        key={asset.id}
        companyLogo={asset.logo}
        companyName={asset.name}
        tickerCode={asset.ticker}
        stockPrice={asset.price}
        variationPercentage={asset.flutuation}
        variationReal={asset.flutuation}
        addNewCardCallback={() => { }}
        removeCardCallback={() => onAssetRemove(asset.id)}
      />
      <FieldGroup>
        <EmptyBlock />
        <DataField>
          {asset.valuation.pl}
        </DataField>
        <DataField>
        {asset.valuation.lpa}
        </DataField>
        <DataField>
        {asset.valuation.vpa}
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          {asset.rentabilidade.roe}
        </DataField>
        <DataField>
        {asset.rentabilidade.roa}
        </DataField>
        <DataField>
        {asset.rentabilidade.roic}
        </DataField>
      </FieldGroup>
    </Container>
  );
}

export default VerticalAsset;