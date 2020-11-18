import React from 'react';

import { Container, AnimatedWrapper } from './styles';
import SideBar from './SideBar';
import MainContent from './MainContent';
import { DASHBOARD_ANIMATION } from './animations';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Landing = () => {
  return (
    <>
    <Header />
      <Container>
        <AnimatedWrapper
          variants={DASHBOARD_ANIMATION}
          initial="unMounted"
          animate="mounted"
          exit="unMounted"
          transition={{ duration: 1.5 }}
        >
          <SideBar />
          <MainContent />
        </AnimatedWrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Landing;
