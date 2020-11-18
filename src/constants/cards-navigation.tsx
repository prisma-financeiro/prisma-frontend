import React from 'react';

import {
  FiBarChart,
  FiBarChart2,
  FiHeart,
  FiActivity,
  FiBookmark,
  FiZap,
} from 'react-icons/fi';


export default {
  'Favoritas': {
    icon: <FiBookmark />,
  },
  'Ranking': {
    icon: <FiBarChart />,
  },
  'Saúde': {
    icon: <FiHeart />,
  },
  'Análises': {
    icon: <FiActivity />,
  },
  'Comparador': {
    icon: <FiBarChart2 />,
  },
  'IPOs': {
    icon: <FiZap />,
  },
} as const;
