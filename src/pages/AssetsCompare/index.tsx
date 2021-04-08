import React, { useState, useRef, useEffect } from 'react';

import { useParams } from "react-router-dom";

import { useBreakpoints } from '../../hooks/useBreakpoints';
import { getCompany, getCompanyIndicator, getTickerPrice } from '../../services/company';

import { CompanyInfo, AssetType } from '../../models';

import MainContent from '../../components/MainContent';
import { getSideBarOptionsAssetCompare } from '../../constants/sidebar-navigation';
import SideBar from '../../components/SideBar';
import AssetSelectModal from '../../components/AssetSelectModal';

import { AssetSorting } from './AssetSorting';
import VerticalHeader from './VerticalHeader';
import VerticalAsset from './VerticalAsset';

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

interface AssetIdentification {
  assetId: number, 
  assetTicker: string,
  assetType: AssetType
}

const AssetsCompare: React.FC = () => {
  
  const device = useBreakpoints();

  const [assetList, setAssetList] = useState<Asset[]>([]);
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

  const loadAssets = async (selectedAssetList: AssetIdentification[]) => {
    setIsloading(true);
    const formatedAssetList: Asset[] = [...assetList];

    for await (const asset of selectedAssetList) {
      const company: CompanyInfo = await getCompany(asset.assetId);
      const companyIndicators = await getCompanyIndicator(asset.assetId);
      const tickerInfo = await getTickerPrice(asset.assetTicker);

      const formatedAsset: Asset = createAsset(company, companyIndicators, tickerInfo, asset.assetTicker);
      formatedAssetList.push(formatedAsset);
    }

    const reorderedAssets: Asset[] = AssetSorting.reorderByIndicators(formatedAssetList);

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
    const reorderedAssets: Asset[] = AssetSorting.reorderByIndicators(assets);
    setAssetList(reorderedAssets);
    setPlaceholderNumber(assets.map(asset => asset.id));
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleModalConfirmed = async (selectedItems: AssetIdentification[]) => {
    setIsModalOpen(false);
    setPlaceholderNumber(prev => [...prev, ...selectedItems.map(asset => asset.assetId)]);
    loadAssets(selectedItems);
  }

  const handleShowModal = () => {
    setIsModalOpen(true);
  }

  return (
    <Container>
      <AnimatedWrapper>
        {
          !device.isTablet &&
          <SideBar 
            sideBarOptions={
              getSideBarOptionsAssetCompare(valuation, rentabilidade, eficiencia, endividamento)
            } 
          />
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

      <AssetSelectModal 
        show={isModalOpen} 
        modalClosed={handleCloseModal}
        modalConfirmed={handleModalConfirmed}
        isMulti={true}
        maxSelection={5 - assetList.length}/>
      </AnimatedWrapper>
    </Container>
  );
}

export default AssetsCompare;