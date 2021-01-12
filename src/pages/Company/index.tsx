import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import {
  Container,
  AccordionContent,
  HeaderContainer,
  StockPriceContainer,
  ButtonContainer,
  Title,
  AccordionContainer,
  InfoContainer,
  InfoCard,
  Button,
  SegmentContainer,
  QuoteInfoContainer,
  ContatoContainer,
} from './styles';

import {
  FiTrendingUp,
} from 'react-icons/fi';

import {
  RiVipDiamondLine,
  RiPercentLine,
  RiHandCoinLine,
  RiExchangeFundsLine,
  RiBuilding4Line,
  RiFireLine
} from 'react-icons/ri';

import {
  BiLineChart,
  BiSpreadsheet
} from 'react-icons/bi';

import {
  HiOutlineDocumentReport,
  HiOutlineMail
} from 'react-icons/hi';

import { BsBuilding } from 'react-icons/bs';

import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import { SideBarOption } from '../../constants/sidebar-navigation';
import Accordion, { AccordionSizes } from '../../components/Accordion';
import LineChart from '../../components/LineChart';
import CompanyIndicator, { IndicatorType } from './CompanyIndicator';
import StockPrice, { StockPriceSize } from '../../components/StockPrice';
import FinancialReportTable, { SelectionOptions, TableContent } from './FinancialReportTable';
import SegmentCard from '../../components/SegmentCard';
import {
  formatIncomeStatementTable,
  formatBalanceSheetTable,
  formatSelectOptions,
  formatCashFlowTable,
  formatStockPriceHistory,
  indicatorList
} from './utils';
import PeriodSelector from '../../components/PeriodSelector';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import CompanyHeader from '../../components/CompanyHeader';
import { Divider } from '../../components/ContentDivider/styles';
import { TickerHistoryResult, TickerHistoryResultHighestLowest, TradingViewTableRow } from '../../models';

import { formatStandard, formatCurrencyCompact } from "../../utils";

import { company } from "../../services";

interface TickePrice {
  price: number;
  variationValue: number;
  variationPercentage: number;
  priceDate?: string;
}

interface StockPriceInfo {
  variationValue: number;
  variationPercentage: number;
  highest: TickerHistoryResultHighestLowest;
  lowest: TickerHistoryResultHighestLowest;
}

enum PeriodType {
  Year = "a",
  Quarter = "t"
}

