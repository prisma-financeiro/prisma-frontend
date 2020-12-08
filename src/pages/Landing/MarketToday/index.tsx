import React, { useState } from 'react';
import {
  DataWrapper,
  SubHeader,
  TableWrapper
} from './styles';

import Card, { CardSizes } from '../../../components/Card';
import CompanyTickerCard from '../../../components/CompanyTickerCard';
import ContentDivider from '../../../components/ContentDivider';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';


const MarketToday = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);
  const fakeData = {
    companyLogo: 'https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png',
    tickerCode: 'MGLU3',
    companyName: 'Magazine Luiza',
    stockPrice: 10.58,
    variationReal: -0.18,
    variationPercentage: -0.51,
  }

  const fakeTable = [
    {name: 'daniel', idade: 27, '#': <Button>Teste</Button> }, 
    {name: <a href="www.google.com">Paulao</a>, idade: 24, "#": <Button>Teste</Button>},
    {name: 'Rosilene', idade: <h1>2</h1>, '#': <Button>Teste</Button>},
    {name: 'Carmelita', idade: <h1>2</h1>, '#': <Button>Teste</Button>},
    {name: 'Jose', idade: <h1>2</h1>, '#': <Button>Teste</Button>},
    {name: 'Rosi', idade: <h1>2</h1>, '#': <Button>Teste</Button>},
    {name: 'Miguelito', idade: <h1>2</h1>, '#': <Button>Teste</Button>},
    {name: 'Bilano', idade: <h1>2</h1>, '#': <Button>Teste</Button>},
    {name: 'Moises', idade: <h1>2</h1>, '#': <Button>Teste</Button>},
    {name: 'Gerald', idade: <h1>2</h1>, '#': <Button>Teste</Button>},
  ]

  const handlePageChange = (pageNumber: number) => {
    //chamada para o backend aqui
    console.log(pageNumber);
    setIsTableLoading(true);
    setTimeout(() => {
      setIsTableLoading(false);
    }, 2000);
  }

  return (
    <Card 
      title="Mercado hoje"
      size={CardSizes.large}>
      <SubHeader>
        <h3>Ibovespa</h3>
      </SubHeader>

      <DataWrapper>
        <CompanyTickerCard
          companyLogo={fakeData.companyLogo}
          companyName={fakeData.companyName}
          tickerCode={fakeData.tickerCode}
          stockPrice={fakeData.stockPrice}
          variationPercentage={fakeData.variationPercentage}
          variationReal={fakeData.variationReal}
          emptyCard={false}
          removeCardCallback={()=>{}}
          addNewCardCallback={() => { }} />
      </DataWrapper>

      <ContentDivider />

      <SubHeader>
        <h3>IFIX</h3>
      </SubHeader>

      <Table 
        tableHeader={["Name", "Age", ""]} 
        tableData={fakeTable} 
        numberOfRows={3}
        numberOfPages={5}
        showBottomBorder={true}
        onPageChange={(pageNumber) => handlePageChange(pageNumber)}
        isTableLoading={isTableLoading}>

      </Table>
    </Card>
  );
};

export default MarketToday;
