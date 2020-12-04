import React from 'react';

import { Container, AnimatedWrapper, CompanyHeader, Divider, HeaderContainer, ValueContainer, ButtonContainer, CompanyLogo, Title } from './styles';
import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import { DASHBOARD_ANIMATION } from './animations';
import { sideBarOptionCompany } from '../../constants';
import ContentBlock from '../../components/ContentBlock';
import { AnimatedCard } from './styles';
import IndicatorCard from '../../components/IndicatorCard';
import fakeData from "./fakeData";
import Button from '../../components/Button';

const companyFakeData = {
  companyLogo: 'https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png',
  tickerCode: 'MGLU3',
  companyName: 'Magazine Luiza',
  cnpj: '01.145.123/0001-02',
  variationReal: -0.18,
  variationPercentage: -0.51,
}

const companyFakeTickers = [
  { stockCode: 'MGLU3', type: 'ON' },
  { stockCode: 'MGLU4', type: 'PN' },
  { stockCode: 'MGLU5', type: 'PN' }
]

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
          <HeaderContainer>
            <CompanyHeader>
              <CompanyLogo src={companyFakeData.companyLogo} />
              <Title>
                <h1>{companyFakeData.tickerCode}</h1>
                <p>{companyFakeData.companyName}</p>
              </Title>
            </CompanyHeader>
            <ButtonContainer>
              <Button onClick={() => alert('test')} variant="primary">Seguir</Button>
              <Button onClick={() => alert('test')} variant="primary">Comparar</Button>
            </ButtonContainer>
            <ValueContainer>
              <h1>Valor</h1>
              <h1>Valor</h1>
              <h1>Valor</h1>
              <h1>Valor</h1>
            </ValueContainer>

          </HeaderContainer>
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
