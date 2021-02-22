import React, { useState, useRef, MutableRefObject, useEffect, useCallback } from 'react';

import { useParams } from "react-router-dom";

import MainContent from '../../components/MainContent';
import { SideBarOption } from '../../constants/sidebar-navigation';
import SideBar from '../../components/SideBar';
import Modal from '../../components/Modal';
import Typeahead from '../../components/Typeahead';

import VerticalHeader from './VerticalHeader';
import VerticalAsset from './VerticalAsset';

import { useBreakpoints } from '../../hooks/useBreakpoints';
import { getCompany, getCompanyIndicator, getTickerPrice } from '../../services/company';

import { RiVipDiamondLine, RiPercentLine, RiFireLine } from 'react-icons/ri';
import { FiTrendingUp } from 'react-icons/fi';

import { AssetType, CompanyInfo } from '../../models';

import { 
  Container, 
  AnimatedWrapper, 
  ComparatorContainer, 
  Placeholder, 
  AssetVerticalList, 
  HorizontalScroll 
} from './styles';

interface IndicatorProps {
  value: number,
  ranking: number,
  simbol?: string
}

export interface Valuation {
  pl: IndicatorProps,
  lpa: IndicatorProps,
  vpa: IndicatorProps,
}

export interface Rentabilidade {
  roe: IndicatorProps,
  roa: IndicatorProps,
  roic: IndicatorProps
}

export interface Endividamento {
  liquidaCorrente: IndicatorProps,
  pasivosAtivos: IndicatorProps,
  plAtivos: IndicatorProps,
  dividaLiquidaEbit: IndicatorProps,
  dividaLiquidaEbitda: IndicatorProps,
  dividaLiquidaPl: IndicatorProps
}

export interface Eficiencia {
  margenBruta: IndicatorProps,
  margenLiquida: IndicatorProps,
  margenEbit: IndicatorProps,
  margenEbitda: IndicatorProps
}
export interface Asset {
  id: number,
  ticker: string,
  logo: string,
  name: string,
  price: number,
  flutuationPercentage: number,
  flutuationValue: number,
  valuation: Valuation,
  rentabilidade: Rentabilidade,
  endividamento: Endividamento,
  eficiencia: Eficiencia,
  totalPuntuation?: number
}

interface CompanyIdentification {
  companyId: number, 
  companyTicker: string
}

interface AssetCompareProps {
  preLoadedCompanyId?: CompanyIdentification; 
}

