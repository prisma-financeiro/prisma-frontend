import React from 'react';

import { Container, Header } from './styles';

interface SideCardProps {
  title: string;
}

const SideCard: React.FC<SideCardProps> = ({ title }) => {
  return (
    <Container>
      <Header>
        <h2>{title}</h2>
      </Header>
    </Container>
  );
}

export default SideCard;