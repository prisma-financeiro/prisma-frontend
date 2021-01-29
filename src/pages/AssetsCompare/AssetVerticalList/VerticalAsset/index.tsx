import React from 'react';

import { Container, FieldGroup, DataField, EmptyBlock, AssetHeader } from './styles';
import { Asset } from '../..';
import FavoritedCard from '../../../../components/FavoritedCard';

interface VerticalAssetProps {
  asset: Asset,
  onAssetRemove(assetId: number): void
}

const VerticalAsset: React.FC<VerticalAssetProps> = ({ asset, onAssetRemove }) => {
  return (
    <Container
      exit={{ opacity: 0, scale: 0 }}
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      >
      <AssetHeader>
        <FavoritedCard
          hoverEffect={false}
          roundedCorners={false}
          backgroundDarker={true}
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
      </AssetHeader>
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

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          {asset.endividamento.liquidaCorrente}
        </DataField>
        <DataField>
          {asset.endividamento.pasivosAtivos}
        </DataField>
        <DataField>
          {asset.endividamento.plAtivos}
        </DataField>
        <DataField>
          {asset.endividamento.dividaLiquidaEbit}
        </DataField>
        <DataField>
          {asset.endividamento.dividaLiquidaEbitda}
        </DataField>
        <DataField>
          {asset.endividamento.dividaLiquidaPl}
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          {asset.eficiencia.margenBruta}
        </DataField>
        <DataField>
          {asset.eficiencia.margenLiquida}
        </DataField>
        <DataField>
          {asset.eficiencia.margenEbit}
        </DataField>
        <DataField>
          {asset.eficiencia.margenEbitda}
        </DataField>
      </FieldGroup>
    </Container>
  );
}

export default VerticalAsset;