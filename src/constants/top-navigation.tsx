import React from 'react';

import {
  FiActivity,
  FiHome
} from 'react-icons/fi';


export default {
  'Início': {
    icon: <FiHome />,
    route: '/home'
  },
  'Comparar Ativos': {
    icon: <FiActivity />,
    route: '/assets-compare'
  }
} as const;
