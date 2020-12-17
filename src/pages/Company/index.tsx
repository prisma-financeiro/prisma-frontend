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
} from './styles';

import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import { DASHBOARD_ANIMATION } from './animations';
import { SideBarOption } from '../../constants/sidebar-navigation';
import Card, { CardSizes } from '../../components/Card';
import { AnimatedCard } from './styles';
import IndicatorCard from '../../components/IndicatorCard';
import { indicatorFake, indicatorList, incomeStatementTrimestre, balanceSheet, cashFlowTrimestre } from "./fakeData";
import Button from '../../components/Button';
import LineChart from '../../components/LineChart';
import CompanyIndicatorCard from './CompanyIndicatorCard';
import StockPrice from '../../components/StockPrice';

import {
  FiGlobe,
} from 'react-icons/fi';
import Axios from 'axios';
import FinancialReportTable, { SelectionOptions, TableContent } from './FinancialReportTable';

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

interface CompanyInfo {
  name?: string;
}

interface TickePrice {
  price: number;
  variationValue: number;
  variationPercentage: number;
  priceDate?: string;
}

const Company: React.FC<{}> = (props: any) => {
  let ticker = props.match.params.ticker;
  let companyId: number;

  const backendAtivo = !!props.location.search; // temporario para o herr Klotz poder abrir a pagina

  if (props.location.search) {
    companyId = Number(String(props.location.search).substr(4));
  }

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({});
  const [tickerPrice, setTickerPrice] = useState<TickePrice>();
  const [indicatorInfo, setIndicatorInfo] = useState<any>();

  const [incomeStatementData, setIncomeStatementData] = useState<TableContent>();
  const [incomeStatementOptions, setIncomeStatementOptions] = useState<any>({ options: []});
  const [balanceSheetData, setBalanceSheetData] = useState<TableContent>();
  const [balanceSheetOptions, setBalanceSheetOptions] = useState<any>({ options: []});
  const [cashFlowData, setCashFlowData] = useState<TableContent>();
  const [cashFlowOptions, setCashFlowOptions] = useState<any>({ options: []});

  const valuation = useRef(null);
  const rentabilidade = useRef(null);
  const eficiencia = useRef(null);
  const endividamento = useRef(null);
  const cotacao = useRef(null);
  const proventos = useRef(null);
  const dre = useRef(null);
  const balancoPatrimonial = useRef(null);
  const fluxoCaixa = useRef(null);
  const dadosGerais = useRef(null);
  const contato = useRef(null);
  const noticiasEmpresa = useRef(null);

  const getCompany = (id: number) => {
    return Axios
      .get(`http://localhost:5000/api/v1/company/${id}`)
      .then(res => res.data.content);
  }

  const getTickerPrice = (ticker: string) => {
    return Axios
      .get(`http://localhost:5000/api/v1/ticker/${ticker}`)
      .then(res => res.data.content);
  }

  useEffect(() => {

    if (backendAtivo) {
      getCompany(companyId).then(data => {
        const companyInfo = {
          name: data.name,
        }

        setCompanyInfo(companyInfo);
      });

      getTickerPrice(ticker).then(data => {
        const tickerPrice: TickePrice = {
          price: data.price,
          variationValue: data.variationValue,
          variationPercentage: data.variationPercentage,
          priceDate: data.priceDate,
        }

        setTickerPrice(tickerPrice);
      })

      getCompanyIndicator(companyId).then(data => {
        const indicator = data;

        setIndicatorInfo(indicator);
      })

      getIncomeStatementOptions("ANUAL")
        .then((data: any[]) => data.length > 0 && setIncomeStatementOptions({ options: data }));

      getBalanceSheetOptions("ANUAL")
        .then((data: any[]) => data.length > 0 && setBalanceSheetOptions({ options: data }));

      getCashFlowOptions("ANUAL")
        .then((data: any[]) => data.length > 0 && setCashFlowOptions({ options: data }));

    } else {
      const companyInfo = {
        name: companyFakeData.companyName,
      }
      setCompanyInfo(companyInfo);

      const tickerPrice: TickePrice = {
        price: 15.23,
        variationValue: 1.2,
        variationPercentage: 5.3,
        priceDate: "",
      }

      companyId = 81;

      setTickerPrice(tickerPrice);

      setIndicatorInfo(indicatorFake.content);

      setIncomeStatementOptions({ options: [{ value: "2020", label: "2020" }] });
      setIncomeStatementData(incomeStatementTrimestre.content);

      setBalanceSheetOptions({ options: [{ value: "2020", label: "2020" }, { value: "2019", label: "2019" }] });
      setBalanceSheetData(balanceSheet.content);

      setCashFlowOptions({ options: [{ value: "2020", label: "2020" }] });
      setCashFlowData(cashFlowTrimestre.content);
    }

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
          name: 'DRE',
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
        {
          name: 'Notícias sobre a Empresa',
          icon: <FiGlobe />,
          expand: false,
          onClick: () => scrollTo(noticiasEmpresa),
        }
      ]
    }

  ];

  const getStockPrice = () => {
    return {
      current: {
        price: 17.55,
        variationPercentage: 2.34,
      },
      maximalMonth: {
        price: 19.74,
        variationPercentage: 4.58,
      },
      minimalMonth: {
        price: 12.09,
        variationPercentage: -8.03,
      }
    }
  }

  const stockPrice = getStockPrice();

  const getCompanyIndicator = async (companyId: number) => {
    let data: any;

    if (backendAtivo) {
      data = await Axios
        .get(`http://localhost:5000/api/v1/company/${companyId}/indicator`)
        .then(res => res.data.content);
    } else {
      data = new Promise((resolve, _) => resolve(indicatorFake.content));
    }

    return data;
  }

  const getIncomeStatementData = async (options: SelectionOptions) => {

    if (backendAtivo) {
      return Axios
        .get(`http://localhost:5000/api/v1/company/${companyId}/incomestatement`, {
          params: {
            ...options
          }
        })
        .then(res => res.data.content);
    }

    return incomeStatementTrimestre.content;
  }

  const getIncomeStatementOptions = async (type: string) => {

    if (backendAtivo) {
      return Axios
        .get(`http://localhost:5000/api/v1/company/${companyId}/incomestatement/history`, {
          params: {
            type
          }
        })
        .then(res => res.data.content);
    }

    return [{ value: "2020", label: "2020" }];
  }

  const handleIncomeStatementTypeSelectionChange = async (options: SelectionOptions) => {
    const selectionOptions = await getIncomeStatementOptions(options.type);
    setIncomeStatementOptions({ options: selectionOptions });
  }

  const handleIncomeStatementPeriodSelectionChange = async (options: SelectionOptions) => {
    const data = await getIncomeStatementData(options);
    setIncomeStatementData(data);
  }

  const getBalanceSheetData = async (options: SelectionOptions) => {

    if (backendAtivo) {
      return Axios
        .get(`http://localhost:5000/api/v1/company/${companyId}/balancesheet`, {
          params: {
            ...options
          }
        })
        .then(res => res.data.content);
    }

    return balanceSheet.content;
  }

  const getBalanceSheetOptions = async (type: string) => {

    if (backendAtivo) {
      return Axios
        .get(`http://localhost:5000/api/v1/company/${companyId}/balancesheet/history`, {
          params: {
            type
          }
        })
        .then(res => res.data.content);
    }

    return [{ value: "2020", label: "2020" }];
  }

  const handleBalanceSheetTypeSelectionChange = async (options: SelectionOptions) => {
    const selectionOptions: any[] = await getBalanceSheetOptions(options.type);
    setBalanceSheetOptions({ options: selectionOptions });
    alert('entrou aqui');
  }

  const handleBalanceSheetPeriodSelectionChange = async (options: SelectionOptions) => {
    const data = await getBalanceSheetData(options);
    setBalanceSheetData(data);
    alert('entrou aqui');
  }

  const getCashFlowData = async (options: SelectionOptions) => {

    if (backendAtivo) {
      return Axios
        .get(`http://localhost:5000/api/v1/company/${companyId}/cashflow`, {
          params: {
            ...options
          }
        })
        .then(res => res.data.content);
    }
    return cashFlowTrimestre.content;
  }

  const getCashFlowOptions = async (type: string) => {

    if (backendAtivo) {
      return Axios
        .get(`http://localhost:5000/api/v1/company/${companyId}/cashflow/history`, {
          params: {
            type
          }
        })
        .then(res => res.data.content);
    }

    return [{ value: "2020", label: "2020" }];
  }

  const handleCashFlowTypeSelectionChange = async (options: SelectionOptions) => {
    const selectionOptions = await getCashFlowOptions(options.type);
    setCashFlowOptions({ options: selectionOptions });
  }

  const handleCashFlowPeriodSelectionChange = async (options: SelectionOptions) => {
    const data = await getCashFlowData(options);
    setCashFlowData(data);
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
              <CompanyLogo src={companyFakeData.companyLogo} />
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
                  stockPrice={stockPrice.maximalMonth.price}
                  variationPercentage={stockPrice.maximalMonth.variationPercentage}
                />
              </ValueCard>
              <ValueCard>
                <Title>Mínima Mês</Title>
                <StockPrice
                  stockPrice={stockPrice.minimalMonth.price}
                  variationPercentage={stockPrice.minimalMonth.variationPercentage}
                />
              </ValueCard>
            </ValueContainer>
            <ButtonContainer>
              <Button onClick={() => alert('test')} variant="primary">Seguir</Button>
              <Button onClick={() => alert('test')} variant="primary">Comparar</Button>
            </ButtonContainer>
          </HeaderContainer>
          <CardContainer>
            <Card
              anchor={valuation}
              title="Valuation"
              size={CardSizes.large}>
              <AnimatedCard>
                {
                  indicatorInfo && indicatorInfo.valuation &&
                  indicatorInfo.valuation.map((indicator: any, index: number) => {
                    return indicator && (
                      <IndicatorCard
                        key={index}
                        indicatorName={indicator.indicatorName}
                        value={indicator.value}
                      />
                    )
                  })
                }
              </AnimatedCard>
            </Card>
            <CompanyIndicatorCard
              anchor={rentabilidade}
              title="Rentabilidade"
              indicatorData={indicatorInfo ? indicatorInfo.rentabilidade : []}
              indicatorSelectionOptions={indicatorList.content.rentabilidade}
            />
            <CompanyIndicatorCard
              anchor={eficiencia}
              title="Eficiência"
              indicatorData={indicatorInfo ? indicatorInfo.eficiencia : []}
              indicatorSelectionOptions={indicatorList.content.eficiencia}
            />
            <CompanyIndicatorCard
              anchor={endividamento}
              title="Endividamento"
              indicatorData={indicatorInfo ? indicatorInfo.endividamento : []}
              indicatorSelectionOptions={indicatorList.content.endividamento}
            />
            <Card anchor={cotacao} title="Cotação" size={CardSizes.large}>
              <Interval>
                {interval.map((item, index) => (<IntervalItem key={index}>{item}</IntervalItem>))}
              </Interval>
              <AnimatedCard>
                <LineChart
                  data={cotacaoFake}
                />
              </AnimatedCard>
            </Card>
            <Card anchor={proventos} title="Proventos" size={CardSizes.large}>
              <AnimatedCard>
                <h1>Proventos content</h1>
              </AnimatedCard>
            </Card>
            <Card anchor={dre} title="Demontração de Resultado (DRE)" size={CardSizes.large}>
              <FinancialReportTable
                data={incomeStatementData ? incomeStatementData : { rows: [""], columns: [""] }}
                selectionOptions={incomeStatementOptions.options ? incomeStatementOptions : { options: [{ value: "", label: "" }] }}
                onPeriodSelectionChange={(options) => handleIncomeStatementPeriodSelectionChange(options)}
                onTypeSelectionChange={(options) => handleIncomeStatementTypeSelectionChange(options)}
              />
            </Card>
            <Card anchor={balancoPatrimonial} title="Balanço Patrimonial" size={CardSizes.large}>
              <FinancialReportTable
                data={balanceSheetData ? balanceSheetData : { rows: [""], columns: [""] }}
                selectionOptions={balanceSheetOptions.options ? balanceSheetOptions : { options: [{ value: "", label: "" }] }}
                onPeriodSelectionChange={(options) => handleBalanceSheetPeriodSelectionChange(options)}
                onTypeSelectionChange={(options) => handleBalanceSheetTypeSelectionChange(options)}
              />
            </Card>
            <Card anchor={fluxoCaixa} title="Fluxo de Caixa" size={CardSizes.large}>
              <FinancialReportTable
                data={cashFlowData ? cashFlowData : { rows: [""], columns: [""] }}
                selectionOptions={cashFlowOptions.options ? cashFlowOptions : { options: [{ value: "", label: "" }] }}
                onPeriodSelectionChange={(options) => handleCashFlowPeriodSelectionChange(options)}
                onTypeSelectionChange={(options) => handleCashFlowTypeSelectionChange(options)}
              />
            </Card>
            <Card anchor={dadosGerais} title="Dados Gerais" size={CardSizes.large}>
              <AnimatedCard>
                <h1>Dados Gerais content</h1>
              </AnimatedCard>
            </Card>
            <Card anchor={contato} title="Contato" size={CardSizes.large}>
              <AnimatedCard>
                <h1>Contato content</h1>
              </AnimatedCard>
            </Card>
            <Card anchor={noticiasEmpresa} title="Notícias sobra a Empresa" size={CardSizes.large}>
              <AnimatedCard>
                <h1>Notícias sobra a Empresa</h1>
              </AnimatedCard>
            </Card>
          </CardContainer>
        </MainContent>
      </AnimatedWrapper>
    </Container>
  );
};

export default Company;
