import React, { useState } from 'react';

import { AnimatedCard, ContentHeader, CardBody, ButtonWrapper } from './styles';
import { CARDS_ANIMATION } from '../../constants/animations';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { DEFAULT_TRANSITION } from '../../constants';

export enum CardSizes {
  'small' = '25%',
  'medium' = '50%',
  'large' = '100%'
}

interface CardProps {
  size: CardSizes;
  title: string;
}

const Card: React.FC<CardProps> = ({ title, size, children }) => {
  const [toggled, setToggle] = useState(true);
  return (
    <AnimatedCard
      key="statement"
      variants={CARDS_ANIMATION}
      transition={DEFAULT_TRANSITION}
      size={size}
    >
      <ContentHeader onClick={() => setToggle(!toggled)} >
        <h2>{title}</h2>
        <ButtonWrapper>
          {toggled ? <FiChevronUp onClick={() => setToggle(!toggled)} /> : <FiChevronDown/>}
        </ButtonWrapper>
      </ContentHeader>
      <CardBody
        hidden={!toggled}>
        {children}
      </CardBody>
    </AnimatedCard>
  )
}

export default Card;