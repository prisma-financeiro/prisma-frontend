import React from 'react';

import { useTheme } from 'styled-components';

import { AnimatedContainer, FooterSection, Wrapper } from './styles';
import { CONTAINER_ANIMATION } from './animations';

const Footer = () => {
  const { colors } = useTheme();

  return (
    <AnimatedContainer
      variants={CONTAINER_ANIMATION}
      initial="unMounted"
      animate="mounted"
      exit="unMounted"
    >
      <FooterSection as="section" background={colors.background}>
        <Wrapper>
            <p>
              O objetivo do site Prisma Financeiro <b>não</b> é fazer sugestão de compra ou venda de ativos, sendo assim, não se responsabiliza pelas decisões e caminhos tomados a partir da análise das informações aqui apresentadas. 
              Nosso objetivo é auxiliar os investidores a terem informações confiáveis de forma simples e fácil. 
              Os dados aqui apresentados sao provenientes de fontes abertas como CVM, B3, Tesouro Nacional e as páginas de relação com investidores das empresas.
            </p>
            <h4>Fale conosco</h4>
            <span>
              Para dúvidas, reclamações ou sugestões <a href="mailto: contato@prisma-financeiro.com.br">contato@prisma-financeiro.com.br</a>
            </span>
            <span>Copyright © 2021 <b>Prisma Financeiro</b> Todos os direitos reservados</span>
        </Wrapper>
      </FooterSection>
    </AnimatedContainer>
  );
};

export default Footer;
