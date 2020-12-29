import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

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
  Interval,
  IntervalItem,
  CardContainer,
  InfoContainer,
  InfoCard,
  InfoCardTitle,
  InfoCardValue,
} from './styles';

import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import { DASHBOARD_ANIMATION } from './animations';
import { SideBarOption } from '../../constants/sidebar-navigation';
import Card, { CardSizes } from '../../components/Card';
import { AnimatedCard } from './styles';
import { indicatorList } from "./fakeData";
import Button from '../../components/Button';
import LineChart from '../../components/LineChart';
import CompanyIndicatorCard from './CompanyIndicatorCard';
import StockPrice, { StockPriceSize } from '../../components/StockPrice';
import { formatStandard, formatCurrency } from "../../utils";

import { company } from "../../services";

import {
  FiGlobe,
} from 'react-icons/fi';

import FinancialReportTable, { SelectionOptions, TableContent } from './FinancialReportTable';
import SegmentCard from '../../components/SegmentCard';
import { formatIncomeStatementTable, formatBalanceSheetTable, formatSelectOptions, formatCashFlowTable, formatStockPriceHistory, StockPriceHistory } from './utils';

const interval = ["30 Dias", "6 Meses", "1 Ano", "5 Anos", "Max."];

interface TickePrice {
  price: number;
  variationValue: number;
  variationPercentage: number;
  priceDate?: string;
}

enum PeriodType {
  Year = "a",
  Quarter = "t"
}

