import React from 'react';
import {
  AnimatedContainer,
  AnimatedCard,
  Header,
  DataWrapper,
} from './styles';
import { CONTAINER_ANIMATION, CARDS_ANIMATION } from './animations';

import { DEFAULT_TRANSITION } from '../../../../constants';


const CompanyFollowUp = () => {

  return (
    <AnimatedContainer variants={CONTAINER_ANIMATION}>
      <AnimatedCard
        key="statement"
        variants={CARDS_ANIMATION}
        transition={DEFAULT_TRANSITION}
      >
        <Header iconStroke>
          <h3>Acompanhe as suas empresas favoritas</h3>
        </Header>

        <DataWrapper>
          <p>Empresas aqui...</p>
        </DataWrapper>
      </AnimatedCard>
    </AnimatedContainer>
  );
};

export default CompanyFollowUp;
