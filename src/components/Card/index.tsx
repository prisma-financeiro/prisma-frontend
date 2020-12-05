import React, { useState } from 'react';

import { AnimatedCard, ContentHeader, CardBody, ButtonWrapper } from './styles';
import { CARDS_ANIMATION } from '../../constants/animations';
import { FiChevronDown, FiChevronUp, FiBarChart2 } from 'react-icons/fi';
import { DEFAULT_TRANSITION } from '../../constants';
import { Divider } from '../ContentDivider/styles';

export enum CardSizes {
  'small' = '25%',
  'medium' = '50%',
  'large' = '100%'
}

interface CardProps {
  size: CardSizes;
  title: string;
  chart?: {
    display: Boolean;
    onClick: Function,
  }
}

const Card: React.FC<CardProps> = ({ title, size, chart, children }) => {
  const [toggled, setToggle] = useState(true);
  return (
    <AnimatedCard
      key="statement"
      variants={CARDS_ANIMATION}
      transition={DEFAULT_TRANSITION}
      size={size}
    >
      <ContentHeader>
        <h2>{title}</h2>
        <ButtonWrapper>
          {chart && <FiBarChart2 onClick={() => chart.onClick()} />}
          {toggled ? <FiChevronUp onClick={() => setToggle(!toggled)} /> : <FiChevronDown onClick={() => setToggle(!toggled)} />}
        </ButtonWrapper>
      </ContentHeader>
      <Divider hidden={!toggled} />
      <CardBody
        hidden={!toggled}>
        {children}
      </CardBody>
    </AnimatedCard>
  )
}

export default Card;