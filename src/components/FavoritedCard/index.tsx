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
import { useBreakpoints } from '../../hooks/useBreakpoints';

interface FavoritedCardProps {
  companyLogo?: string;
  tickerCode?: string;
  companyName?: string;
  stockPrice?: number;
  variationReal?: number;
  variationPercentage?: number;
  emptyCard?: boolean;
  addNewCardCallback: () => void;
  removeCardCallback: () => void;
}

const FavoritedCard: React.FC<FavoritedCardProps> = ({ companyLogo, tickerCode, companyName, stockPrice, variationPercentage, variationReal, emptyCard, addNewCardCallback, removeCardCallback }) => {
  const device = useBreakpoints();
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
          <FiPlus
            size={device.isMobile ? 20 : 30}
          />
        </ButtonContent>
      ) : (
          <>
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
          </>
        )}
    </Container>
  );
}

export default FavoritedCard;