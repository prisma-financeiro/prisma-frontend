import React from 'react';

import { IoConstructOutline } from 'react-icons/io5';
import { Container, Background, Content } from './styles';

const Portfolio: React.FC = () => {
  return <Container>
    <Background>
    </Background>
    <Content
    initial={{ opacity: 0, scale: 0.75 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    >
      <span><IoConstructOutline /></span>
      <h1>Página em construção</h1>
      <h3>Em breve voce poderá acompanhar os seus investimentos por aqui.</h3>
    </Content>
  </Container>
}

export default Portfolio;