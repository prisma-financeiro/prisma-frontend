import React from 'react';

import {
  Container,
  AnimatedWrapper,
  CompanyHeader,
  HeaderContainer,
  ValueContainer,
  ButtonContainer,
  CompanyLogo,
  Title,
  ValueCard,
  Value,
  Interval,
  IntervalItem
} from './styles';

import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import { DASHBOARD_ANIMATION } from './animations';
import { sideBarOptionCompany } from '../../constants';
import Card, { CardSizes } from '../../components/Card';
import { AnimatedCard } from './styles';
import IndicatorCard from '../../components/IndicatorCard';
import { indicator, hitoricoCotacao } from "./fakeData";
import Button from '../../components/Button';
import Chart from 'chart.js';
import LineChart from '../../components/LineChart';

const companyFakeData = {
  companyLogo: 'https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png',
  tickerCode: 'MGLU3 ON',
  companyName: 'Magazine Luiza',
  cnpj: '01.145.123/0001-02',
  variationReal: -0.18,
  variationPercentage: -0.51,
}

const cotacaoFake = [
  { time: '2020-11-01', value: 11.34 },
  { time: '2020-11-02', value: 11.89 },
  { time: '2020-11-03', value: 11.05 },
  { time: '2020-11-04', value: 10.34 },
  { time: '2020-11-05', value: 11.52 },
  { time: '2020-11-06', value: 12.87 },
  { time: '2020-11-07', value: 12.56 },
  { time: '2020-11-08', value: 13.49 },
  { time: '2020-11-09', value: 14.01 },
  { time: '2020-11-10', value: 14.22 },
  { time: '2020-11-11', value: 15.99 },
  { time: '2020-11-12', value: 17.48 },
  { time: '2020-11-13', value: 16.42 },
  { time: '2020-11-14', value: 17.63 },
  { time: '2020-11-15', value: 17.04 },
  { time: '2020-11-16', value: 12.23 },
  { time: '2020-11-17', value: 12.56 },
  { time: '2020-11-18', value: 9.45 },
  { time: '2020-11-20', value: 8.88 },
  { time: '2020-11-21', value: 9.41 },
  { time: '2020-11-22', value: 5.52 },
  { time: '2020-11-23', value: 4.46 },
  { time: '2020-11-24', value: 12.28 },
  { time: '2020-11-25', value: 13.88 },
  { time: '2020-11-26', value: 14.52 },
];

const interval = ["30 Dias", "1 Ano", "5 Anos"];

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
          <Card title="Valuation" size={CardSizes.large}>
            <AnimatedCard>
              {
                indicator.content[0].valuation.map((indicator: any) => {
                  return indicator && (
                    <IndicatorCard
                      indicatorName={indicator.indicatorName}
                      value={indicator.value}
                    />
                  )
                })
              }
            </AnimatedCard>
          </Card>
          <Card title="Rentabilidade" size={CardSizes.large}>
            <AnimatedCard>
              {
                indicator.content[0].rentabilidade.map((indicator: any) => {
                  return indicator && (
                    <IndicatorCard
                      indicatorName={indicator.indicatorName}
                      value={indicator.value}
                    />
                  )
                })
              }
            </AnimatedCard>
          </Card>

          <Card title="Lucratividade" size={CardSizes.large}>
            <AnimatedCard>
              {
                indicator.content[0].eficiencia.map((indicator: any) => {
                  return indicator && (
                    <IndicatorCard
                      indicatorName={indicator.indicatorName}
                      value={indicator.value}
                    />
                  )
                })
              }
            </AnimatedCard>
          </Card>

          <Card title="Endividamento" size={CardSizes.large}>
            <AnimatedCard>
              {
                indicator.content[0].endividamento.map((indicator: any) => {
                  return indicator && (
                    <IndicatorCard
                      indicatorName={indicator.indicatorName}
                      value={indicator.value}
                    />
                  )
                })
              }
            </AnimatedCard>
          </Card>

          <Card title="Cotacao" size={CardSizes.large}>
            <AnimatedCard>
              <Interval>
                {interval.map(item => (<IntervalItem>{item}</IntervalItem>))}
              </Interval>
              <LineChart
                data={cotacaoFake}
              />
            </AnimatedCard>
          </Card>
          <Card title="Proventos" size={CardSizes.large}>
            <AnimatedCard>
              <h1>Proventos content</h1>
            </AnimatedCard>
          </Card>
          <Card title="DRE" size={CardSizes.large}>
            <AnimatedCard>
              <h1>DRE content</h1>
            </AnimatedCard>
          </Card>
          <Card title="Balanço Patrimonial" size={CardSizes.large}>
            <AnimatedCard>
              <h1>Balanço Patrimonial content</h1>
            </AnimatedCard>
          </Card>
          <Card title="Fluxo de Caixa" size={CardSizes.large}>
            <AnimatedCard>
              <h1>Fluxo de Caixa content</h1>
            </AnimatedCard>
          </Card>
          <Card title="Dados Gerais" size={CardSizes.large}>
            <AnimatedCard>
              <h1>Dados Gerais content</h1>
            </AnimatedCard>
          </Card>
          <Card title="Contato" size={CardSizes.large}>
            <AnimatedCard>
              <h1>Contato content</h1>
            </AnimatedCard>
          </Card>
          <Card title="Notícias sobra a Empresa" size={CardSizes.large}>
            <AnimatedCard>
              <h1>Notícias sobra a Empresa</h1>
            </AnimatedCard>
          </Card>
        </MainContent>
      </AnimatedWrapper>
    </Container>
  );
};

export default Company;
