import React from 'react';

import {
  FiUsers,
  FiBookOpen,
  FiGlobe,
  FiMessageCircle,
} from 'react-icons/fi';

export default {
  'Fonte de dados': {
    icon: <FiGlobe />,
  },
  'Blog': {
    icon: <FiBookOpen />,
  },
  'Sobre nós': {
    icon: <FiUsers />,
  },
  'Contato': {
    icon: <FiMessageCircle />,
  },
} as const;
