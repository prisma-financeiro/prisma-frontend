import React, { useState } from 'react';

import { 
  Container, 
  Header, 
  CompanyLogo, 
  Title, 
  Content, 
  StockPrice, 
  StockVariation, 
  Icon,
  CloseButton,
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
  addNewCardCallback: () => void;
  removeCardCallback: () => void;
}

const CompanyTickerCard: React.FC<CompanyTickerCardProps> = ({ companyLogo, tickerCode, companyName, stockPrice, variationPercentage, variationReal, emptyCard, addNewCardCallback, removeCardCallback}) => {

  const [isCloseButtonVisible, setIsCloseButtonVisible] = useState<Boolean>(false);

  const handleMouseHover = (isVisible: boolean) => {
    setIsCloseButtonVisible(isVisible);
  }

  return (
    <Container 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => handleMouseHover(true)}
      onMouseLeave={() => handleMouseHover(false)}>
      { emptyCard ? (
        <ButtonContent onClick={addNewCardCallback}>
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
          {isCloseButtonVisible && (
            <CloseButton 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={removeCardCallback}>
                x
            </CloseButton>
          )}
        </React.Fragment>
      )}
    </Container>
  );
}

export default CompanyTickerCard;