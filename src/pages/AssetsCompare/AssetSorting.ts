import { Asset } from '.';

export class AssetSorting {

  public static reorderByIndicators = (assets: Asset[]): Asset[] => {

    // Reorganiza as empresas de acordo com cada indicador, 
    // as empresas que aparecem por primeiro sao as melhores em cada indicador

    //Todo: adicionar valores de valuation (PL, LPA, VPA) para comparacao
    const roe = [...assets.sort((a,b) => a.rentabilidade.roe.value - b.rentabilidade.roe.value).reverse()];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.rentabilidade.roe.ranking = 3 - index;
      } else {
        asset.rentabilidade.roe.ranking = 0;
      }
    });

    const roa = [...assets.sort((a,b) => a.rentabilidade.roa.value - b.rentabilidade.roa.value).reverse()];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.rentabilidade.roa.ranking = 3 - index;
      } else {
        asset.rentabilidade.roa.ranking = 0;
      }
    });

    const roic = [...assets.sort((a,b) => a.rentabilidade.roic.value - b.rentabilidade.roic.value).reverse()];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.rentabilidade.roic.ranking = 3 - index;
      } else {
        asset.rentabilidade.roic.ranking = 0;
      }
    });

    const liqCorrente = [...assets.sort((a,b) => a.endividamento.liquidaCorrente.value - b.endividamento.liquidaCorrente.value).reverse()];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.endividamento.liquidaCorrente.ranking = 3 - index;
      } else {
        asset.endividamento.liquidaCorrente.ranking = 0;
      }
    });

    const passivosAtivos = [...assets.sort((a,b) => a.endividamento.pasivosAtivos.value - b.endividamento.pasivosAtivos.value)];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.endividamento.pasivosAtivos.ranking = 3 - index;
      } else {
        asset.endividamento.pasivosAtivos.ranking = 0;
      }
    });

    const plAtivos = [...assets.sort((a,b) => a.endividamento.plAtivos.value - b.endividamento.plAtivos.value).reverse()];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.endividamento.plAtivos.ranking = 3 - index;
      } else {
        asset.endividamento.plAtivos.ranking = 0;
      }
    });

    const dividaLiquidaEbit = [...assets.sort((a,b) => a.endividamento.dividaLiquidaEbit.value - b.endividamento.dividaLiquidaEbit.value)];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.endividamento.dividaLiquidaEbit.ranking = 3 - index;
      } else {
        asset.endividamento.dividaLiquidaEbit.ranking = 0;
      }
    });


    const dividaLiquidaEbitda = [...assets.sort((a,b) => a.endividamento.dividaLiquidaEbitda.value - b.endividamento.dividaLiquidaEbitda.value)];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.endividamento.dividaLiquidaEbitda.ranking = 3 - index;
      } else {
        asset.endividamento.dividaLiquidaEbitda.ranking = 0;
      }
    });

    const dividaLiquidaPl = [...assets.sort((a,b) => a.endividamento.dividaLiquidaPl.value - b.endividamento.dividaLiquidaPl.value)];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.endividamento.dividaLiquidaPl.ranking = 3 - index;
      } else {
        asset.endividamento.dividaLiquidaPl.ranking = 0;
      }
    });

    const margenBruta = [...assets.sort((a,b) => a.eficiencia.margenBruta.value - b.eficiencia.margenBruta.value).reverse()];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.eficiencia.margenBruta.ranking = 3 - index;
      } else {
        asset.eficiencia.margenBruta.ranking = 0;
      }
    });

    const margenLiquida = [...assets.sort((a,b) => a.eficiencia.margenLiquida.value - b.eficiencia.margenLiquida.value).reverse()];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.eficiencia.margenLiquida.ranking = 3 - index;
      } else {
        asset.eficiencia.margenLiquida.ranking = 0;
      }
    });

    const margenEbit = [...assets.sort((a,b) => a.eficiencia.margenEbit.value - b.eficiencia.margenEbit.value).reverse()];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.eficiencia.margenEbit.ranking = 3 - index;
      } else {
        asset.eficiencia.margenEbit.ranking = 0;
      }
    });

    const margenEbitda = [...assets.sort((a,b) => a.eficiencia.margenEbitda.value - b.eficiencia.margenEbitda.value).reverse()];
    assets.forEach((asset, index) => {
      if (index <= 2) {
        asset.eficiencia.margenEbitda.ranking = 3 - index;
      } else {
        asset.eficiencia.margenEbitda.ranking = 0;
      }
    });

    const weight = [];
    for (let index = 0; index < assets.length; index++) {
      const company = assets[index];

      //Em cada array de indicador, as empresas estao ordenadas da melhor para a pior
      //Logo as empresas que tem o menor indice do array sao as melhores
      //A soma de todos os indices de todos os arrays de indicadores para cada empresa irá atribuir uma pontuacao para cada empresa
      //Quando menor essa pontuacao (aparece mais vezes nos menores indices), melhor a empresa.
      let counter = 0;
      counter = roe.indexOf(company) + 
      roa.indexOf(company) + 
      roic.indexOf(company) +
      liqCorrente.indexOf(company) +
      passivosAtivos.indexOf(company) +
      plAtivos.indexOf(company) +
      dividaLiquidaEbit.indexOf(company) +
      dividaLiquidaEbitda.indexOf(company) +
      dividaLiquidaPl.indexOf(company) + 
      margenBruta.indexOf(company) + 
      margenLiquida.indexOf(company) + 
      margenEbit.indexOf(company) + 
      margenEbitda.indexOf(company);

      company.totalPuntuation = AssetSorting.getTotalPuntuation(company);

      weight.push({id: company.id, name: company.name, weight: counter});
    }

    weight.sort((a, b) => a.weight - b.weight)

    const reorderedAssets: Asset[] = [];
    weight.forEach((element) => {
      reorderedAssets.push(assets.filter(asset => asset.id === element.id)[0]);
    })

    return reorderedAssets;
  }

  private static getTotalPuntuation = (asset: Asset): number => {

    const sum: number = asset.eficiencia.margenBruta.ranking
      + asset.eficiencia.margenEbit.ranking
      + asset.eficiencia.margenEbitda.ranking
      + asset.eficiencia.margenLiquida.ranking
      + asset.endividamento.dividaLiquidaEbit.ranking
      + asset.endividamento.dividaLiquidaEbitda.ranking
      + asset.endividamento.dividaLiquidaPl.ranking
      + asset.endividamento.liquidaCorrente.ranking
      + asset.endividamento.pasivosAtivos.ranking
      + asset.endividamento.plAtivos.ranking
      + asset.rentabilidade.roa.ranking
      + asset.rentabilidade.roe.ranking
      + asset.rentabilidade.roic.ranking
      + asset.valuation.lpa.ranking
      + asset.valuation.pl.ranking
      + asset.valuation.vpa.ranking;

    return sum;
  }
}