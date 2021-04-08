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
  title: React.ReactNode | string;
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
      <ContentHeader>
        <h2>{title}</h2>
        <ButtonWrapper onClick={() => setToggle(!toggled)}>
          {toggled ? <FiChevronDown /> : <FiChevronUp />}
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