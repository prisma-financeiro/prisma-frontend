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
          <div>
            <h4>Fale conosco</h4>
            <span>
              Ligue 99999 99999 (Regiões Metropolitanas) ou 0800 999 99999 (Demais
              Regiões) | Horário de Atendimento: 08:00h às 20:00h.
            </span>
            <span>® Todos os direitos reservados</span>
          </div>
        </Wrapper>
      </FooterSection>
    </AnimatedContainer>
  );
};

export default Footer;
