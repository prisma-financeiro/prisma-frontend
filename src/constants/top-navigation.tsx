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
  },
  'Explorar Ativos': {
    icon: <FiSearch />,
  },
  'Comparar Ativos': {
    icon: <FiActivity />,
  },
  'Ranking': {
    icon: <FiBarChart2 />,
  }
} as const;
