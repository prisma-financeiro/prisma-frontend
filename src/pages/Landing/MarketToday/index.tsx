import React, { useState } from 'react';
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
import { fluationFakeData } from "./fakeData";
import StockPrice from '../../../components/StockPrice';
import CompanyHeader from '../../../components/CompanyHeader';
import useAppTheme from '../../../contexts/theme';
import * as themes from '../../../styles/themes';


const MarketToday = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);
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

  const getHighestIncreaseFromIndex = (index: string): Array<any> => {
    const data = fluationFakeData.content.SctyHghstIncrLst.map(item => {
      return {
        ticker: (
          <CompanyHeader
            companyLogo={item.companyLogo}
            companyName={item.desc}
            tickerCode={item.symb}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.SctyQtn.curPrc}
          variationPercentage={parseFloat(item.SctyQtn.prcFlcn.toFixed(2))}
        />)
      }
    })

    return data;
  }

  const getHighestDropFromIndex = (index: string): Array<any> => {
    const data = fluationFakeData.content.SctyHghstDrpLst.map(item => {
      return {
        ticker: (
          <CompanyHeader
            companyLogo={item.companyLogo}
            companyName={item.desc}
            tickerCode={item.symb}
          />
        ),
        cotacao: (<StockPrice
          stockPrice={item.SctyQtn.curPrc}
          variationPercentage={parseFloat(item.SctyQtn.prcFlcn.toFixed(2))}
        />)
      }
    })

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
          <Table
            tableHeader={["Ativo", "Cotação"]}
            tableData={getHighestIncreaseFromIndex("IBOV")}
            numberOfRows={0}
            numberOfPages={0}
            showBottomBorder={true}
            onPageChange={(pageNumber) => handlePageChange(pageNumber)}
            isTableLoading={isTableLoading}>

          </Table>
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
          <Table
            tableHeader={["Ativo", "Cotação"]}
            tableData={getHighestDropFromIndex('IBOV')}
            numberOfRows={0}
            numberOfPages={0}
            showBottomBorder={true}
            onPageChange={(pageNumber) => handlePageChange(pageNumber)}
            isTableLoading={isTableLoading}>

          </Table>
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
          <Table
            tableHeader={["Ativo", "Cotação"]}
            tableData={getHighestIncreaseFromIndex("IFIX")}
            numberOfRows={0}
            numberOfPages={0}
            showBottomBorder={true}
            onPageChange={(pageNumber) => handlePageChange(pageNumber)}
            isTableLoading={isTableLoading}>

          </Table>
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
          <Table
            tableHeader={["Ativo", "Cotação"]}
            tableData={getHighestDropFromIndex("IFIX")}
            numberOfRows={0}
            numberOfPages={0}
            showBottomBorder={true}
            onPageChange={(pageNumber) => handlePageChange(pageNumber)}
            isTableLoading={isTableLoading}>

          </Table>
        </TableWrapper>

      </DataWrapper>
    </Card>
  );
};

export default MarketToday;
