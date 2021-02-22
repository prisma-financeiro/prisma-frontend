import React from 'react';

import FavoritedCard from '../../../components/FavoritedCard';

import { Asset } from '..';

import { 
  Container, 
  FieldGroup, 
  DataField, 
  EmptyBlock, 
  AssetHeader, 
  RankingPlace } from './styles';

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
          stockPrice={asset.price}
          variationPercentage={asset.flutuationPercentage}
          variationReal={asset.flutuationValue}
          addNewCardCallback={() => { }}
          removeCardCallback={() => onAssetRemove(asset.ticker)}
        />
        <span>
          {asset.totalPuntuation ? `Pontuou em ${asset.totalPuntuation} de 16 indicadores`: '-'}
        </span>
      </AssetHeader>
      <FieldGroup>
        <EmptyBlock />
        <DataField>
          { getIndicatorValueFormated(asset.valuation.pl.value, asset.valuation.pl.simbol) }
          <span>
            <RankingPlace ranking={asset.valuation.pl.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.valuation.lpa.value, asset.valuation.lpa.simbol) }
          <span>
            <RankingPlace ranking={asset.valuation.lpa.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.valuation.vpa.value, asset.valuation.vpa.simbol) }
          <span>
            <RankingPlace ranking={asset.valuation.vpa.ranking} />
          </span>
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          { getIndicatorValueFormated(asset.rentabilidade.roe.value, asset.rentabilidade.roe.simbol) }
          <span>
            <RankingPlace ranking={asset.rentabilidade.roe.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.rentabilidade.roa.value, asset.rentabilidade.roa.simbol) }
          <span>
            <RankingPlace ranking={asset.rentabilidade.roa.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.rentabilidade.roic.value, asset.rentabilidade.roic.simbol) }
          <span>
            <RankingPlace ranking={asset.rentabilidade.roic.ranking} />
          </span>
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.liquidaCorrente.value, asset.endividamento.liquidaCorrente.simbol) }
          <span>
            <RankingPlace ranking={asset.endividamento.liquidaCorrente.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.pasivosAtivos.value, asset.endividamento.pasivosAtivos.simbol) }
          <span>
            <RankingPlace ranking={asset.endividamento.pasivosAtivos.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.plAtivos.value, asset.endividamento.plAtivos.simbol) }
          <span>
            <RankingPlace ranking={asset.endividamento.plAtivos.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.dividaLiquidaEbit.value, asset.endividamento.dividaLiquidaEbit.simbol) }
          <span>
            <RankingPlace ranking={asset.endividamento.dividaLiquidaEbit.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.dividaLiquidaEbitda.value, asset.endividamento.dividaLiquidaEbitda.simbol) }
          <span>
            <RankingPlace ranking={asset.endividamento.dividaLiquidaEbitda.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.endividamento.dividaLiquidaPl.value, asset.endividamento.dividaLiquidaPl.simbol) }
          <span>
            <RankingPlace ranking={asset.endividamento.dividaLiquidaPl.ranking} />
          </span>
        </DataField>
      </FieldGroup>

      <FieldGroup>
        <EmptyBlock />
        <DataField>
          { getIndicatorValueFormated(asset.eficiencia.margenBruta.value, asset.eficiencia.margenBruta.simbol) }
          <span>
            <RankingPlace ranking={asset.eficiencia.margenBruta.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.eficiencia.margenLiquida.value, asset.eficiencia.margenLiquida.simbol) }
          <span>
            <RankingPlace ranking={asset.eficiencia.margenLiquida.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.eficiencia.margenEbit.value, asset.eficiencia.margenEbit.simbol) }
          <span>
            <RankingPlace ranking={asset.eficiencia.margenEbit.ranking} />
          </span>
        </DataField>
        <DataField>
          { getIndicatorValueFormated(asset.eficiencia.margenEbitda.value, asset.eficiencia.margenEbitda.simbol) }
          <span>
            <RankingPlace ranking={asset.eficiencia.margenEbitda.ranking} />
          </span>
        </DataField>
      </FieldGroup>
    </Container>
  );
}

export default VerticalAsset;