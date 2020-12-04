import React from 'react';

import { Container } from './styles';

interface BackdropProps {
  clicked: () => void;
  show: boolean;
}

export const Backdrop: React.FC<BackdropProps> = ({ show, clicked }) => (
  show ? <Container onClick={clicked}></Container> : null
);