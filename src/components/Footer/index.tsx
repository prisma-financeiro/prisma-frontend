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
      <FooterSection as="section">
        <Wrapper>
          <div>
            <h4>Fale conosco</h4>
            <span>
              Ligue 99999 99999 (Regiões Metropolitanas) ou 0800 999 99999 (Demais
              Regiões) | Horário de Atendimento: 08:00h às 20:00h.
            </span>
          </div>
          <span>® Todos os direitos reservados</span>
        </Wrapper>
      </FooterSection>
      <FooterSection as="section" background={colors.background}>
        <Wrapper>
          <div>
            <span>
              <strong>
                Para reclamações, sugestões:
              </strong>
            </span>
            <span>Central de Relacionamento: 9999 99999 / 0800 999 9999</span>
          </div>
        </Wrapper>
      </FooterSection>
    </AnimatedContainer>
  );
};

export default Footer;
