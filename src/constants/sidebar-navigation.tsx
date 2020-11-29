import React from 'react';

import {
  FiGlobe,
} from 'react-icons/fi';

export interface SideBarOption {
  title: string;
  items: Array<SideBarItem>;
}

export interface SideBarItem {
  name: string;
  icon: any;
  expand: boolean;
}

export const sideBarOptionLanding: SideBarOption[] = [
  {
    title: 'Seus Favoritos',
    items: [
      {
        name: 'Acoes',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Fundos Imobiliarios',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Fundos de investimentos',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'BDRs',
        icon: <FiGlobe />,
        expand: false,
      },
    ]
  },
  {
    title: 'Mercado Hoje',
    items: [
      {
        name: 'IBOV',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'IFIX',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'BDRX',
        icon: <FiGlobe />,
        expand: false,
      }
    ]
  }

];

export const sideBarOptionCompany: SideBarOption[] = [
  {
    title: 'Indicadores',
    items: [
      {
        name: 'Valuation',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Rentabilidade',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Lucratividade',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Endividamento',
        icon: <FiGlobe />,
        expand: false,
      },
    ]
  },
  {
    title: 'Histórico',
    items: [
      {
        name: 'Cotação',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Proventos',
        icon: <FiGlobe />,
        expand: false,
      }
    ]
  },
  {
    title: 'Relatórios Financeiros',
    items: [
      {
        name: 'DRE',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Balanço Patrimonial',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Fluxo de Caixa',
        icon: <FiGlobe />,
        expand: false,
      }
    ]
  },
  {
    title: 'Sobre a Empresa',
    items: [
      {
        name: 'Dados Gerais',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Contato',
        icon: <FiGlobe />,
        expand: false,
      },
      {
        name: 'Notícias sobre a Empresa',
        icon: <FiGlobe />,
        expand: false,
      }
    ]
  }

];
