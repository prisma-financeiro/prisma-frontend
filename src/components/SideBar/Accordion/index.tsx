import React from 'react';

import { FiChevronDown } from 'react-icons/fi';

import { Container } from './styles';

export type AccordionProps = {
  icon: React.ReactNode;
  sectionName: string;
  expand: boolean;
  onClick?: () => {};
};

const Accordion = ({ icon, sectionName, expand, onClick }: AccordionProps) => {
  return (
    <Container onClick={onClick} variant="transparent">
      <div>{icon}</div>
      {sectionName}
      {expand ?? <FiChevronDown />}
    </Container>
  );
};

export default Accordion;
