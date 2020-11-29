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
import { DEFAULT_TRANSITION } from '../../constants';

interface CompanyTickerCardProps {
  companyLogo?: string;
  tickerCode?: string;
  companyName?: string;
  stockPrice?: number;
  variationReal?: number;
  variationPercentage?: number;
  emptyCard: boolean;
  callback: () => void;
}

const CompanyTickerCard: React.FC<CompanyTickerCardProps> = ({ companyLogo, tickerCode, companyName, stockPrice, variationPercentage, variationReal, emptyCard, callback}) => {
  return (
    <Container 
      whileHover={{ y: -2, transition: DEFAULT_TRANSITION }} 
      whileTap={{ y: 2, transition: DEFAULT_TRANSITION }} >
      { emptyCard ? (
        <ButtonContent onClick={callback}>
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