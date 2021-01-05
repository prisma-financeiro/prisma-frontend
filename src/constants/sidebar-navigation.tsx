import React from 'react';

import {
  FiGlobe,
} from 'react-icons/fi';

import { BiBitcoin } from 'react-icons/bi';

import { BsBuilding, BsBriefcase } from 'react-icons/bs';

import { RiFileChartLine, RiFundsLine } from 'react-icons/ri';

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

export const sideBarOptionLanding: SideBarOption[] = [
  {
    title: 'Seus Favoritos',
    items: [
      {
        name: 'Ações',
        icon: <RiFileChartLine />,
        expand: false,
      },
      {
        name: 'Fundos Imobiliarios',
        icon: <BsBuilding />,
        expand: false,
      },
      {
        name: 'Fundos de investimentos',
        icon: <BsBriefcase />,
        expand: false,
      },
      {
        name: 'Criptomoedas',
        icon: <BiBitcoin />,
        expand: false,
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
      },
      {
        name: 'IFIX',
        icon: <BsBuilding />,
        expand: false,
      },
    ]
  }

];