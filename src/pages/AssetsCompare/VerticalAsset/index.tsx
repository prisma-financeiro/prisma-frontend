import React from 'react';

import getIndicatorValueFormated from '../../../utils/format-company-indicator';
import FavoritedCard from '../../../components/FavoritedCard';
import { AiFillStar } from 'react-icons/ai';

import { Asset } from '..';

import { 
  Container, 
  FieldGroup, 
  DataField, 
  EmptyBlock, 
  AssetHeader } from './styles';

interface VerticalAssetProps {
  asset: Asset,
  onAssetRemove(assetTicker: string): void
}

const VerticalAsset: React.FC<VerticalAssetProps> = ({ asset, onAssetRemove }) => {

  const getDataFieldJsxForIndicator = (value: number, simbol: string | undefined, ranking: number) => {
    return (
      <DataField>
        { getIndicatorValueFormated(value, simbol) }
        <span>
          {Array.from(Array(ranking), (el, index) => {
            return <AiFillStar key={index}/>;
          })}
        </span>
      </DataField>
    )
  }

  return (
    <Container>
      <AssetHeader>
        <FavoritedCard
          roundedCorners={false}
          backgroundDarker={true}
          key={asset.id}
          companyLogo={asset.logo}
          companyName={asset.name}
          tickerCode={asset.ticker}
          companyId={asset.id}
          stockPrice={asset.price}
          variationPercentage={asset.flutuationPercentage}
          variationReal={asset.flutuationValue}
          addNewCardCallback={() => { }}
          removeCardCallback={() => onAssetRemove(asset.ticker)}
        />
        <span>
          {asset.totalPuntuation ? 
            <>
              <p>{asset.totalPuntuation}</p> 
              <AiFillStar /> 
            </> : '-'
          }
        </span>
      </AssetHeader>
      <FieldGroup>
        <EmptyBlock thinnerHeight={true}/>
        {getDataFieldJsxForIndicator(asset.valuation.pl.value, asset.valuation.pl.simbol, asset.valuation.pl.ranking)}
        {getDataFieldJsxForIndicator(asset.valuation.lpa.value, asset.valuation.lpa.simbol, asset.valuation.lpa.ranking)}
        {getDataFieldJsxForIndicator(asset.valuation.vpa.value, asset.valuation.vpa.simbol, asset.valuation.vpa.ranking)}
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        {getDataFieldJsxForIndicator(asset.rentabilidade.roe.value, asset.rentabilidade.roe.simbol, asset.rentabilidade.roe.ranking)}
        {getDataFieldJsxForIndicator(asset.rentabilidade.roa.value, asset.rentabilidade.roa.simbol, asset.rentabilidade.roa.ranking)}
        {getDataFieldJsxForIndicator(asset.rentabilidade.roic.value, asset.rentabilidade.roic.simbol, asset.rentabilidade.roic.ranking)}
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        {getDataFieldJsxForIndicator(asset.endividamento.liquidaCorrente.value, asset.endividamento.liquidaCorrente.simbol, asset.endividamento.liquidaCorrente.ranking)}
        {getDataFieldJsxForIndicator(asset.endividamento.pasivosAtivos.value, asset.endividamento.pasivosAtivos.simbol, asset.endividamento.pasivosAtivos.ranking)}
        {getDataFieldJsxForIndicator(asset.endividamento.plAtivos.value, asset.endividamento.plAtivos.simbol, asset.endividamento.plAtivos.ranking)}
        {getDataFieldJsxForIndicator(asset.endividamento.dividaLiquidaEbit.value, asset.endividamento.dividaLiquidaEbit.simbol, asset.endividamento.dividaLiquidaEbit.ranking)}
        {getDataFieldJsxForIndicator(asset.endividamento.dividaLiquidaEbitda.value, asset.endividamento.dividaLiquidaEbitda.simbol, asset.endividamento.dividaLiquidaEbitda.ranking)}
        {getDataFieldJsxForIndicator(asset.endividamento.dividaLiquidaPl.value, asset.endividamento.dividaLiquidaPl.simbol, asset.endividamento.dividaLiquidaPl.ranking)}
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        {getDataFieldJsxForIndicator(asset.eficiencia.margenBruta.value, asset.eficiencia.margenBruta.simbol, asset.eficiencia.margenBruta.ranking)}
        {getDataFieldJsxForIndicator(asset.eficiencia.margenLiquida.value, asset.eficiencia.margenLiquida.simbol, asset.eficiencia.margenLiquida.ranking)}
        {getDataFieldJsxForIndicator(asset.eficiencia.margenEbit.value, asset.eficiencia.margenEbit.simbol, asset.eficiencia.margenEbit.ranking)}
        {getDataFieldJsxForIndicator(asset.eficiencia.margenEbitda.value, asset.eficiencia.margenEbitda.simbol, asset.eficiencia.margenEbitda.ranking)}
      </FieldGroup>
    </Container>
  );
}

export default VerticalAsset;