import React from 'react';

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

  const getIndicatorValueFormated = (indicator: number, simbol: string | undefined = ''): string => {
    return indicator ? 
      parseFloat(String(indicator))
        .toFixed(2)
          .replace('.', ',') + simbol : '-';
  }

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
        <EmptyBlock first={true}/>
        <DataField>
          { getIndicatorValueFormated(asset.valuation.pl.value, asset.valuation.pl.simbol) }
          <span>
            {Array.from(Array(asset.valuation.pl.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.valuation.lpa.value, asset.valuation.lpa.simbol) }
          <span>
            {Array.from(Array(asset.valuation.lpa.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.valuation.vpa.value, asset.valuation.vpa.simbol) }
          <span>
            {Array.from(Array(asset.valuation.vpa.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          { getIndicatorValueFormated(asset.rentabilidade.roe.value, asset.rentabilidade.roe.simbol) }
          <span>
            {Array.from(Array(asset.rentabilidade.roe.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.rentabilidade.roa.value, asset.rentabilidade.roa.simbol) }
          <span>
            {Array.from(Array(asset.rentabilidade.roa.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.rentabilidade.roic.value, asset.rentabilidade.roic.simbol) }
          <span>
            {Array.from(Array(asset.rentabilidade.roic.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.liquidaCorrente.value, asset.endividamento.liquidaCorrente.simbol) }
          <span>
            {Array.from(Array(asset.endividamento.liquidaCorrente.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.pasivosAtivos.value, asset.endividamento.pasivosAtivos.simbol) }
          <span>
            {Array.from(Array(asset.endividamento.pasivosAtivos.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.plAtivos.value, asset.endividamento.plAtivos.simbol) }
          <span>
            {Array.from(Array(asset.endividamento.plAtivos.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.dividaLiquidaEbit.value, asset.endividamento.dividaLiquidaEbit.simbol) }
          <span>
            {Array.from(Array(asset.endividamento.dividaLiquidaEbit.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.dividaLiquidaEbitda.value, asset.endividamento.dividaLiquidaEbitda.simbol) }
          <span>
            {Array.from(Array(asset.endividamento.dividaLiquidaEbitda.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.dividaLiquidaPl.value, asset.endividamento.dividaLiquidaPl.simbol) }
          <span>
            {Array.from(Array(asset.endividamento.dividaLiquidaPl.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          { getIndicatorValueFormated(asset.eficiencia.margenBruta.value, asset.eficiencia.margenBruta.simbol) }
          <span>
            {Array.from(Array(asset.eficiencia.margenBruta.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.eficiencia.margenLiquida.value, asset.eficiencia.margenLiquida.simbol) }
          <span>
            {Array.from(Array(asset.eficiencia.margenLiquida.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.eficiencia.margenEbit.value, asset.eficiencia.margenEbit.simbol) }
          <span>
            {Array.from(Array(asset.eficiencia.margenEbit.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.eficiencia.margenEbitda.value, asset.eficiencia.margenEbitda.simbol) }
          <span>
            {Array.from(Array(asset.eficiencia.margenEbitda.ranking), (el, index) => {
              return <AiFillStar key={index}/>;
            })}
          </span>
        </DataField>
      </FieldGroup>
    </Container>
  );
}

export default VerticalAsset;