const Company: React.FC = (props: any) => {
  const INITIAL_STOCK_QUOTE_PERIOD = 5;
  const device = useBreakpoints();

  let ticker = props.match.params.ticker;
  let companyId = props.match.params.id;

  const [companyInfo, setCompanyInfo] = useState<company.CompanyInfo>();
  const [tickerPrice, setTickerPrice] = useState<TickePrice>();
  const [balanceIndicatorInfo, setBalanceIndicatorInfo] = useState<any>();
  const [marketIndicatorInfo, setMarketIndicatorInfo] = useState<any>();

  const [incomeStatementData, setIncomeStatementData] = useState<TableContent>();
  const [incomeStatementOptions, setIncomeStatementOptions] = useState<any>({ options: [] });
  const [balanceSheetData, setBalanceSheetData] = useState<TableContent>();
  const [balanceSheetOptions, setBalanceSheetOptions] = useState<any>({ options: [] });
  const [cashFlowData, setCashFlowData] = useState<TableContent>();
  const [cashFlowOptions, setCashFlowOptions] = useState<any>({ options: [] });
  const [stockPriceHistory, setStockPriceHistory] = useState<TradingViewTableRow[] | null>();
  const [stockPriceInfo, setStockPriceInfo] = useState<StockPriceInfo>();

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

    company.getTickerHistory(ticker, INITIAL_STOCK_QUOTE_PERIOD).then((data: TickerHistoryResult) => {

      const formatedData: TradingViewTableRow[] | null = formatStockPriceHistory(data.historicalPrices);
      setStockPriceHistory(formatedData);

      const stockInfo: StockPriceInfo = {
        variationValue: data.variationValue,
        variationPercentage: data.variationPercentage,
        highest: data.highest,
        lowest: data.lowest
      }

      setStockPriceInfo(stockInfo);
    });

    company.getCompanyIndicator(companyId).then(data => {
      const indicator = data;

      setBalanceIndicatorInfo(indicator);
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

    scrollTo(valuation);

  }, [ticker]);

  useEffect(() => {
    tickerPrice &&
      tickerPrice.price &&
      company.getCompanyMarketIndicator(ticker, tickerPrice.price)
        .then(data => {
          data &&
            setMarketIndicatorInfo(data);
        })
  }, [tickerPrice]);

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
          icon: <RiVipDiamondLine />,
          expand: false,
          onClick: () => scrollTo(valuation),
        },
        {
          name: 'Rentabilidade',
          icon: <RiPercentLine />,
          expand: false,
          onClick: () => scrollTo(rentabilidade),
        },
        {
          name: 'Eficiência',
          icon: <FiTrendingUp />,
          expand: false,
          onClick: () => scrollTo(eficiencia),
        },
        {
          name: 'Endividamento',
          icon: <RiFireLine />,
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
          icon: <BiLineChart />,
          expand: false,
          onClick: () => scrollTo(cotacao),
        },
        {
          name: 'Proventos',
          icon: <RiHandCoinLine />,
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
          icon: <HiOutlineDocumentReport />,
          expand: false,
          onClick: () => scrollTo(dre),
        },
        {
          name: 'Balanço Patrimonial',
          icon: <BiSpreadsheet />,
          expand: false,
          onClick: () => scrollTo(balancoPatrimonial),
        },
        {
          name: 'Fluxo de Caixa',
          icon: <RiExchangeFundsLine />,
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
          icon: <BsBuilding />,
          expand: false,
          onClick: () => scrollTo(mercadoAtuacao),
        },
        {
          name: 'Dados Gerais',
          icon: <RiBuilding4Line />,
          expand: false,
          onClick: () => scrollTo(dadosGerais),
        },
        {
          name: 'Contato',
          icon: <HiOutlineMail />,
          expand: false,
          onClick: () => scrollTo(contato),
        },
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

  const handleStockQuotePeriodChange = (period: number | null) => {

    company.getTickerHistory(ticker, period)
      .then(data => {
        const formatedData = formatStockPriceHistory(data.historicalPrices);
        setStockPriceHistory(formatedData);

        const stockInfo = {
          variationValue: data.variationValue,
          variationPercentage: data.variationPercentage,
          highest: data.highest,
          lowest: data.lowest
        }

        setStockPriceInfo(stockInfo);
      });

  }

  return (
    <Container>
      {
        !device.isMobile &&
        <SideBar sideBarOptions={sideBarOptionCompany} />
      }
      <MainContent>
        <HeaderContainer>
          <CompanyHeader
            companyLogo={companyInfo ? companyInfo.logo : ""}
            tickerCode={ticker}
            companyName={companyInfo ? companyInfo.name : ""}
          />
          {
            device.isMobile &&
            <>
              < ButtonContainer >
                <Button onClick={() => alert('test')} variant="secondary">Seguir</Button>
                <Button onClick={() => alert('test')} variant="primary">Comparar</Button>
              </ButtonContainer>
              <Divider />
            </>
          }
          <StockPriceContainer>
            <div>
              <Title>Valor Atual</Title>
              <StockPrice
                stockPrice={tickerPrice ? tickerPrice.price : 0}
                variationPercentage={tickerPrice ? tickerPrice.variationPercentage : 0}
                variationValue={tickerPrice ? tickerPrice.variationValue : 0}
              />
            </div>
            <div>
              <Title>Máxima Mês</Title>
              <StockPrice
                stockPrice={19.41}
                variationPercentage={1.5}
              />
            </div>
            <div>
              <Title>Mínima Mês</Title>
              <StockPrice
                stockPrice={12.20}
                variationPercentage={-2.44}
              />
            </div>
          </StockPriceContainer>
          {
            !device.isMobile &&
            <ButtonContainer>
              <Button onClick={() => alert('test')} variant="secondary">Seguir</Button>
              <Button onClick={() => alert('test')} variant="primary">Comparar</Button>
            </ButtonContainer>
          }
        </HeaderContainer>
        <AccordionContainer>
          <CompanyIndicator
            companyId={companyId}
            ticker={ticker}
            anchor={valuation}
            indicatorType={IndicatorType.valuation}
            indicatorData={marketIndicatorInfo ? marketIndicatorInfo : []}
            indicatorSelectionOptions={indicatorList.content.valuation}
          />
          <CompanyIndicator
            companyId={companyId}
            ticker={ticker}
            anchor={rentabilidade}
            indicatorType={IndicatorType.rentabilidade}
            indicatorData={balanceIndicatorInfo ? balanceIndicatorInfo.rentabilidade : []}
            indicatorSelectionOptions={indicatorList.content.rentabilidade}
          />
          <CompanyIndicator
            companyId={companyId}
            ticker={ticker}
            anchor={eficiencia}
            indicatorType={IndicatorType.eficiencia}
            indicatorData={balanceIndicatorInfo ? balanceIndicatorInfo.eficiencia : []}
            indicatorSelectionOptions={indicatorList.content.eficiencia}
          />
          <CompanyIndicator
            companyId={companyId}
            ticker={ticker}
            anchor={endividamento}
            indicatorType={IndicatorType.endividamento}
            indicatorData={balanceIndicatorInfo ? balanceIndicatorInfo.endividamento : []}
            indicatorSelectionOptions={indicatorList.content.endividamento}
          />
          <Accordion anchor={cotacao} title="Histórico - Cotação" size={AccordionSizes.large}>
            <QuoteInfoContainer>
              <InfoCard>
                <p>
                  Variação no período
                    </p>
                <StockPrice
                  stockPrice={stockPriceInfo && stockPriceInfo.variationValue ? stockPriceInfo.variationValue : 0}
                  variationPercentage={stockPriceInfo && stockPriceInfo.variationPercentage ? stockPriceInfo.variationPercentage : 0}
                  size={device.isMobile ? StockPriceSize.small : StockPriceSize.medium}
                />
              </InfoCard>
              <InfoCard>
                <p>
                  Máxima no período
                  </p>
                <StockPrice
                  stockPrice={stockPriceInfo && stockPriceInfo.highest ? stockPriceInfo.highest.price : 0}
                  variationPercentage={stockPriceInfo && stockPriceInfo.highest && stockPriceInfo.highest.variationPercentage ? stockPriceInfo.highest.variationPercentage : 0}
                  variationValue={stockPriceInfo && stockPriceInfo.highest && stockPriceInfo.highest.variationValue ? stockPriceInfo.highest.variationValue : 0}
                  size={device.isMobile ? StockPriceSize.small : StockPriceSize.medium}
                />
              </InfoCard>
              <InfoCard>
                <p>
                  Mínima no período
                  </p>
                <StockPrice
                  stockPrice={stockPriceInfo && stockPriceInfo.lowest ? stockPriceInfo.lowest.price : 0}
                  variationPercentage={stockPriceInfo && stockPriceInfo.lowest && stockPriceInfo.lowest.variationPercentage ? stockPriceInfo.lowest.variationPercentage : 0}
                  variationValue={stockPriceInfo && stockPriceInfo.lowest && stockPriceInfo.lowest.variationValue ? stockPriceInfo.lowest.variationValue : 0}
                  size={device.isMobile ? StockPriceSize.small : StockPriceSize.medium}
                />
              </InfoCard>
            </QuoteInfoContainer>
            <PeriodSelector
              onPeriodChange={(period) => handleStockQuotePeriodChange(period)}
            />
            <AccordionContent>
              {
                stockPriceHistory ?
                  <LineChart
                    data={stockPriceHistory}
                  />
                  :
                  <h2>Sem informações para o período</h2>
              }
            </AccordionContent>
          </Accordion>
          <Accordion anchor={proventos} title="Histórico - Proventos" size={AccordionSizes.large}>
            <AccordionContent>
              <h1>Proventos content</h1>
            </AccordionContent>
          </Accordion>
          <Accordion anchor={dre} title="Relatórios Financeiros - Demonstração de Resultado" size={AccordionSizes.large}>
            <FinancialReportTable
              data={incomeStatementData ? incomeStatementData : { rows: [""], columns: [""] }}
              selectionOptions={incomeStatementOptions.options ? incomeStatementOptions : { options: [{ value: "", label: "" }] }}
              onPeriodSelectionChange={(options) => handleIncomeStatementPeriodSelectionChange(options)}
              onTypeSelectionChange={(periodType) => handleIncomeStatementTypeSelectionChange(periodType)}
            />
          </Accordion>
          <Accordion anchor={balancoPatrimonial} title="Relatórios Financeiros - Balanço Patrimonial" size={AccordionSizes.large}>
            <FinancialReportTable
              data={balanceSheetData ? balanceSheetData : { rows: [""], columns: [""] }}
              selectionOptions={balanceSheetOptions.options ? balanceSheetOptions : { options: [{ value: "", label: "" }] }}
              onPeriodSelectionChange={(options) => handleBalanceSheetPeriodSelectionChange(options)}
              onTypeSelectionChange={(periodType) => handleBalanceSheetTypeSelectionChange(periodType)}
            />
          </Accordion>
          <Accordion anchor={fluxoCaixa} title="Relatórios Financeiros - Fluxo de Caixa" size={AccordionSizes.large}>
            <FinancialReportTable
              data={cashFlowData ? cashFlowData : { rows: [""], columns: [""] }}
              selectionOptions={cashFlowOptions.options ? cashFlowOptions : { options: [{ value: "", label: "" }] }}
              onPeriodSelectionChange={(options) => handleCashFlowPeriodSelectionChange(options)}
              onTypeSelectionChange={(periodType) => handleCashFlowTypeSelectionChange(periodType)}
            />
          </Accordion>
          <Accordion anchor={mercadoAtuacao} title="Mercado de Atuação" size={AccordionSizes.large}>
            <AccordionContent>
              <SegmentContainer>
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
              </SegmentContainer>
            </AccordionContent>
          </Accordion>
          <Accordion anchor={dadosGerais} title="Dados Gerais" size={AccordionSizes.large}>
            <AccordionContent>
              <InfoContainer>
                <InfoCard>
                  <p>
                    CNPJ
                    </p>
                  <div>
                    {companyInfo && companyInfo.cnpj ? companyInfo.cnpj : "Não informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    Data de Fundação
                    </p>
                  <div>
                    {companyInfo && companyInfo.foundationDate ? new Date(companyInfo.foundationDate).toLocaleDateString() : "Não informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    Capital
                    </p>
                  <div>
                    {companyInfo ? formatCurrencyCompact(companyInfo.capitalAmount).toUpperCase() : "Não informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    Ações Ordinárias (ON)
                    </p>
                  <div>
                    {companyInfo ? formatStandard(companyInfo.ordinaryStockQuantity) : "Não informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    Ações Preferências (PN)
                    </p>
                  <div>
                    {companyInfo ? formatStandard(companyInfo.preferredStockQuantity) : "Não informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    Total de Papeis
                    </p>
                  <div>
                    {companyInfo ? formatStandard(companyInfo.totalStockQuantity) : "Não informado"}
                  </div>
                </InfoCard>
              </InfoContainer>
            </AccordionContent>
          </Accordion>
          <Accordion anchor={contato} title="Contato" size={AccordionSizes.large}>
            <AccordionContent>
              <ContatoContainer>
                <InfoCard>
                  <p>
                    Relação com investidores
                    </p>
                  {
                    companyInfo &&
                      companyInfo.officerName ?
                      <>
                        <p>
                          {companyInfo.officerName}
                        </p>
                        <div>
                          {companyInfo.officerEmail ? companyInfo.officerEmail : ""}
                        </div>
                      </>
                      :
                      <div>
                        Não informado
                        </div>
                  }
                </InfoCard>
                <InfoCard>
                  <p>
                    Site Oficial
                    </p>
                  <div>
                    <Button disabled={!companyInfo?.website} variant="primary" onClick={() => companyInfo && window.open(companyInfo.website)}>
                      Ir para o site
                      </Button>
                  </div>
                </InfoCard>
              </ContatoContainer>
            </AccordionContent>
          </Accordion>
        </AccordionContainer>
      </MainContent>
    </Container >
  );
};

export default Company;
