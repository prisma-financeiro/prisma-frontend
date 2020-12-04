import styled from 'styled-components';

import { FiLoader } from 'react-icons/fi';


export const StyledSpinner = styled(FiLoader)`

  @-moz-keyframes spin {
      to { -moz-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
      to { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
      to {transform:rotate(360deg);}
  }

  animation: spin 1500ms linear infinite;
`;
