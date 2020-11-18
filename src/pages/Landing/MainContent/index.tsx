import React from 'react';

import { Container } from './styles';
import NavigationCards from './NavigationCards';
import CompanyFollowUp from './CompanyFollowUp';

const MainContent = () => {
  return (
    <Container>
      <NavigationCards />
      <CompanyFollowUp />
    </Container>
  );
};

export default MainContent;
