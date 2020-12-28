import React from 'react';

import {
  FiActivity,
  FiBarChart2,
  FiHome,
  FiSearch
} from 'react-icons/fi';


export default {
  'Início': {
    icon: <FiHome />,
    route: ''
  },
  'Explorar Ativos': {
    icon: <FiSearch />,
    route: ''
  },
  'Comparar Ativos': {
    icon: <FiActivity />,
    route: ''
  },
  'Ranking': {
    icon: <FiBarChart2 />,
    route: ''
  }
} as const;
