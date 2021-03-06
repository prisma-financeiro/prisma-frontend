import React, { useEffect, useState } from 'react';

import {
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { Creators } from '../../../store/ducks/application';

import { MarketIndexPriceFlutuationResult, MarketIndexPriceFlutuationResultTicker } from '../../../models';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import { marketIndex } from '../../../services';
import useAppTheme from '../../../contexts/theme';
import * as themes from '../../../styles/themes';

import Accordion, { AccordionSizes } from '../../../components/Accordion';
import Table from '../../../components/Table';
import StockPrice from '../../../components/StockPrice';
import CompanyHeader from '../../../components/CompanyHeader';
import Spinner from '../../../components/Spinner';

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
import cutString from '../../../utils/string-shortener';

interface IndexFlutuationTableRow {
  ticker: JSX.Element;
  cotacao: JSX.Element;
}

interface IndexFlutuationTableData {
  lastRefresh: string;
  highestIncrease: IndexFlutuationTableRow[];
  highestDrop: IndexFlutuationTableRow[];
}

interface MarketTodayProps {
  anchor?: React.MutableRefObject<any>;
}


const MarketToday: React.FC<MarketTodayProps> = ({ anchor }) => {

  const dispatch = useDispatch();
  
  const [isIbovFlutuationTableLoading, setIbovFlutuationTableLoading] = useState<boolean>(true);
  const [isIfixFlutuationTableLoading, setIfixFlutuationTableLoading] = useState<boolean>(true);
  const [ibovFlutuationTable, setIbovFlutuationTable] = useState<IndexFlutuationTableData>();
  const [ifixFlutuationTable, setIfixFlutuationTable] = useState<IndexFlutuationTableData>();

  const device = useBreakpoints();
  const { currentTheme } = useAppTheme();
  const theme = themes[currentTheme];

  const handleIbovTableClick = (assetId: number, ticker: string) => {
    dispatch(Creators.navigate(`/assets/company/${assetId}/${ticker}`));
  }

  const getIbovMarketPriceFlutuation = () => {
    marketIndex.getMarketIndexPriceFlutuation("IBOV")
      .then((data: MarketIndexPriceFlutuationResult) => {

        if (data.highestIncrease.length > 0 && data.highestDrop.length > 0) {

          const flutuation: IndexFlutuationTableData = {
            lastRefresh: data.lastRefresh,
            highestIncrease: getHighestIncreaseFromStockIndex(data.highestIncrease),
            highestDrop: getHighestDropFromStockIndex(data.highestDrop),
          }

          setIbovFlutuationTable(flutuation);
        }
        setIbovFlutuationTableLoading(false);
      })
      .catch(() => setIbovFlutuationTableLoading(false))
  };

  const getIfixMarketPriceFlutuation = () => {
    marketIndex.getMarketIndexPriceFlutuation("IFIX")
      .then((data: MarketIndexPriceFlutuationResult) => {

        if (data.highestIncrease.length > 0 && data.highestDrop.length > 0) {
          const flutuation: IndexFlutuationTableData = {
            lastRefresh: data.lastRefresh,
            highestIncrease: getHighestIncreaseFromReitIndex(data.highestIncrease),
            highestDrop: getHighestDropFromReitIndex(data.highestDrop),
          }

          setIfixFlutuationTable(flutuation);
        }
        setIfixFlutuationTableLoading(false);
      })
      .catch(() => setIbovFlutuationTableLoading(false))
  }

  useEffect(() => {
    getIbovMarketPriceFlutuation();
    getIfixMarketPriceFlutuation();
  }, []);


  const getHighestIncreaseFromReitIndex = (indexFlutuation: MarketIndexPriceFlutuationResultTicker[]): IndexFlutuationTableRow[] => {
    let data: IndexFlutuationTableRow[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (
          <CompanyHeader
            assetId={item.assetId}
            companyLogo={item.logo}
            companyName={cutString(item.name, 25)}
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
            companyName={cutString(item.name, 25)}
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
            companyName={cutString(item.name, 25)}
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

  const getHighestDropFromStockIndex = (indexFlutuation: MarketIndexPriceFlutuationResultTicker[]): IndexFlutuationTableRow[] => {
    let data: IndexFlutuationTableRow[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (
          <CompanyHeader
            assetId={item.assetId}
            companyLogo={item.logo}
            companyName={cutString(item.name, 25)}
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
      size={AccordionSizes.large}
      anchor={anchor}>
      <SubHeader>
        <p>Ibovespa</p>
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
                    tableHeader={[{ label: "Ativo", value: 'ativo' }, { label: "Cota????o", value: 'cotacao' }]}
                    tableData={ibovFlutuationTable.highestIncrease}
                    numberOfRows={0}
                    numberOfPages={0}
                    showRowHover={true}
                    showBottomBorder={true}
                    onRowClick={(rowInfo: any) => handleIbovTableClick(rowInfo.ticker.props.assetId, rowInfo.ticker.props.tickerCode)}
                    isTableLoading={isIbovFlutuationTableLoading}>
                  </Table>
                  <TableFooter>
                    ??ltima Atualiza????o: {formatDisplayDate(ibovFlutuationTable.lastRefresh)}
                  </TableFooter>
                </>
                :
                "Ops, n??o h?? informa????o no momento."
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
                    tableHeader={[{ label: "Ativo", value: 'ativo' }, { label: "Cota????o", value: 'cotacao' }]}
                    tableData={ibovFlutuationTable.highestDrop}
                    numberOfRows={0}
                    numberOfPages={0}
                    showBottomBorder={true}
                    showRowHover={true}
                    onRowClick={(rowInfo: any) => handleIbovTableClick(rowInfo.ticker.props.assetId, rowInfo.ticker.props.tickerCode)}
                    isTableLoading={isIbovFlutuationTableLoading}>
                  </Table>
                  <TableFooter>
                    ??ltima Atualiza????o: {formatDisplayDate(ibovFlutuationTable.lastRefresh)}
                  </TableFooter>
                </>
                :
                "Ops, n??o h?? informa????o no momento."
          }
        </TableWrapper>
      </DataWrapper>

      <SubHeader>
        <p>IFIX</p>
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
                    tableHeader={[{ label: "Ativo", value: 'ativo' }, { label: "Cota????o", value: 'cotacao' }]}
                    tableData={ifixFlutuationTable.highestIncrease}
                    numberOfRows={0}
                    numberOfPages={0}
                    showBottomBorder={true}
                    isTableLoading={isIfixFlutuationTableLoading}>
                  </Table>
                  <TableFooter>
                    ??ltima Atualiza????o: {formatDisplayDate(ifixFlutuationTable.lastRefresh)}
                  </TableFooter>
                </>
                :
                "Ops, n??o h?? informa????o no momento."
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
                    tableHeader={[{ label: "Ativo", value: 'ativo' }, { label: "Cota????o", value: 'cotacao' }]}
                    tableData={ifixFlutuationTable.highestDrop}
                    numberOfRows={0}
                    numberOfPages={0}
                    showBottomBorder={true}
                    isTableLoading={isIfixFlutuationTableLoading}>
                  </Table>
                  <TableFooter>
                    ??ltima Atualiza????o: {formatDisplayDate(ifixFlutuationTable.lastRefresh)}
                  </TableFooter>
                </>
                :
                "Ops, n??o h?? informa????o no momento."
          }
        </TableWrapper>
      </DataWrapper>
    </Accordion>
  );
};

export default MarketToday;
