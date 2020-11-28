import React from 'react';

import { 
  Container, 
  Header, 
  CompanyLogo, 
  Title, 
  Content, 
  StockPrice, 
  StockVariation, 
  Icon,
  ButtonContent } from './styles';

import {
  FiArrowDown,
  FiPlus
} from 'react-icons/fi';

interface CompanyTickerCardProps {
  companyLogo?: string;
  tickerCode?: string;
  companyName?: string;
  stockPrice?: number;
  variationReal?: number;
  variationPercentage?: number;
  buttonMode: boolean
}

const CompanyTickerCard: React.FC<CompanyTickerCardProps> = ({ companyLogo, tickerCode, companyName, stockPrice, variationPercentage, variationReal, buttonMode}) => {
  return (
    <Container>
      { buttonMode ? (
        <ButtonContent>
          <FiPlus />
        </ButtonContent>
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </Container>
  );
}

export default CompanyTickerCard;