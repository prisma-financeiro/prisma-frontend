import React, { useEffect, useState } from 'react';
import {
  DataWrapper,
  SubHeader,
  TableWrapper,
  TableHeader,
  TableHeaderIcon
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


const MarketToday = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [ibovFlutuationTable, setIbovFlutuationTable] = useState<any>();
  const [ifixFlutuationTable, setIfixFlutuationTable] = useState<any>();

  const { currentTheme } = useAppTheme();
  const theme = themes[currentTheme];

  const handlePageChange = (pageNumber: number) => {
    //chamada para o backend aqui
    console.log(pageNumber);
    setIsTableLoading(true);
    setTimeout(() => {
      setIsTableLoading(false);
    }, 5000);
  }

  const handleIbovTableClick = (id: number, ticker: string) => {
    history.push(`/company/${id}/${ticker}`);
  }

  useEffect(() => {
    if (!ibovFlutuationTable) {
      marketIndex.getMarketIndexPriceFlutuation("IBOV")
        .then(data => {

          const flutuation = {
            highestIncrease: getHighestIncreaseFromStockIndex(data.highestIncrease),
            highestDrop: getHighestDropFromStockIndex(data.highestDrop),
          }

          setIbovFlutuationTable(flutuation)
        });
    }

    if (!ifixFlutuationTable) {
      marketIndex.getMarketIndexPriceFlutuation("IFIX")
        .then(data => {

          if (data) {
            const flutuation = {
              highestIncrease: getHighestIncreaseFromReitIndex(data.highestIncrease),
              highestDrop: getHighestDropFromReitIndex(data.highestDrop),
            }

            setIfixFlutuationTable(flutuation);
          }
        });
    }

  });


  const getHighestIncreaseFromReitIndex = (indexFlutuation: any[]): any[] => {
    let data: any[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (
          <CompanyHeader
            id={item.id}
            companyLogo={item.logo}
            companyName={item.name}
            tickerCode={item.ticker}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.SctyQtn.curPrc}
          variationPercentage={parseFloat(item.SctyQtn.prcFlcn.toFixed(2))}
        />)
      }
    });

    return data;
  }

  const getHighestDropFromReitIndex = (indexFlutuation: any[]): any[] => {
    let data: any[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (

          <CompanyHeader
            id={item.id}
            companyLogo={item.logo}
            companyName={item.name}
            tickerCode={item.ticker}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.SctyQtn.curPrc}
          variationPercentage={parseFloat(item.SctyQtn.prcFlcn.toFixed(2))}
        />)
      }
    });

    return data;
  }

  const getHighestIncreaseFromStockIndex = (indexFlutuation: any[]): any[] => {
    let data: any[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (
          <CompanyHeader
            id={item.id}
            companyLogo={item.logo}
            companyName={item.name}
            tickerCode={item.ticker}
            onClick={handleIbovTableClick}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.SctyQtn.curPrc}
          variationPercentage={parseFloat(item.SctyQtn.prcFlcn.toFixed(2))}
        />)
      }
    });

    return data;
  }

  const getHighestDropFromStockIndex = (indexFlutuation: any[]): any[] => {
    let data: any[] = [];

    data = indexFlutuation.map((item: any) => {
      return {
        ticker: (

          <CompanyHeader
            id={item.id}
            companyLogo={item.logo}
            companyName={item.name}
            tickerCode={item.ticker}
            onClick={handleIbovTableClick}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.SctyQtn.curPrc}
          variationPercentage={parseFloat(item.SctyQtn.prcFlcn.toFixed(2))}
        />)
      }
    });

    return data;
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
            <Table
              tableHeader={["Ativo", "Cotação"]}
              tableData={ibovFlutuationTable.highestIncrease}
              numberOfRows={0}
              numberOfPages={0}
              showBottomBorder={true}
              onPageChange={(pageNumber) => handlePageChange(pageNumber)}
              isTableLoading={isTableLoading}>
            </Table>
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
            <Table
              tableHeader={["Ativo", "Cotação"]}
              tableData={ibovFlutuationTable.highestDrop}
              numberOfRows={0}
              numberOfPages={0}
              showBottomBorder={true}
              onPageChange={(pageNumber) => handlePageChange(pageNumber)}
              isTableLoading={isTableLoading}>
            </Table>
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
            <Table
              tableHeader={["Ativo", "Cotação"]}
              tableData={ifixFlutuationTable.highestIncrease}
              numberOfRows={0}
              numberOfPages={0}
              showBottomBorder={true}
              onPageChange={(pageNumber) => handlePageChange(pageNumber)}
              isTableLoading={isTableLoading}>
            </Table>
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
            <Table
              tableHeader={["Ativo", "Cotação"]}
              tableData={ifixFlutuationTable.highestDrop}
              numberOfRows={0}
              numberOfPages={0}
              showBottomBorder={true}
              onPageChange={(pageNumber) => handlePageChange(pageNumber)}
              isTableLoading={isTableLoading}>
            </Table>
          }
        </TableWrapper>
      </DataWrapper>
    </Card>
  );
};

export default MarketToday;
