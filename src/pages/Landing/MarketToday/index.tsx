import React, { useEffect, useState } from 'react';
import {
  DataWrapper,
  SubHeader,
  TableWrapper,
  TableHeader,
  TableHeaderIcon,
  TableFooter,
  TableTitle,
  SpinnerContainer
} from './styles';

import {
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

import Accordion, { AccordionSizes } from '../../../components/Accordion';
import ContentDivider from '../../../components/ContentDivider';
import Table from '../../../components/Table';
import StockPrice from '../../../components/StockPrice';
import CompanyHeader from '../../../components/CompanyHeader';
import useAppTheme from '../../../contexts/theme';
import * as themes from '../../../styles/themes';
import { marketIndex } from '../../../services';
import history from '../../../services/history';
import { MarketIndexPriceFlutuationResult, MarketIndexPriceFlutuationResultTicker } from '../../../models';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import Spinner from '../../../components/Spinner';

interface IndexFlutuationTableRow {
  ticker: JSX.Element;
  cotacao: JSX.Element;
}

interface IndexFlutuationTableData {
  lastRefresh: string;
  highestIncrease: IndexFlutuationTableRow[];
  highestDrop: IndexFlutuationTableRow[];
}

const MarketToday = () => {
  const [isIbovFlutuationTableLoading, setIbovFlutuationTableLoading] = useState(true);
  const [isIfixFlutuationTableLoading, setIfixFlutuationTableLoading] = useState(true);
  const [ibovFlutuationTable, setIbovFlutuationTable] = useState<IndexFlutuationTableData>();
  const [ifixFlutuationTable, setIfixFlutuationTable] = useState<IndexFlutuationTableData>();

  const device = useBreakpoints();
  const { currentTheme } = useAppTheme();
  const theme = themes[currentTheme];

  const handleIbovTableClick = (assetId: number, ticker: string) => {
    history.push(`/company/${assetId}/${ticker}`);
  }

  useEffect(() => {
    if (!ibovFlutuationTable && isIbovFlutuationTableLoading) {
      marketIndex.getMarketIndexPriceFlutuation("IBOV")
        .then((data: MarketIndexPriceFlutuationResult) => {

          const flutuation: IndexFlutuationTableData = {
            lastRefresh: data.lastRefresh,
            highestIncrease: getHighestIncreaseFromStockIndex(data.highestIncrease),
            highestDrop: getHighestDropFromStockIndex(data.highestDrop),
          }

          setIbovFlutuationTableLoading(false);
          setIbovFlutuationTable(flutuation);
        })
        .catch(() => {
          setIbovFlutuationTableLoading(false);
        })
    }

    if (!ifixFlutuationTable && isIfixFlutuationTableLoading) {
      marketIndex.getMarketIndexPriceFlutuation("IFIX")
        .then((data: MarketIndexPriceFlutuationResult) => {

          if (data) {
            const flutuation: IndexFlutuationTableData = {
              lastRefresh: data.lastRefresh,
              highestIncrease: getHighestIncreaseFromReitIndex(data.highestIncrease),
              highestDrop: getHighestDropFromReitIndex(data.highestDrop),
            }

            setIfixFlutuationTableLoading(false);
            setIfixFlutuationTable(flutuation);
          }
        })
        .catch(() => {
          setIfixFlutuationTableLoading(false);
        })
    }

  });


  const getHighestIncreaseFromReitIndex = (indexFlutuation: MarketIndexPriceFlutuationResultTicker[]): IndexFlutuationTableRow[] => {
    let data: IndexFlutuationTableRow[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (
          <CompanyHeader
            assetId={item.assetId}
            companyLogo={item.logo}
            companyName={item.name}
            tickerCode={item.ticker}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.currentPrice}
          variationPercentage={parseFloat(item.priceFlutuationPercetage.toFixed(2))}
        />)
      }
    });

    return data;
  }

  const getHighestDropFromReitIndex = (indexFlutuation: MarketIndexPriceFlutuationResultTicker[]): IndexFlutuationTableRow[] => {
    let data: IndexFlutuationTableRow[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (

          <CompanyHeader
            assetId={item.assetId}
            companyLogo={item.logo}
            companyName={item.name}
            tickerCode={item.ticker}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.currentPrice}
          variationPercentage={parseFloat(item.priceFlutuationPercetage.toFixed(2))}
        />)
      }
    });

    return data;
  }

  const getHighestIncreaseFromStockIndex = (indexFlutuation: MarketIndexPriceFlutuationResultTicker[]): IndexFlutuationTableRow[] => {
    let data: IndexFlutuationTableRow[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (
          <CompanyHeader
            assetId={item.assetId}
            companyLogo={item.logo}
            companyName={item.name}
            tickerCode={item.ticker}
            onClick={handleIbovTableClick}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.currentPrice}
          variationPercentage={parseFloat(item.priceFlutuationPercetage.toFixed(2))}
        />)
      }
    });

    return data;
  }

  const getHighestDropFromStockIndex = (indexFlutuation: MarketIndexPriceFlutuationResultTicker[]): IndexFlutuationTableRow[] => {
    let data: IndexFlutuationTableRow[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (
          <CompanyHeader
            assetId={item.assetId}
            companyLogo={item.logo}
            companyName={item.name}
            tickerCode={item.ticker}
            onClick={handleIbovTableClick}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.currentPrice}
          variationPercentage={parseFloat(item.priceFlutuationPercetage.toFixed(2))}
        />)
      }
    });

    return data;
  }

  const formatDisplayDate = (date: string): string => {
    const result = new Date(date);
    return `${result.toLocaleDateString()} ${result.toLocaleTimeString()}`;
  }

  const getIndexTableIconSize = () => {
    return device.isMobile ? 20 : 30;
  }

  return (
    <Accordion
      title="Mercado hoje"
      size={AccordionSizes.large}>
      <SubHeader>
        <h3>Ibovespa</h3>
      </SubHeader>

      <DataWrapper>
        <TableWrapper>
          <TableHeader>
            <TableTitle>Maiores Altas</TableTitle>
            <TableHeaderIcon>
              <FiTrendingUp
                size={getIndexTableIconSize()}
                color={theme.colors.success}
              />
            </TableHeaderIcon>
          </TableHeader>
          {
            isIbovFlutuationTableLoading ?
              <SpinnerContainer>
                <Spinner

                />
              </SpinnerContainer>
              :
              ibovFlutuationTable ?
                <>
                  <Table
                    tableHeader={["Ativo", "Cotação"]}
                    tableData={ibovFlutuationTable.highestIncrease}
                    numberOfRows={0}
                    numberOfPages={0}
                    showBottomBorder={true}
                    onPageChange={() => { }}
                    isTableLoading={isIbovFlutuationTableLoading}>
                  </Table>
                  <TableFooter>
                    Última Atualização: {formatDisplayDate(ibovFlutuationTable.lastRefresh)}
                  </TableFooter>
                </>
                :
                "Ops, não há informação no momento."
          }

        </TableWrapper>
        <TableWrapper>
          <TableHeader>
            <TableTitle>Maiores Baixas</TableTitle>
            <TableHeaderIcon>
              <FiTrendingDown
                size={getIndexTableIconSize()}
                color={theme.colors.danger}
              />
            </TableHeaderIcon>
          </TableHeader>
          {
            isIbovFlutuationTableLoading ?
              <SpinnerContainer>
                <Spinner

                />
              </SpinnerContainer>
              :
              ibovFlutuationTable ?
                <>
                  <Table
                    tableHeader={["Ativo", "Cotação"]}
                    tableData={ibovFlutuationTable.highestDrop}
                    numberOfRows={0}
                    numberOfPages={0}
                    showBottomBorder={true}
                    onPageChange={() => { }}
                    isTableLoading={isIbovFlutuationTableLoading}>
                  </Table>
                  <TableFooter>
                    Última Atualização: {formatDisplayDate(ibovFlutuationTable.lastRefresh)}
                  </TableFooter>
                </>
                :
                "Ops, não há informação no momento."
          }
        </TableWrapper>
      </DataWrapper>

      <ContentDivider />

      <SubHeader>
        <h3>IFIX</h3>
      </SubHeader>
      <DataWrapper>
        <TableWrapper>
          <TableHeader>
            <TableTitle>Maiores Altas</TableTitle>
            <TableHeaderIcon>
              <FiTrendingUp
                size={getIndexTableIconSize()}
                color={theme.colors.success}
              />
            </TableHeaderIcon>
          </TableHeader>
          {
            isIfixFlutuationTableLoading ?
              <SpinnerContainer>
                <Spinner

                />
              </SpinnerContainer>
              :
              ifixFlutuationTable ?
                <>
                  <Table
                    tableHeader={["Ativo", "Cotação"]}
                    tableData={ifixFlutuationTable.highestIncrease}
                    numberOfRows={0}
                    numberOfPages={0}
                    showBottomBorder={true}
                    onPageChange={() => { }}
                    isTableLoading={isIfixFlutuationTableLoading}>
                  </Table>
                  <TableFooter>
                    Última Atualização: {formatDisplayDate(ifixFlutuationTable.lastRefresh)}
                  </TableFooter>
                </>
                :
                "Ops, não há informação no momento."
          }
        </TableWrapper>
        <TableWrapper>
          <TableHeader>
            <TableTitle>Maiores Baixas</TableTitle>
            <TableHeaderIcon>
              <FiTrendingDown
                size={getIndexTableIconSize()}
                color={theme.colors.danger}
              />
            </TableHeaderIcon>
          </TableHeader>
          {
            isIfixFlutuationTableLoading ?
              <SpinnerContainer>
                <Spinner

                />
              </SpinnerContainer>
              :
              ifixFlutuationTable ?
                <>
                  <Table
                    tableHeader={["Ativo", "Cotação"]}
                    tableData={ifixFlutuationTable.highestDrop}
                    numberOfRows={0}
                    numberOfPages={0}
                    showBottomBorder={true}
                    onPageChange={() => { }}
                    isTableLoading={isIfixFlutuationTableLoading}>
                  </Table>
                  <TableFooter>
                    Última Atualização: {formatDisplayDate(ifixFlutuationTable.lastRefresh)}
                  </TableFooter>
                </>
                :
                "Ops, não há informação no momento."
          }
        </TableWrapper>
      </DataWrapper>
    </Accordion>
  );
};

export default MarketToday;
