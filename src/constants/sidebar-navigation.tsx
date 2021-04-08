import React, { MutableRefObject } from 'react';

import { BiBitcoin, BiLineChart, BiSpreadsheet } from 'react-icons/bi';

import { BsBuilding, BsBriefcase } from 'react-icons/bs';

import { RiFileChartLine, RiFundsLine, RiVipDiamondLine, RiPercentLine, RiFireLine, RiHandCoinLine, RiExchangeFundsLine, RiBuilding4Line } from 'react-icons/ri';
import { FiTrendingUp } from 'react-icons/fi';
import { HiOutlineDocumentReport, HiOutlineMail } from 'react-icons/hi';

export interface SideBarOption {
  title: string;
  items: Array<SideBarItem>;
}

export interface SideBarItem {
  name: string;
  icon: any;
  expand: boolean;
  onClick?: () => {};
}

const scrollTo = (ref: MutableRefObject<any>) => ref.current.scrollIntoView({
  behavior: "smooth",
  block: "center",
  inline: "start",
});

export const getSideBarOptionLanding= (stock: MutableRefObject<any>, marketToday: MutableRefObject<any>): SideBarOption[]  => {
  return [
    {
      title: 'Seus Favoritos',
      items: [
        {
          name: 'Ações',
          icon: <RiFileChartLine />,
          expand: false,
          onClick: () => scrollTo(stock),
        },
      ]
    },
    {
      title: 'Mercado Hoje',
      items: [
        {
          name: 'IBOV',
          icon: <RiFundsLine />,
          expand: false,
          onClick: () => scrollTo(marketToday),
        },
        {
          name: 'IFIX',
          icon: <BsBuilding />,
          expand: false,
          onClick: () => scrollTo(marketToday),
        },
      ]
    }
  ]
};

export const getSideBarOptionsCompany = (
  valuation: MutableRefObject<any>,
  rentabilidade: MutableRefObject<any>,
  eficiencia: MutableRefObject<any>,
  endividamento: MutableRefObject<any>,
  cotacao: MutableRefObject<any>,
  proventos: MutableRefObject<any>,
  dre: MutableRefObject<any>,
  balancoPatrimonial: MutableRefObject<any>,
  fluxoCaixa: MutableRefObject<any>,
  mercadoAtuacao: MutableRefObject<any>,
  dadosGerais: MutableRefObject<any>,
  contato: MutableRefObject<any>,
): SideBarOption[] => {
  return [
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
  {
    title: 'Histórico',
    items: [
      {
        name: 'Cotação',
        icon: <BiLineChart />,
        expand: false,
        onClick: () => scrollTo(cotacao),
      },
      {
        name: 'Proventos',
        icon: <RiHandCoinLine />,
        expand: false,
        onClick: () => scrollTo(proventos),
      }
    ]
  },
  {
    title: 'Relatórios Financeiros',
    items: [
      {
        name: 'Demonstração de Resultado',
        icon: <HiOutlineDocumentReport />,
        expand: false,
        onClick: () => scrollTo(dre),
      },
      {
        name: 'Balanço Patrimonial',
        icon: <BiSpreadsheet />,
        expand: false,
        onClick: () => scrollTo(balancoPatrimonial),
      },
      {
        name: 'Fluxo de Caixa',
        icon: <RiExchangeFundsLine />,
        expand: false,
        onClick: () => scrollTo(fluxoCaixa),
      }
    ]
  },
  {
    title: 'Sobre a Empresa',
    items: [
      {
        name: 'Mercado de atuação',
        icon: <BsBuilding />,
        expand: false,
        onClick: () => scrollTo(mercadoAtuacao),
      },
      {
        name: 'Dados Gerais',
        icon: <RiBuilding4Line />,
        expand: false,
        onClick: () => scrollTo(dadosGerais),
      },
      {
        name: 'Contato',
        icon: <HiOutlineMail />,
        expand: false,
        onClick: () => scrollTo(contato),
      },
    ]
  }
];
}