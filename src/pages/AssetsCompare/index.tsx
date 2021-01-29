import React, { useState } from 'react';

import { Container, AnimatedWrapper, ButtonContainer, ComparatorContainer, AssetHeader } from './styles';
import AssetVerticalList from './AssetVerticalList';
import FavoritedCard from '../../components/FavoritedCard';
import MainContent from '../../components/MainContent';
import { SideBarOption } from '../../constants/sidebar-navigation';
import { RiVipDiamondLine, RiPercentLine, RiFireLine } from 'react-icons/ri';
import { FiTrendingUp } from 'react-icons/fi';
import SideBar from '../../components/SideBar';
import { useBreakpoints } from '../../hooks/useBreakpoints';

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
  flutuation: number,
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

const AssetsCompare: React.FC = () => {
  
  const device = useBreakpoints();

  const [assetList, setAssetList] = useState<Asset[]>([]);


  const handleAdicionatAsset = () => {
    const asset: Asset = {
      id: Math.random(),
      ticker: 'MGLU3',
      logo: 'https://pd-fintech.s3.eu-central-1.amazonaws.com/logos/mglu.png',
      name: 'Magazine Luiza',
      price: 15,
      flutuation: 15,
      rentabilidade: {
        roa: 1.2,
        roe: 3.3,
        roic: 2.4
      },
      valuation: {
        lpa: 1.5,
        pl: 2.7,
        vpa: 4.3
      },
      endividamento: {
        dividaLiquidaEbit: 13,
        dividaLiquidaEbitda: 14,
        dividaLiquidaPl: 32,
        liquidaCorrente: 21,
        pasivosAtivos: 1,
        plAtivos: 45
      },
      eficiencia: {
        margenBruta: 23,
        margenEbit: 12,
        margenEbitda: 45,
        margenLiquida: 65
      }
    }
    setAssetList([...assetList, asset])
  }

  const handleAssetRemove = (assetId: number) => {
    const assets = assetList.filter(asset => asset.id !== assetId);
    setAssetList(assets);
  }

  const sideBarOptionCompany: SideBarOption[] = [
    {
      title: 'Indicadores',
      items: [
        {
          name: 'Valuation',
          icon: <RiVipDiamondLine />,
          expand: false,
        },
        {
          name: 'Rentabilidade',
          icon: <RiPercentLine />,
          expand: false,
        },
        {
          name: 'Eficiência',
          icon: <FiTrendingUp />,
          expand: false,
        },
        {
          name: 'Endividamento',
          icon: <RiFireLine />,
          expand: false,
        },
      ]
    },
  ];

  return (
    <Container>
      <AnimatedWrapper>
        {
          !device.isMobile &&
          <SideBar sideBarOptions={sideBarOptionCompany} />
        }
        <MainContent>
          <ComparatorContainer>

              <AssetVerticalList assetList={assetList} onAssetRemove={(assetId) => handleAssetRemove(assetId)}/>

              { assetList.length < 5 && (
                <AssetHeader>
                  <ButtonContainer>
                    <FavoritedCard
                      roundedCorners={false}
                      emptyCard={true}
                      backgroundDarker={true}
                      removeCardCallback={() => { }}
                      addNewCardCallback={handleAdicionatAsset}
                    />
                  </ButtonContainer>
                </AssetHeader>
              )}
            
          </ComparatorContainer>
        </MainContent>
      </AnimatedWrapper>
    </Container>
  );
}

export default AssetsCompare;