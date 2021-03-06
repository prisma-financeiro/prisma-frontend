import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';

import { Creators } from '../../store/ducks/favorites';
import { Creators as ApplicationCreators } from '../../store/ducks/application';
import { GlobalState } from '../../store/ducks';

import { useBreakpoints } from '../../hooks/useBreakpoints';
import { company, user as UserService } from "../../services";

import SideBar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import { getSideBarOptionsCompany } from '../../constants/sidebar-navigation';
import Accordion, { AccordionSizes } from '../../components/Accordion';
import LineChart from '../../components/LineChart';
import StockPrice, { StockPriceSize } from '../../components/StockPrice';
import SegmentCard from '../../components/SegmentCard';
import PeriodSelector from '../../components/PeriodSelector';
import CompanyHeader from '../../components/CompanyHeader';
import { Divider } from '../../components/ContentDivider/styles';

import {
  formatStockPriceHistory,
  indicatorList
} from './utils';
import { formatStandard, formatCurrencyCompact } from "../../utils";

import FinancialReportTable from './FinancialReportTable';
import CompanyIndicator, { IndicatorType } from './CompanyIndicator';

import { 
  TickerHistoryResult, 
  TickerHistoryResultHighestLowest, 
  TradingViewTableRow, 
  FinancialReportType, 
  CompanyInfo 
} from '../../models';

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

interface TickerInformation {
  price: number;
  variationValue: number;
  variationPercentage: number;
  priceDate?: string;
  tickerId: number;
}

interface StockPriceInfo {
  variationValue: number;
  variationPercentage: number;
  highest: TickerHistoryResultHighestLowest;
  lowest: TickerHistoryResultHighestLowest;
}

