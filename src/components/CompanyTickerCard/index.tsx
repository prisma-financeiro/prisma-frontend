import React from 'react';

import { 
  Container, 
  Header, 
  CompanyLogo, 
  Title, 
  Content, 
  StockPrice, 
  StockVariation, 
  Icon } from './styles';

import {
  FiArrowDown,
} from 'react-icons/fi';

interface CompanyTickerCardProps {
  companyLogo: string;
  tickerCode: string;
  companyName: string;
  stockPrice: number;
  variationReal: number;
  variationPercentage: number;
}

const CompanyTickerCard: React.FC<CompanyTickerCardProps> = ({ companyLogo, tickerCode, companyName, stockPrice, variationPercentage, variationReal}) => {
  return (
    <Container>
      <Header>
        <CompanyLogo src={companyLogo} />
        <Title>
          <h1>{tickerCode}</h1>
          <p>{companyName}</p>
        </Title>
      </Header>
      <Content>
        <StockPrice>
          R${stockPrice}
        </StockPrice>
        <StockVariation>
          <Icon>
            <FiArrowDown />
          </Icon>
          {variationReal} ({variationPercentage}%)
        </StockVariation>
      </Content>
    </Container>
  );
}

export default CompanyTickerCard;