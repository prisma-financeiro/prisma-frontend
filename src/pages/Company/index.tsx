import React from 'react';

import { Container, AnimatedWrapper } from './styles';
import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import { DASHBOARD_ANIMATION } from './animations';
import { sideBarOptionCompany } from '../../constants';
import ContentBlock from '../../components/ContentBlock';
import { AnimatedCard } from './styles';
import IndicatorCard from '../../components/IndicatorCard';
import fakeData from "./fakeData";


const Company: React.FC<{}> = () => {

  return (
    <Container>

      <AnimatedWrapper
        variants={DASHBOARD_ANIMATION}
        initial="unMounted"
        animate="mounted"
        exit="unMounted"
        transition={{ duration: 1.5 }}
      >
        <SideBar sideBarOptions={sideBarOptionCompany} />
        <MainContent>
          <h1>Info empresa e tickers</h1>
          <h1>Botoes e cotacao</h1>

          <ContentBlock title="Valuation">
            <AnimatedCard>
              {
                fakeData.content[0].valuation.map((indicator: any) => {
                  return indicator && (
                    <IndicatorCard
                      indicatorName={indicator.indicatorName}
                      value={indicator.value}
                    />
                  )
                })
              }
            </AnimatedCard>
          </ContentBlock>

          <ContentBlock title="Rentabilidade">
            <AnimatedCard>
              {
                fakeData.content[0].rentabilidade.map((indicator: any) => {
                  return indicator && (
                    <IndicatorCard
                      indicatorName={indicator.indicatorName}
                      value={indicator.value}
                    />
                  )
                })
              }
            </AnimatedCard>
          </ContentBlock>

          <ContentBlock title="Lucratividade">
            <AnimatedCard>
              {
                fakeData.content[0].eficiencia.map((indicator: any) => {
                  return indicator && (
                    <IndicatorCard
                      indicatorName={indicator.indicatorName}
                      value={indicator.value}
                    />
                  )
                })
              }
            </AnimatedCard>
          </ContentBlock>

          <ContentBlock title="Endividamento">
            <AnimatedCard>
              {
                fakeData.content[0].endividamento.map((indicator: any) => {
                  return indicator && (
                    <IndicatorCard
                      indicatorName={indicator.indicatorName}
                      value={indicator.value}
                    />
                  )
                })
              }
            </AnimatedCard>
          </ContentBlock>

          <ContentBlock title="Cotacao">
            <AnimatedCard>
              <h1>Cotacao content</h1>
            </AnimatedCard>
          </ContentBlock>
          <ContentBlock title="Proventos">
            <AnimatedCard>
              <h1>Proventos content</h1>
            </AnimatedCard>
          </ContentBlock>
          <ContentBlock title="DRE">
            <AnimatedCard>
              <h1>DRE content</h1>
            </AnimatedCard>
          </ContentBlock>
          <ContentBlock title="Balanço Patrimonial">
            <AnimatedCard>
              <h1>Balanço Patrimonial content</h1>
            </AnimatedCard>
          </ContentBlock>
          <ContentBlock title="Fluxo de Caixa">
            <AnimatedCard>
              <h1>Fluxo de Caixa content</h1>
            </AnimatedCard>
          </ContentBlock>
          <ContentBlock title="Dados Gerais">
            <AnimatedCard>
              <h1>Dados Gerais content</h1>
            </AnimatedCard>
          </ContentBlock>
          <ContentBlock title="Contato">
            <AnimatedCard>
              <h1>Contato content</h1>
            </AnimatedCard>
          </ContentBlock>
          <ContentBlock title="Notícias sobra a Empresa">
            <AnimatedCard>
              <h1>Notícias sobra a Empresa</h1>
            </AnimatedCard>
          </ContentBlock>
        </MainContent>
      </AnimatedWrapper>
    </Container>
  );
};

export default Company;