const Company: React.FC = (props: any) => {
  const INITIAL_STOCK_QUOTE_PERIOD = 1825;
  const device = useBreakpoints();

  let ticker = props.match.params.ticker;
  let companyId = props.match.params.id;

  const dispatch = useDispatch();
  const favorites = useSelector((state: GlobalState) => state.favoriteState.favorites);

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>();
  const [tickerInformation, setTickerInformation] = useState<TickerInformation>();
  const [balanceIndicatorInfo, setBalanceIndicatorInfo] = useState<any>();
  const [marketIndicatorInfo, setMarketIndicatorInfo] = useState<any>();
  const [stockPriceHistory, setStockPriceHistory] = useState<TradingViewTableRow[] | null>();
  const [stockPriceInfo, setStockPriceInfo] = useState<StockPriceInfo>();

  const top = useRef(null);
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

  const getCompanyGeneralInformation = async () => {
    await company.getCompany(companyId).then(data => {
      setCompanyInfo(data);
    });
  }

  const getCurrentTickerPrice = async () => {
    await company.getTickerPrice(ticker)
      .then(data => {
        const tickerInfo: TickerInformation = {
          price: data.price,
          variationValue: data.variationValue,
          variationPercentage: data.variationPercentage,
          priceDate: data.priceDate,
          tickerId: data.tickerId
        }

        setTickerInformation(tickerInfo);

        company.getCompanyMarketIndicator(ticker, tickerInfo.price)
          .then(data => {
            setMarketIndicatorInfo(data);
          });
      });
  }

  const getTickerPriceHistory = async () => {
    await company.getTickerHistory(ticker, INITIAL_STOCK_QUOTE_PERIOD)
      .then((data: TickerHistoryResult) => {

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
  }

  const getAllCompanyIndicators = async () => {
    await company.getCompanyIndicator(companyId).then(indicator => {
      setBalanceIndicatorInfo(indicator);
    });
  }

  useEffect(() => {
    getCompanyGeneralInformation();
    getCurrentTickerPrice();
    getTickerPriceHistory();
    getAllCompanyIndicators();
  }, [ticker]);

  const handleStockQuotePeriodChange = async (period: number | null) => {
    await company.getTickerHistory(ticker, period)
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

  const handleAssetCompare = (assetId: number | undefined, assetTicker: string) => {
    dispatch(ApplicationCreators.navigate(`/compare-assets/${assetId}/${assetTicker}`));
  }

  const handleAddAssetToFavorites = (assetTickerId: number | undefined) => {
    if (assetTickerId) {
      UserService.addUserFavorite(assetTickerId).then(favorite => {
        dispatch(Creators.addFavorite(favorite));
        toast.success(`${ticker} foi adicionado aos seus favoritos.`);
      }).catch(() => {
        toast.error('Oops, algo deu errado, tente novamente mais tarde.');
      })
    } else {
      toast.error('Oops, algo deu errado, tente novamente mais tarde.');
    }
  }

  const handleRemoveAssetFromFavorites = (favoriteId: number | undefined) => {
    if (favoriteId) {
      UserService.deleteUserFavorite(favoriteId).then(favorite => {
        dispatch(Creators.deleteFavorite(favoriteId));
        toast.success(`${ticker} foi removido dos seus favoritos.`);
      }).catch(() => {
        toast.error('Oops, algo deu errado, tente novamente mais tarde.');
      })
    } else {
      toast.error('Oops, algo deu errado, tente novamente mais tarde.');
    }
  }

  const renderFavoriteButton = () => {
    const favorite = favorites.find(favorite => favorite.tickerCode === ticker);
    
    console.log(favorites)
    if (favorite) {
      return (
        <Button 
          onClick={() => handleRemoveAssetFromFavorites(favorite.id)} 
          disabled={!tickerInformation}  
          variant="secondary">
            Desfavoritar
        </Button> 
      )
    } else {
      return (
        <Button 
          onClick={() => handleAddAssetToFavorites(tickerInformation?.tickerId)} 
          disabled={!tickerInformation}  
          variant="secondary">
          Favoritar
        </Button>
      )
    }
  }

  return (
    <Container ref={top}>
      {
        !device.isTablet &&
        <SideBar 
          sideBarOptions={
            getSideBarOptionsCompany(
              valuation, 
              rentabilidade,
              eficiencia,
              endividamento,
              cotacao,
              proventos,
              dre,
              balancoPatrimonial,
              fluxoCaixa,
              mercadoAtuacao,
              dadosGerais,
              contato)
          } />
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
                {renderFavoriteButton()}
                <Button onClick={() => handleAssetCompare(companyInfo?.id, ticker)} variant="primary">Comparar</Button>
              </ButtonContainer>
              <Divider />
            </>
          }
          <StockPriceContainer>
            <div>
              <Title>Valor Atual</Title>
              <StockPrice
                stockPrice={tickerInformation ? tickerInformation.price : 0}
                variationPercentage={tickerInformation ? tickerInformation.variationPercentage : 0}
                variationValue={tickerInformation ? tickerInformation.variationValue : 0}
              />
            </div>
            <div>
              <Title>M??xima M??s</Title>
              <StockPrice
                stockPrice={19.41}
                variationPercentage={1.5}
              />
            </div>
            <div>
              <Title>M??nima M??s</Title>
              <StockPrice
                stockPrice={12.20}
                variationPercentage={-2.44}
              />
            </div>
          </StockPriceContainer>
          {
            !device.isMobile &&
            <ButtonContainer>
              {renderFavoriteButton()}
              <Button onClick={() => handleAssetCompare(companyInfo?.id, ticker)} variant="primary">Comparar</Button>
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
          <Accordion anchor={cotacao} title="Hist??rico - Cota????o" size={AccordionSizes.large}>
            <QuoteInfoContainer>
              <InfoCard>
                <p>
                  Varia????o no per??odo
                    </p>
                <StockPrice
                  stockPrice={stockPriceInfo && stockPriceInfo.variationValue ? stockPriceInfo.variationValue : 0}
                  variationPercentage={stockPriceInfo && stockPriceInfo.variationPercentage ? stockPriceInfo.variationPercentage : 0}
                  size={device.isMobile ? StockPriceSize.small : StockPriceSize.medium}
                />
              </InfoCard>
              <InfoCard>
                <p>
                  M??xima no per??odo
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
                  M??nima no per??odo
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
                  <h2>Sem informa????es para o per??odo</h2>
              }
            </AccordionContent>
          </Accordion>
          <Accordion anchor={proventos} title="Hist??rico - Proventos" size={AccordionSizes.large}>
            <AccordionContent>
              <h1>Proventos content</h1>
            </AccordionContent>
          </Accordion>

          {companyInfo?.id && (
            <>
              <Accordion anchor={dre} title="Relat??rios Financeiros - Demonstra????o de Resultado" size={AccordionSizes.large}>
                <FinancialReportTable
                  companyId={companyInfo.id}
                  reportType={FinancialReportType.INCOMESTATEMENT}
                />
              </Accordion>

              <Accordion anchor={balancoPatrimonial} title="Relat??rios Financeiros - Balan??o Patrimonial" size={AccordionSizes.large}>
                <FinancialReportTable
                  companyId={companyInfo.id}
                  reportType={FinancialReportType.BALANCESHEET}
                />
              </Accordion>

              <Accordion anchor={fluxoCaixa} title="Relat??rios Financeiros - Fluxo de Caixa" size={AccordionSizes.large}>
                <FinancialReportTable
                  companyId={companyInfo.id}
                  reportType={FinancialReportType.CASHFLOW}
                />
              </Accordion>
            </>
          )}

          <Accordion anchor={mercadoAtuacao} title="Mercado de Atua????o" size={AccordionSizes.large}>
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
                    {companyInfo && companyInfo.cnpj ? companyInfo.cnpj : "N??o informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    Data de Funda????o
                    </p>
                  <div>
                    {companyInfo && companyInfo.foundationDate ? new Date(companyInfo.foundationDate).toLocaleDateString() : "N??o informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    Capital
                    </p>
                  <div>
                    {companyInfo ? formatCurrencyCompact(companyInfo.capitalAmount).toUpperCase() : "N??o informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    A????es Ordin??rias (ON)
                    </p>
                  <div>
                    {companyInfo ? formatStandard(companyInfo.ordinaryStockQuantity) : "N??o informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    A????es Prefer??ncias (PN)
                    </p>
                  <div>
                    {companyInfo ? formatStandard(companyInfo.preferredStockQuantity) : "N??o informado"}
                  </div>
                </InfoCard>
                <InfoCard>
                  <p>
                    Total de Papeis
                    </p>
                  <div>
                    {companyInfo ? formatStandard(companyInfo.totalStockQuantity) : "N??o informado"}
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
                    Rela????o com investidores
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
                        N??o informado
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