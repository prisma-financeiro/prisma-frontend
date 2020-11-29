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
