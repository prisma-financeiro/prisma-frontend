import React, { useEffect, useState } from 'react';
import {
  DataWrapper,
  SubHeader,
  TableWrapper,
  TableHeader,
  TableHeaderIcon,
  TableFooter
} from './styles';

import {
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

import Card, { CardSizes } from '../../../components/Card';
import ContentDivider from '../../../components/ContentDivider';
import Table from '../../../components/Table';
import StockPrice from '../../../components/StockPrice';
import CompanyHeader from '../../../components/CompanyHeader';
import useAppTheme from '../../../contexts/theme';
import * as themes from '../../../styles/themes';
import { marketIndex } from '../../../services';
import history from '../../../services/history';
import { MarketIndexPriceFlutuationResult, MarketIndexPriceFlutuationResultTicker } from '../../../models';

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

  const { currentTheme } = useAppTheme();
  const theme = themes[currentTheme];

  const handleIbovTableClick = (assetId: number, ticker: string) => {
    history.push(`/company/${assetId}/${ticker}`);
  }

  useEffect(() => {
    if (!ibovFlutuationTable) {
      marketIndex.getMarketIndexPriceFlutuation("IBOV")
        .then((data: MarketIndexPriceFlutuationResult) => {

          const flutuation: IndexFlutuationTableData = {
            lastRefresh: data.lastRefresh,
            highestIncrease: getHighestIncreaseFromStockIndex(data.highestIncrease),
            highestDrop: getHighestDropFromStockIndex(data.highestDrop),
          }

          setIbovFlutuationTableLoading(false);
          setIbovFlutuationTable(flutuation);
        });
    }

    if (!ifixFlutuationTable) {
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
        });
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

  return (
    <Card
      title="Mercado hoje"
      size={CardSizes.large}>
      <SubHeader>
        <h3>Ibovespa</h3>
      </SubHeader>

      <DataWrapper>
        <TableWrapper>
          <TableHeader>
            <h1>Maiores Altas</h1>
            <TableHeaderIcon>
              <FiTrendingUp
                size={30}
                color={theme.colors.success}
              />
            </TableHeaderIcon>
          </TableHeader>
          {
            ibovFlutuationTable &&
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
          }

        </TableWrapper>
        <TableWrapper>
          <TableHeader>
            <h1>Maiores Baixas</h1>
            <TableHeaderIcon>
              <FiTrendingDown
                size={30}
                color={theme.colors.danger}
              />
            </TableHeaderIcon>
          </TableHeader>
          {
            ibovFlutuationTable &&
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
            <h1>Maiores Altas</h1>
            <TableHeaderIcon>
              <FiTrendingUp
                size={30}
                color={theme.colors.success}
              />
            </TableHeaderIcon>
          </TableHeader>
          {
            ifixFlutuationTable &&
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
          }
        </TableWrapper>
        <TableWrapper>
          <TableHeader>
            <h1>Maiores Baixas</h1>
            <TableHeaderIcon>
              <FiTrendingDown
                size={30}
                color={theme.colors.danger}
              />
            </TableHeaderIcon>
          </TableHeader>
          {
            ifixFlutuationTable &&
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
          }
        </TableWrapper>
      </DataWrapper>
    </Card>
  );
};

export default MarketToday;
