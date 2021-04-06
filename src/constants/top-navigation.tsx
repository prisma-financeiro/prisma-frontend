import React from 'react';

import {
  FiActivity,
  FiHome
} from 'react-icons/fi';

import { IoWalletOutline } from 'react-icons/io5';
import { RiFileChartLine } from 'react-icons/ri';

export default {
  'Início': {
    icon: <FiHome />,
    route: '/home'
  },
  'Ativos': {
    icon: <RiFileChartLine />,
    route: '/assets'
  },
  'Comparar Ativos': {
    icon: <FiActivity />,
    route: '/compare-assets'
  },
  'Carteira': {
    icon: <IoWalletOutline />,
    route: '/portfolio'
  }
} as const;
