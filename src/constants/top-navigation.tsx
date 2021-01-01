import React from 'react';

import {
  FiActivity,
  // FiBarChart2,
  FiHome,
  // FiSearch
} from 'react-icons/fi';


export default {
  'Início': {
    icon: <FiHome />,
    route: ''
  },
  'Comparar Ativos': {
    icon: <FiActivity />,
    route: ''
  },
} as const;
