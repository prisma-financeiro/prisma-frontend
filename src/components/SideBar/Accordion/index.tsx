import React from 'react';

import { FiChevronDown } from 'react-icons/fi';

import { Container } from './styles';

export type AccordionProps = {
  icon: React.ReactNode;
  sectionName: string;
  expand: boolean;
};

const Accordion = ({ icon, sectionName, expand }: AccordionProps) => {
  return (
    <Container variant="transparent">
      <div>{icon}</div>
      {sectionName}
      {expand ?? <FiChevronDown />}
    </Container>
  );
};

export default Accordion;
