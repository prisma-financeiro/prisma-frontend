import React from 'react';

import { Container, FieldGroup, DataField, EmptyBlock, AssetHeader } from './styles';
import { Asset } from '..';
import FavoritedCard from '../../../components/FavoritedCard';

interface VerticalAssetProps {
  asset: Asset,
  onAssetRemove(assetTicker: string): void
}

const VerticalAsset: React.FC<VerticalAssetProps> = ({ asset, onAssetRemove }) => {
  return (
    <Container>
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
          variationPercentage={asset.flutuationPercentage}
          variationReal={asset.flutuationValue}
          addNewCardCallback={() => { }}
          removeCardCallback={() => onAssetRemove(asset.ticker)}
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
          {asset.rentabilidade.roe ? parseFloat(String(asset.rentabilidade.roe)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
        {asset.rentabilidade.roa ? parseFloat(String(asset.rentabilidade.roa)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
        {asset.rentabilidade.roic ? parseFloat(String(asset.rentabilidade.roic)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          {asset.endividamento.liquidaCorrente ? parseFloat(String(asset.endividamento.liquidaCorrente)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
          {asset.endividamento.pasivosAtivos ? parseFloat(String(asset.endividamento.pasivosAtivos)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
          {asset.endividamento.plAtivos ? parseFloat(String(asset.endividamento.plAtivos)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
          {asset.endividamento.dividaLiquidaEbit ? parseFloat(String(asset.endividamento.dividaLiquidaEbit)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
          {asset.endividamento.dividaLiquidaEbitda ? parseFloat(String(asset.endividamento.dividaLiquidaEbitda)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
          {asset.endividamento.dividaLiquidaPl ? parseFloat(String(asset.endividamento.dividaLiquidaPl)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          {asset.eficiencia.margenBruta ? parseFloat(String(asset.eficiencia.margenBruta)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
          {asset.eficiencia.margenLiquida ? parseFloat(String(asset.eficiencia.margenLiquida)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
          {asset.eficiencia.margenEbit ? parseFloat(String(asset.eficiencia.margenEbit)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
        <DataField>
          {asset.eficiencia.margenEbitda ? parseFloat(String(asset.eficiencia.margenEbitda)).toFixed(2).replace('.', ',') : '-'}
        </DataField>
      </FieldGroup>
    </Container>
  );
}

export default VerticalAsset;