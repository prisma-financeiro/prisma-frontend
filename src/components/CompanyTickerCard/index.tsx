import React, { useState } from 'react';

import {
  Container,
  CloseButton,
  ButtonContent
} from './styles';

import {
  FiPlus
} from 'react-icons/fi';
import StockPrice from '../StockPrice';
import CompanyHeader from '../CompanyHeader';

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

const CompanyTickerCard: React.FC<CompanyTickerCardProps> = ({ companyLogo, tickerCode, companyName, stockPrice, variationPercentage, variationReal, emptyCard, addNewCardCallback, removeCardCallback }) => {

  const [isCloseButtonVisible, setIsCloseButtonVisible] = useState<Boolean>(false);

  const handleMouseHover = (isVisible: boolean) => {
    setIsCloseButtonVisible(isVisible);
  }

  return (
    <Container
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      onMouseEnter={() => handleMouseHover(true)}
      onMouseLeave={() => handleMouseHover(false)}>
      { emptyCard ? (
        <ButtonContent onClick={addNewCardCallback}>
          <FiPlus />
        </ButtonContent>
      ) : (
          <React.Fragment>
            {
              companyLogo &&
              companyName &&
              tickerCode &&
              <CompanyHeader
                companyLogo={companyLogo}
                companyName={companyName}
                tickerCode={tickerCode}
              />
            }
            {
              stockPrice &&
              variationPercentage &&
              <StockPrice
                stockPrice={stockPrice}
                variationPercentage={variationPercentage}
                variationValue={variationReal}
              />
            }
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