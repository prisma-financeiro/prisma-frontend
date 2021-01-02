import React, { useState } from 'react';

import { AnimatedAccordion, ContentHeader, AccordionBody, ButtonWrapper } from './styles';
import { CARDS_ANIMATION } from '../../constants/animations';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { DEFAULT_TRANSITION } from '../../constants';

export enum AccordionSizes {
  'small' = '25%',
  'medium' = '50%',
  'large' = '100%'
}

interface AccordionProps {
  size: AccordionSizes;
  title: string;
  anchor?: React.MutableRefObject<any>;
}

const Accordion: React.FC<AccordionProps> = ({ title, size, children, anchor }) => {
  const [toggled, setToggle] = useState(false);
  return (
    <AnimatedAccordion
      ref={anchor && anchor}
      key="statement"
      variants={CARDS_ANIMATION}
      transition={DEFAULT_TRANSITION}
      size={size}
    >
      <ContentHeader onClick={() => setToggle(!toggled)} >
        <h2>{title}</h2>
        <ButtonWrapper>
          {toggled ? <FiChevronDown onClick={() => setToggle(!toggled)} /> : <FiChevronUp />}
        </ButtonWrapper>
      </ContentHeader>
      { !toggled && (
        <AccordionBody>
          {children}
        </AccordionBody>
      )}
    </AnimatedAccordion>
  )
}

export default Accordion;