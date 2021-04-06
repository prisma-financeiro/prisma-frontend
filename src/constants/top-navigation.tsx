import React from 'react';

import {
  FiActivity,
  FiHome
} from 'react-icons/fi';

import { IoWalletOutline } from 'react-icons/io5';

export default {
  'Início': {
    icon: <FiHome />,
    route: '/home'
  },
  'Comparar Ativos': {
    icon: <FiActivity />,
    route: '/assets-compare'
  },
  'Carteira': {
    icon: <IoWalletOutline />,
    route: '/portfolio'
  }
} as const;
