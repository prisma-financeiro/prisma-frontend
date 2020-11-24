import React from 'react';

import {
  FiGlobe,
} from 'react-icons/fi';
export interface SideBarOptions {
  name: string;
  icon: any;
  expand: boolean;
}

export const sideBarOptionLanding: SideBarOptions[] = [
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
];
