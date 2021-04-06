import React from 'react';

import { DASHBOARD_ANIMATION } from '../Main/animations';
import Typeahead from '../../components/Typeahead';

import { Container, AnimatedWrapper, Card } from './styles';
import { CARDS_ANIMATION } from '../../constants/animations';
import { DEFAULT_TRANSITION } from '../../constants';

const AssetsExplorer: React.FC = () => {
  
  return (
    <Container>
      <AnimatedWrapper
        variants={DASHBOARD_ANIMATION}
        initial="unMounted"
        animate="mounted"
        exit="unMounted"
        transition={{ duration: 1.5 }}
      >
        <Card
        variants={CARDS_ANIMATION}
        transition={DEFAULT_TRANSITION}
        >
          <Typeahead redirect={true}/>
        </Card>
      </AnimatedWrapper>
    </Container>
  );
}

export default AssetsExplorer;