const AssetsCompare: React.FC<AssetCompareProps> = (props) => {
  
  const device = useBreakpoints();

  const [assetList, setAssetList] = useState<Asset[]>([]);
  const [selectedAssetList, setSelectedAssetList] = useState<CompanyIdentification[]>([]);
  const [placeholderNumber, setPlaceholderNumber] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const valuation = useRef(null);
  const rentabilidade = useRef(null);
  const eficiencia = useRef(null);
  const endividamento = useRef(null);

  const {id, ticker}: any = useParams();

  useEffect(() => {
    if (id && ticker) {
      const getCompanyInfos = async () => {

        const company: CompanyInfo = await getCompany(id);
        const companyIndicators = await getCompanyIndicator(id);
        const tickerInfo = await getTickerPrice(ticker);
  
        setAssetList([createAsset(company, companyIndicators, tickerInfo, ticker)]);
      }

      getCompanyInfos();
    }
  }, [id, ticker]);

  const sideBarOptionCompany: SideBarOption[] = [
    {
      title: 'Indicadores',
      items: [
        {
          name: 'Valuation',
          icon: <RiVipDiamondLine />,
          expand: false,
          onClick: () => scrollTo(valuation),
        },
        {
          name: 'Rentabilidade',
          icon: <RiPercentLine />,
          expand: false,
          onClick: () => scrollTo(rentabilidade),
        },
        {
          name: 'Eficiência',
          icon: <FiTrendingUp />,
          expand: false,
          onClick: () => scrollTo(eficiencia),
        },
        {
          name: 'Endividamento',
          icon: <RiFireLine />,
          expand: false,
          onClick: () => scrollTo(endividamento),
        },
      ]
    },
  ];

  const scrollTo = (ref: MutableRefObject<any>) => ref.current.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start",
  });

  const handleAddAsset = async (selectedAssetList: CompanyIdentification[]) => {

    const formatedAssetList: Asset[] = [...assetList];
    setIsloading(true);

    for await (const asset of selectedAssetList) {
      const company: CompanyInfo = await getCompany(asset.companyId);
      const companyIndicators = await getCompanyIndicator(asset.companyId);
      const tickerInfo = await getTickerPrice(asset.companyTicker);

      const formatedAsset: Asset = createAsset(company, companyIndicators, tickerInfo, asset.companyTicker);
      formatedAssetList.push(formatedAsset);
    }

    const reorderedAssets: Asset[] = reorderByIndicators(formatedAssetList);

    setAssetList(reorderedAssets);
    setIsloading(false);
  }

  const createAsset = (company: CompanyInfo, companyIndicators: any, tickerInfo: any, ticker: string) => {
    return {
      id: company.id,
      ticker: ticker,
      logo: company.logo,
      name: company.name,
      price: tickerInfo.price,
      flutuationPercentage: tickerInfo.variationPercentage,
      flutuationValue: tickerInfo.variationValue,
      valuation: {
        lpa: {value: 1.5, ranking: 0}, //Todo: Add lpa indicator here when available
        pl: {value: 2.5, ranking: 0}, //Todo: Add lp indicator here when available
        vpa: {value: 3.5, ranking: 0}, //Todo: Add vpa indicator here when available
      },
      rentabilidade: {
        roe: {
          value: companyIndicators.rentabilidade[0].value,
          simbol: companyIndicators.rentabilidade[0].signal, 
          ranking: 0
        },
        roa: {
          value: companyIndicators.rentabilidade[1].value,
          simbol: companyIndicators.rentabilidade[1].signal,
          ranking: 0
        },
        roic: {
          value: companyIndicators.rentabilidade[2].value,
          simbol: companyIndicators.rentabilidade[2].signal,
          ranking: 0
        }
      },
      endividamento: {
        liquidaCorrente: {
          value: companyIndicators.endividamento[0].value,
          simbol: companyIndicators.endividamento[0].signal,
          ranking: 0
        },
        pasivosAtivos: {
          value: companyIndicators.endividamento[1].value,
          simbol: companyIndicators.endividamento[1].signal,
          ranking: 0
        },
        plAtivos: {
          value: companyIndicators.endividamento[2].value,
          simbol: companyIndicators.endividamento[2].signal,
          ranking: 0
        },
        dividaLiquidaEbit: {
          value: companyIndicators.endividamento[3].value,
          simbol: companyIndicators.endividamento[3].signal,
          ranking: 0
        },
        dividaLiquidaEbitda: {
          value: companyIndicators.endividamento[4].value,
          simbol: companyIndicators.endividamento[4].signal,
          ranking: 0
        },
        dividaLiquidaPl: {
          value: companyIndicators.endividamento[5].value,
          simbol: companyIndicators.endividamento[5].signal,
          ranking: 0
        },
      },
      eficiencia: {
        margenBruta: {
          value: companyIndicators.eficiencia[0].value,
          simbol: companyIndicators.eficiencia[0].signal,
          ranking: 0
        },
        margenLiquida: {
          value: companyIndicators.eficiencia[1].value,
          simbol: companyIndicators.eficiencia[1].signal,
          ranking: 0
        },
        margenEbit: {
          value: companyIndicators.eficiencia[2].value,
          simbol: companyIndicators.eficiencia[2].signal,
          ranking: 0
        },
        margenEbitda: {
          value: companyIndicators.eficiencia[3].value,
          simbol: companyIndicators.eficiencia[3].signal,
          ranking: 0
        }
      }
    }
  }

  const handleAssetRemove = (assetTicker: string) => {
    const assets = assetList.filter(asset => asset.ticker !== assetTicker);
    const reorderedAssets: Asset[] = reorderByIndicators(assets);
    setAssetList(reorderedAssets);
    setPlaceholderNumber(assets.map(asset => asset.id));
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleModalConfirmed = async () => {
    setIsModalOpen(false);
    handleAddAsset(selectedAssetList);
    setPlaceholderNumber(prev => [...prev, ...selectedAssetList.map(asset => asset.companyId)]);
    setSelectedAssetList([]);
  }

  const handleSelectedOption = (type: AssetType, companyId: number, companyTicker: string) => {
    setSelectedAssetList(prev => [...prev, {companyId: companyId, companyTicker: companyTicker} ]);
  }

  const handleShowModal = () => {
    setIsModalOpen(true);
    setSelectedAssetList([]);
  }

  const reorderByIndicators = (assets: Asset[]): Asset[] => {

    // Reorganiza as empresas de acordo com cada indicador, 
    // as empresas que aparecem por primeiro sao as melhores em cada indicador

    //Todo: adicionar valores de valuation (PL, LPA, VPA) para comparacao
    const roe = [...assets.sort((a,b) => a.rentabilidade.roe.value - b.rentabilidade.roe.value).reverse()];
    assets.forEach((asset, index) => {
      asset.rentabilidade.roe.ranking = index + 1;
    });

    const roa = [...assets.sort((a,b) => a.rentabilidade.roa.value - b.rentabilidade.roa.value).reverse()];
    assets.forEach((asset, index) => {
      asset.rentabilidade.roa.ranking = index + 1;
    });

    const roic = [...assets.sort((a,b) => a.rentabilidade.roic.value - b.rentabilidade.roic.value).reverse()];
    assets.forEach((asset, index) => {
      asset.rentabilidade.roic.ranking = index + 1;
    });

    const liqCorrente = [...assets.sort((a,b) => a.endividamento.liquidaCorrente.value - b.endividamento.liquidaCorrente.value).reverse()];
    assets.forEach((asset, index) => {
      asset.endividamento.liquidaCorrente.ranking = index + 1;
    });

    const passivosAtivos = [...assets.sort((a,b) => a.endividamento.pasivosAtivos.value - b.endividamento.pasivosAtivos.value)];
    assets.forEach((asset, index) => {
      asset.endividamento.pasivosAtivos.ranking = index + 1;
    });

    const plAtivos = [...assets.sort((a,b) => a.endividamento.plAtivos.value - b.endividamento.plAtivos.value).reverse()];
    assets.forEach((asset, index) => {
      asset.endividamento.plAtivos.ranking = index + 1;
    });

    const dividaLiquidaEbit = [...assets.sort((a,b) => a.endividamento.dividaLiquidaEbit.value - b.endividamento.dividaLiquidaEbit.value)];
    assets.forEach((asset, index) => {
      asset.endividamento.dividaLiquidaEbit.ranking = index + 1;
    });


    const dividaLiquidaEbitda = [...assets.sort((a,b) => a.endividamento.dividaLiquidaEbitda.value - b.endividamento.dividaLiquidaEbitda.value)];
    assets.forEach((asset, index) => {
      asset.endividamento.dividaLiquidaEbitda.ranking = index + 1;
    });

    const dividaLiquidaPl = [...assets.sort((a,b) => a.endividamento.dividaLiquidaPl.value - b.endividamento.dividaLiquidaPl.value)];
    assets.forEach((asset, index) => {
      asset.endividamento.dividaLiquidaPl.ranking = index + 1;
    });

    const margenBruta = [...assets.sort((a,b) => a.eficiencia.margenBruta.value - b.eficiencia.margenBruta.value).reverse()];
    assets.forEach((asset, index) => {
      asset.eficiencia.margenBruta.ranking = index + 1;
    });

    const margenLiquida = [...assets.sort((a,b) => a.eficiencia.margenLiquida.value - b.eficiencia.margenLiquida.value).reverse()];
    assets.forEach((asset, index) => {
      asset.eficiencia.margenLiquida.ranking = index + 1;
    });

    const margenEbit = [...assets.sort((a,b) => a.eficiencia.margenEbit.value - b.eficiencia.margenEbit.value).reverse()];
    assets.forEach((asset, index) => {
      asset.eficiencia.margenEbit.ranking = index + 1;
    });

    const margenEbitda = [...assets.sort((a,b) => a.eficiencia.margenEbitda.value - b.eficiencia.margenEbitda.value).reverse()];
    assets.forEach((asset, index) => {
      asset.eficiencia.margenEbitda.ranking = index + 1;
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

      company.totalPuntuation = getTotalPuntuation(company);

      weight.push({id: company.id, name: company.name, weight: counter});
    }

    weight.sort((a, b) => a.weight - b.weight)

    const reorderedAssets: Asset[] = [];
    weight.forEach((element) => {
      reorderedAssets.push(assets.filter(asset => asset.id === element.id)[0]);
    })

    return reorderedAssets;
  }

  const getTotalPuntuation = (asset: Asset): number => {
    const margenBruta = canPunctuate(asset.eficiencia.margenBruta.ranking) ? 1 : 0;
    const margenEbit = canPunctuate(asset.eficiencia.margenEbit.ranking) ? 1 : 0;
    const margenEbitda = canPunctuate(asset.eficiencia.margenEbitda.ranking) ? 1 : 0;
    const margenLiquida = canPunctuate(asset.eficiencia.margenLiquida.ranking) ? 1 : 0;
    const dividaLiquidaEbit = canPunctuate(asset.endividamento.dividaLiquidaEbit.ranking) ? 1 : 0;
    const dividaLiquidaEbitda = canPunctuate(asset.endividamento.dividaLiquidaEbitda.ranking) ? 1 : 0;
    const dividaLiquidaPl = canPunctuate(asset.endividamento.dividaLiquidaPl.ranking) ? 1 : 0;
    const liquidaCorrente = canPunctuate(asset.endividamento.liquidaCorrente.ranking) ? 1 : 0;
    const pasivosAtivos = canPunctuate(asset.endividamento.pasivosAtivos.ranking) ? 1 : 0;
    const plAtivos = canPunctuate(asset.endividamento.plAtivos.ranking) ? 1 : 0;
    const roa = canPunctuate(asset.rentabilidade.roa.ranking) ? 1 : 0;
    const roe = canPunctuate(asset.rentabilidade.roe.ranking) ? 1 : 0;
    const roic = canPunctuate(asset.rentabilidade.roic.ranking) ? 1 : 0;
    const lpa = canPunctuate(asset.valuation.lpa.ranking) ? 1 : 0;
    const pl = canPunctuate(asset.valuation.pl.ranking) ? 1 : 0;
    const vpa = canPunctuate(asset.valuation.vpa.ranking) ? 1 : 0;

    const sum: number = margenBruta
      + margenEbit
      + margenEbitda
      + margenLiquida
      + dividaLiquidaEbit
      + dividaLiquidaEbitda
      + dividaLiquidaPl
      + liquidaCorrente
      + pasivosAtivos
      + plAtivos
      + roa
      + roe
      + roic
      + lpa
      + pl
      + vpa;

    return sum;
  }

  const canPunctuate = (ranking: number): boolean => {
    return ranking > 0 && ranking <= 3;
  }

  return (
    <Container>
      <AnimatedWrapper>
        {
          !device.isTablet &&
          <SideBar sideBarOptions={sideBarOptionCompany} />
        }
        <MainContent>
          <ComparatorContainer>
            <VerticalHeader 
              anchor={{
                endividamento:endividamento, 
                eficiencia: eficiencia, 
                rentabilidade: rentabilidade, 
                valuation: valuation}}
                openModal={handleShowModal}/>
            <HorizontalScroll>
              <AssetVerticalList>
                {isLoading ? 
                  placeholderNumber.map(el => (
                    <Placeholder
                      key={el}
                      exit={{ opacity: 0, scale: 0 }}
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}/>)) : 
                    assetList.map(asset => (
                      <VerticalAsset key={asset.id} asset={asset} onAssetRemove={(assetTicker) => handleAssetRemove(assetTicker)}/>
                    )
                )}
              </AssetVerticalList>
            </HorizontalScroll>
          </ComparatorContainer>
        </MainContent>
        <Modal
          title="Pesquisa de Ativos"
          show={isModalOpen}
          showButtons={true}
          secondaryButtonText="Cancelar"
          primaryButtonText="Carregar ativos"
          modalClosed={handleCloseModal}
          modalConfirmed={handleModalConfirmed}>
          <Typeahead
            redirect={false}
            selectedOption={handleSelectedOption}
            isMulti={true}
            placeholder="Pesquise por nome ou ticker"
            maxSelection={5 - assetList.length}
          />
      </Modal>
      </AnimatedWrapper>
    </Container>
  );
}

export default AssetsCompare;