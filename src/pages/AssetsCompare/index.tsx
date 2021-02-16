import React, { useState, useRef, MutableRefObject } from 'react';

import axios from '../../services/api';

import { useBreakpoints } from '../../hooks/useBreakpoints';
import { getCompany, getCompanyIndicator, getTickerPrice } from '../../services/company';

import MainContent from '../../components/MainContent';
import { SideBarOption } from '../../constants/sidebar-navigation';
import SideBar from '../../components/SideBar';
import Modal from '../../components/Modal';
import Typeahead from '../../components/Typeahead';

import { RiVipDiamondLine, RiPercentLine, RiFireLine } from 'react-icons/ri';
import { FiTrendingUp } from 'react-icons/fi';

import { AssetType, CompanyInfo } from '../../models';
import { Container, AnimatedWrapper, ComparatorContainer, Placeholder, AssetVerticalList, HorizontalScroll } from './styles';
import WithErrorHandler from '../../hoc/withErrorHandler';
import VerticalHeader from './VerticalHeader';
import VerticalAsset from './VerticalAsset';

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
  flutuationPercentage: number,
  flutuationValue: number,
  valuation: Valuation,
  rentabilidade: Rentabilidade,
  endividamento: {
    liquidaCorrente: number,
    pasivosAtivos: number,
    plAtivos: number,
    dividaLiquidaEbit: number,
    dividaLiquidaEbitda: number,
    dividaLiquidaPl: number
  },
  eficiencia: {
    margenBruta: number,
    margenLiquida: number,
    margenEbit: number,
    margenEbitda: number
  }
}

interface CompanyId {
  companyId: number, 
  companyTicker: string
}

const AssetsCompare: React.FC = () => {
  
  const device = useBreakpoints();

  const [assetList, setAssetList] = useState<Asset[]>([]);
  const [selectedAssetList, setSelectedAssetList] = useState<CompanyId[]>([]);
  const [placeholderNumber, setPlaceholderNumber] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const valuation = useRef(null);
  const rentabilidade = useRef(null);
  const eficiencia = useRef(null);
  const endividamento = useRef(null);

  const handleAddAsset = async (selectedAssetList: CompanyId[]) => {

    const formatedAssetList: Asset[] = [];
    setIsloading(true);

    for await (const asset of selectedAssetList) {
      const company: CompanyInfo = await getCompany(asset.companyId);
      const companyIndicators = await getCompanyIndicator(asset.companyId);
      const tickerInfo = await getTickerPrice(asset.companyTicker);

      const formatedAsset: Asset = {
        id: company.id,
        ticker: asset.companyTicker,
        logo: company.logo,
        name: company.name,
        price: tickerInfo.price,
        flutuationPercentage: tickerInfo.variationPercentage,
        flutuationValue: tickerInfo.variationValue,
        rentabilidade: {
          roe: companyIndicators.rentabilidade[0].value,
          roa: companyIndicators.rentabilidade[1].value,
          roic: companyIndicators.rentabilidade[2].value
        },
        valuation: {
          lpa: 1.5, //Todo: Add lpa indicator here when available
          pl: 2.7, //Todo: Add lp indicator here when available
          vpa: 4.3 //Todo: Add vpa indicator here when available
        },
        endividamento: {
          liquidaCorrente: companyIndicators.endividamento[0].value,
          pasivosAtivos: companyIndicators.endividamento[1].value,
          plAtivos: companyIndicators.endividamento[2].value,
          dividaLiquidaEbit: companyIndicators.endividamento[3].value,
          dividaLiquidaEbitda: companyIndicators.endividamento[4].value,
          dividaLiquidaPl: companyIndicators.endividamento[5].value,
        },
        eficiencia: {
          margenBruta: companyIndicators.eficiencia[0].value,
          margenLiquida: companyIndicators.eficiencia[1].value,
          margenEbit: companyIndicators.eficiencia[2].value,
          margenEbitda: companyIndicators.eficiencia[3].value
        }
      }
      formatedAssetList.push(formatedAsset);
    }

    setAssetList(prev => [...prev, ...formatedAssetList]);
    setIsloading(false);
  }

  const handleAssetRemove = (assetTicker: string) => {
    const assets = assetList.filter(asset => asset.ticker !== assetTicker);
    setAssetList(assets);
  }

  const scrollTo = (ref: MutableRefObject<any>) => ref.current.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start",
  });

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleModalConfirmed = async () => {
    setIsModalOpen(false);
    handleAddAsset(selectedAssetList);
    setPlaceholderNumber(selectedAssetList.map(asset => asset.companyId));
    setSelectedAssetList([]);
  }

  const handleSelectedOption = (type: AssetType, companyId: number, companyTicker: string) => {
    setSelectedAssetList(prev => [...prev, {companyId: companyId, companyTicker: companyTicker} ]);
  }

  const handleShowModal = () => {
    setIsModalOpen(true);
    setSelectedAssetList([]);
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
                numberOfAssets={assetList.length}
                isLoading={isLoading}
                openModal={handleShowModal}/>
            <HorizontalScroll>
              <AssetVerticalList>
                {isLoading ? 
                  placeholderNumber.map(() => (
                    <Placeholder 
                      exit={{ opacity: 0, scale: 0 }}
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}/>)) : 
                  assetList.map(asset => (
                    <VerticalAsset asset={asset} onAssetRemove={(assetTicker) => handleAssetRemove(assetTicker)}/>)
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
            maxSelection={5}
          />
      </Modal>
      </AnimatedWrapper>
    </Container>
  );
}

export default WithErrorHandler(AssetsCompare, axios);