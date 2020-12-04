import React from 'react';

import { Container, AnimatedWrapper, CompanyHeader, HeaderContainer, ValueContainer, ButtonContainer, CompanyLogo, Title, ValueCard, Value } from './styles';
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
  tickerCode: 'MGLU3 ON',
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
            <ValueContainer>
              <ValueCard>
                <Title>Valor Atual</Title>
                <Value>R$17,45</Value>
                <p>1.23%</p>
              </ValueCard>
              <ValueCard>
                <Title>Máxima Mês</Title>
                <Value>R$19,12</Value>
                <p>1.23%</p>
              </ValueCard>
              <ValueCard>
                <Title>Mínima Mês</Title>
                <Value>R$14,08</Value>
                <p>1.23%</p>
              </ValueCard>
            </ValueContainer>
            <ButtonContainer>
              <Button onClick={() => alert('test')} variant="primary">Seguir</Button>
              <Button onClick={() => alert('test')} variant="primary">Comparar</Button>
            </ButtonContainer>
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