const Company: React.FC<{}> = (props: any) => {
  let ticker = props.match.params.ticker;
  let companyId = props.match.params.id;

  const [companyInfo, setCompanyInfo] = useState<company.CompanyInfo>();
  const [tickerPrice, setTickerPrice] = useState<TickePrice>();
  const [indicatorInfo, setIndicatorInfo] = useState<any>();

  const [incomeStatementData, setIncomeStatementData] = useState<TableContent>();
  const [incomeStatementOptions, setIncomeStatementOptions] = useState<any>({ options: [] });
  const [balanceSheetData, setBalanceSheetData] = useState<TableContent>();
  const [balanceSheetOptions, setBalanceSheetOptions] = useState<any>({ options: [] });
  const [cashFlowData, setCashFlowData] = useState<TableContent>();
  const [cashFlowOptions, setCashFlowOptions] = useState<any>({ options: [] });
  const [stockPriceHistory, setStockPriceHistory] = useState<any[]>();
  const [stockPriceInfo, setStockPriceInfo] = useState<any>();

  const valuation = useRef(null);
  const rentabilidade = useRef(null);
  const eficiencia = useRef(null);
  const endividamento = useRef(null);
  const cotacao = useRef(null);
  const proventos = useRef(null);
  const dre = useRef(null);
  const balancoPatrimonial = useRef(null);
  const fluxoCaixa = useRef(null);
  const mercadoAtuacao = useRef(null);
  const dadosGerais = useRef(null);
  const contato = useRef(null);
  // const noticiasEmpresa = useRef(null); // TODO : Pegar ultimas noticias de sites via scrapping e listar

  useEffect(() => {

    company.getCompany(companyId).then(data => {
      setCompanyInfo(data as any);
    });

    company.getTickerPrice(ticker).then(data => {
      const tickerPrice: TickePrice = {
        price: data.price,
        variationValue: data.variationValue,
        variationPercentage: data.variationPercentage,
        priceDate: data.priceDate,
      }

      setTickerPrice(tickerPrice);
    });

    company.getTickerHistory(ticker, 30).then(data => {
      console.log(data.historicalPrices);

      const formatedData = formatStockPriceHistory(data.historicalPrices);
      setStockPriceHistory(formatedData);

      const stockInfo = {
        variationValue: data.variationValue,
        variationPercentage: data.variationPercentage,
        highest: data.highest,
        lowest: data.lowest
      }

      setStockPriceInfo(stockInfo);
    })

    company.getCompanyIndicator(companyId).then(data => {
      const indicator = data;

      setIndicatorInfo(indicator);
    })

    company.getIncomeStatementOptions(companyId)
      .then((data: any[]) => {
        if (data.length > 0) {
          const options = formatSelectOptions(data);
          setIncomeStatementOptions({ options });
        }
      });

    company.getIncomeStatementData(companyId)
      .then((data) => {
        const formatedTable = formatIncomeStatementTable(data, PeriodType.Quarter);
        setIncomeStatementData(formatedTable);
      });

    company.getBalanceSheetOptions(companyId)
      .then((data: any[]) => {
        if (data.length > 0) {
          const options = formatSelectOptions(data);
          setBalanceSheetOptions({ options });
        }
      });

    company.getBalanceSheetData(companyId)
      .then((data) => {
        const formatedTable = formatBalanceSheetTable(data, PeriodType.Quarter);
        setBalanceSheetData(formatedTable);
      });

    company.getCashFlowOptions(companyId)
      .then((data: any[]) => {
        if (data.length > 0) {
          const options = formatSelectOptions(data);
          setCashFlowOptions({ options });
        }
      });

    company.getCashFlowData(companyId)
      .then((data) => {
        const formatedTable = formatCashFlowTable(data, PeriodType.Quarter);
        setCashFlowData(formatedTable);
      });

  }, [ticker]);

  const scrollTo = (ref: MutableRefObject<any>) => ref.current.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start",
  });

  const sideBarOptionCompany: SideBarOption[] = [
    {
      title: 'Indicadores',
      items: [
        {
          name: 'Valuation',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(valuation),
        },
        {
          name: 'Rentabilidade',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(rentabilidade),
        },
        {
          name: 'Eficiência',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(eficiencia),
        },
        {
          name: 'Endividamento',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(endividamento),
        },
      ]
    },
    {
      title: 'Histórico',
      items: [
        {
          name: 'Cotação',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(cotacao),
        },
        {
          name: 'Proventos',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(proventos),
        }
      ]
    },
    {
      title: 'Relatórios Financeiros',
      items: [
        {
          name: 'Demonstração de Resultado',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(dre),
        },
        {
          name: 'Balanço Patrimonial',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(balancoPatrimonial),
        },
        {
          name: 'Fluxo de Caixa',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(fluxoCaixa),
        }
      ]
    },
    {
      title: 'Sobre a Empresa',
      items: [
        {
          name: 'Mercado de atuação',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(mercadoAtuacao),
        },
        {
          name: 'Dados Gerais',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(dadosGerais),
        },
        {
          name: 'Contato',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(contato),
        },
        // TODO : Pegar ultimas noticias de sites via scrapping e listar
        // {
        //   name: 'Notícias sobre a Empresa',
        //   icon: <FiGlobe />,
        //   expand: false,
        //   onClick: () => scrollTo(noticiasEmpresa),
        // }
      ]
    }
  ];

  const handleIncomeStatementTypeSelectionChange = async (type: string) => {
    const data = await company.getIncomeStatementData(companyId, type);
    const formatedTable = formatIncomeStatementTable(data, type);
    setIncomeStatementData(formatedTable);
  }

  const handleIncomeStatementPeriodSelectionChange = async (options: SelectionOptions) => {
    const data = await company.getIncomeStatementData(companyId, options.type, options.yearFrom, options.yearTo);
    const formatedTable = formatIncomeStatementTable(data, options.type);
    setIncomeStatementData(formatedTable);
  }

  const handleBalanceSheetTypeSelectionChange = async (type: string) => {
    const data = await company.getBalanceSheetData(companyId, type);
    const formatedTable = formatBalanceSheetTable(data, type);
    setBalanceSheetData(formatedTable);
  }

  const handleBalanceSheetPeriodSelectionChange = async (options: SelectionOptions) => {
    const data = await company.getBalanceSheetData(companyId, options.type, options.yearFrom, options.yearTo);
    const formatedTable = formatBalanceSheetTable(data, options.type);
    setBalanceSheetData(formatedTable);
  }

  const handleCashFlowTypeSelectionChange = async (type: string) => {
    const data = await company.getCashFlowData(companyId, type);
    const formatedTable = formatCashFlowTable(data, type);
    setCashFlowData(formatedTable);
  }

  const handleCashFlowPeriodSelectionChange = async (options: SelectionOptions) => {
    const data = await company.getCashFlowData(companyId, options.type, options.yearFrom, options.yearTo);
    const formatedTable = formatCashFlowTable(data, options.type);
    setCashFlowData(formatedTable);
  }

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
              <CompanyLogo src={companyInfo ? companyInfo.logo : ""} />
              <Title>
                <h1>{ticker}</h1>
                <p>{companyInfo && companyInfo.name}</p>
              </Title>
            </CompanyHeader>
            <ValueContainer>
              <ValueCard>
                <Title>Valor Atual</Title>
                <StockPrice
                  stockPrice={tickerPrice ? tickerPrice.price : 0}
                  variationPercentage={tickerPrice ? tickerPrice.variationPercentage : 0}
                  variationValue={tickerPrice ? tickerPrice.variationValue : 0}
                />
              </ValueCard>
              <ValueCard>
                <Title>Máxima Mês</Title>
                <StockPrice
                  stockPrice={19.41}
                  variationPercentage={1.5}
                />
              </ValueCard>
              <ValueCard>
                <Title>Mínima Mês</Title>
                <StockPrice
                  stockPrice={12.20}
                  variationPercentage={-2.44}
                />
              </ValueCard>
            </ValueContainer>
            <ButtonContainer>
              <Button onClick={() => alert('test')} variant="primary">Seguir</Button>
              <Button onClick={() => alert('test')} variant="primary">Comparar</Button>
            </ButtonContainer>
          </HeaderContainer>
          <CardContainer>
            <CompanyIndicatorCard
              companyId={companyId}
              anchor={valuation}
              title="Indicadores - Valuation"
              indicatorData={indicatorInfo ? indicatorInfo.valuation : []}
              indicatorSelectionOptions={[]}
            />
            <CompanyIndicatorCard
              companyId={companyId}
              anchor={rentabilidade}
              title="Indicadores - Rentabilidade"
              indicatorData={indicatorInfo ? indicatorInfo.rentabilidade : []}
              indicatorSelectionOptions={indicatorList.content.rentabilidade}
            />
            <CompanyIndicatorCard
              companyId={companyId}
              anchor={eficiencia}
              title="Indicadores - Eficiência"
              indicatorData={indicatorInfo ? indicatorInfo.eficiencia : []}
              indicatorSelectionOptions={indicatorList.content.eficiencia}
            />
            <CompanyIndicatorCard
              companyId={companyId}
              anchor={endividamento}
              title="Indicadores - Endividamento"
              indicatorData={indicatorInfo ? indicatorInfo.endividamento : []}
              indicatorSelectionOptions={indicatorList.content.endividamento}
            />
            <Card anchor={cotacao} title="Histórico - Cotação" size={CardSizes.large}>
              <InfoContainer>
                <InfoCard>
                  <InfoCardTitle>
                    Variação no período
                    </InfoCardTitle>
                  <InfoCardValue>
                    <StockPrice
                      stockPrice={stockPriceInfo && stockPriceInfo.variationValue ? stockPriceInfo.variationValue : 0}
                      variationPercentage={stockPriceInfo && stockPriceInfo.variationPercentage ? stockPriceInfo.variationPercentage : 0}
                      size={StockPriceSize.medium}
                    />
                  </InfoCardValue>
                </InfoCard>
                <InfoCard>
                  <InfoCardTitle>
                    Máxima no período
                    </InfoCardTitle>
                  <InfoCardValue>
                    <StockPrice
                      stockPrice={stockPriceInfo && stockPriceInfo.highest ? stockPriceInfo.highest.price : 0}
                      variationPercentage={stockPriceInfo && stockPriceInfo.highest.variationPercentage ? stockPriceInfo.highest.variationPercentage : 0}
                      variationValue={stockPriceInfo && stockPriceInfo.highest.variationValue ? stockPriceInfo.highest.variationValue : 0}
                      size={StockPriceSize.medium}
                    />
                  </InfoCardValue>
                </InfoCard>
                <InfoCard>
                  <InfoCardTitle>
                    Mínima no período
                    </InfoCardTitle>
                  <InfoCardValue>
                    <StockPrice
                      stockPrice={stockPriceInfo && stockPriceInfo.lowest ? stockPriceInfo.lowest.price : 0}
                      variationPercentage={stockPriceInfo && stockPriceInfo.lowest.variationPercentage ? stockPriceInfo.lowest.variationPercentage : 0}
                      variationValue={stockPriceInfo && stockPriceInfo.lowest.variationValue ? stockPriceInfo.lowest.variationValue : 0}
                      size={StockPriceSize.medium}
                    />
                  </InfoCardValue>
                </InfoCard>
              </InfoContainer>
              <Interval>
                {interval.map((item, index) => (<IntervalItem key={index}>{item}</IntervalItem>))}
              </Interval>
              <AnimatedCard>
                {
                  stockPriceHistory ?
                    <LineChart
                      data={stockPriceHistory}
                    />
                    :
                    <h2>Sem informações para o período</h2>
                }
              </AnimatedCard>
            </Card>
            <Card anchor={proventos} title="Histórico - Proventos" size={CardSizes.large}>
              <AnimatedCard>
                <h1>Proventos content</h1>
              </AnimatedCard>
            </Card>
            <Card anchor={dre} title="Relatórios Financeiros - Demonstração de Resultado" size={CardSizes.large}>
              <FinancialReportTable
                data={incomeStatementData ? incomeStatementData : { rows: [""], columns: [""] }}
                selectionOptions={incomeStatementOptions.options ? incomeStatementOptions : { options: [{ value: "", label: "" }] }}
                onPeriodSelectionChange={(options) => handleIncomeStatementPeriodSelectionChange(options)}
                onTypeSelectionChange={(periodType) => handleIncomeStatementTypeSelectionChange(periodType)}
              />
            </Card>
            <Card anchor={balancoPatrimonial} title="Relatórios Financeiros - Balanço Patrimonial" size={CardSizes.large}>
              <FinancialReportTable
                data={balanceSheetData ? balanceSheetData : { rows: [""], columns: [""] }}
                selectionOptions={balanceSheetOptions.options ? balanceSheetOptions : { options: [{ value: "", label: "" }] }}
                onPeriodSelectionChange={(options) => handleBalanceSheetPeriodSelectionChange(options)}
                onTypeSelectionChange={(periodType) => handleBalanceSheetTypeSelectionChange(periodType)}
              />
            </Card>
            <Card anchor={fluxoCaixa} title="Relatórios Financeiros - Fluxo de Caixa" size={CardSizes.large}>
              <FinancialReportTable
                data={cashFlowData ? cashFlowData : { rows: [""], columns: [""] }}
                selectionOptions={cashFlowOptions.options ? cashFlowOptions : { options: [{ value: "", label: "" }] }}
                onPeriodSelectionChange={(options) => handleCashFlowPeriodSelectionChange(options)}
                onTypeSelectionChange={(periodType) => handleCashFlowTypeSelectionChange(periodType)}
              />
            </Card>
            <Card anchor={mercadoAtuacao} title="Mercado de Atuação" size={CardSizes.large}>
              <AnimatedCard>
                <InfoContainer>
                  <SegmentCard
                    title={"Setor"}
                    description={companyInfo?.segment?.description}
                    companyCount={companyInfo?.segment?.companiesCount}
                  />
                  <SegmentCard
                    title={"Sub-Setor"}
                    description={companyInfo?.subsector?.description}
                    companyCount={companyInfo?.subsector?.companiesCount}
                  />
                  <SegmentCard
                    title={"Segmento"}
                    description={companyInfo?.sector?.description}
                    companyCount={companyInfo?.sector?.companiesCount}
                  />
                </InfoContainer>
              </AnimatedCard>
            </Card>
            <Card anchor={dadosGerais} title="Dados Gerais" size={CardSizes.large}>
              <AnimatedCard>
                <InfoContainer>
                  <InfoCard>
                    <InfoCardTitle>
                      CNPJ
                    </InfoCardTitle>
                    <InfoCardValue>
                      <p>
                        {companyInfo && companyInfo.cnpj ? companyInfo.cnpj : "Não informado"}
                      </p>
                    </InfoCardValue>
                  </InfoCard>
                  <InfoCard>
                    <InfoCardTitle>
                      Data de Fundação
                    </InfoCardTitle>
                    <InfoCardValue>
                      <p>
                        {companyInfo && companyInfo.foundationDate ? new Date(companyInfo.foundationDate).toLocaleDateString() : "Não informado"}
                      </p>
                    </InfoCardValue>
                  </InfoCard>
                  <InfoCard>
                    <InfoCardTitle>
                      Capital
                    </InfoCardTitle>
                    <InfoCardValue>
                      <p>
                        {companyInfo ? formatCurrency(companyInfo.capitalAmount) : "Não informado"}
                      </p>
                    </InfoCardValue>
                  </InfoCard>
                </InfoContainer>
                <InfoContainer>
                  <InfoCard>
                    <InfoCardTitle>
                      Ações Ordinárias (ON)
                    </InfoCardTitle>
                    <InfoCardValue>
                      <p>
                        {companyInfo ? formatStandard(companyInfo.ordinaryStockQuantity) : "Não informado"}
                      </p>
                    </InfoCardValue>
                  </InfoCard>
                  <InfoCard>
                    <InfoCardTitle>
                      Ações Preferências (PN)
                    </InfoCardTitle>
                    <InfoCardValue>
                      <p>
                        {companyInfo ? formatStandard(companyInfo.preferredStockQuantity) : "Não informado"}
                      </p>
                    </InfoCardValue>
                  </InfoCard>
                  <InfoCard>
                    <InfoCardTitle>
                      Total de Papeis
                    </InfoCardTitle>
                    <InfoCardValue>
                      <p>
                        {companyInfo ? formatStandard(companyInfo.totalStockQuantity) : "Não informado"}
                      </p>
                    </InfoCardValue>
                  </InfoCard>
                </InfoContainer>
              </AnimatedCard>
            </Card>
            <Card anchor={contato} title="Contato" size={CardSizes.large}>
              <AnimatedCard>
                <InfoContainer>
                  <InfoCard>
                    <InfoCardTitle>
                      Relação com investidores
                    </InfoCardTitle>
                    {
                      companyInfo &&
                        companyInfo.officerName ?
                        <>
                          <InfoCardValue>
                            <p>
                              {companyInfo.officerName}
                            </p>
                          </InfoCardValue>
                          <InfoCardValue>
                            <p>
                              {companyInfo.officerEmail ? companyInfo.officerEmail : ""}
                            </p>
                          </InfoCardValue>
                        </>
                        :
                        <InfoCardValue>
                          Não informado
                        </InfoCardValue>
                    }
                  </InfoCard>
                </InfoContainer>
                <InfoContainer>
                  <InfoCard>
                    <InfoCardTitle>
                      Site Oficial
                    </InfoCardTitle>
                    <InfoCardValue>
                      <Button disabled={!companyInfo?.website} variant="primary" onClick={() => companyInfo && window.open(companyInfo.website)}>
                        Ir para o site
                      </Button>
                    </InfoCardValue>
                  </InfoCard>
                </InfoContainer>
              </AnimatedCard>
            </Card>
            {/* TODO : Pegar ultimas noticias de sites via scrapping e listar */}
            {/* <Card anchor={noticiasEmpresa} title="Notícias sobra a Empresa" size={CardSizes.large}>
              <AnimatedCard>
                <h1>Notícias sobra a Empresa</h1>
              </AnimatedCard>
            </Card> */}
          </CardContainer>
        </MainContent>
      </AnimatedWrapper>
    </Container>
  );
};

export default Company;
