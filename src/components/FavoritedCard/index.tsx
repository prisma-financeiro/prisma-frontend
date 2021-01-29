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
  backgroundDarker?: boolean;
  hoverEffect?: boolean;
  roundedCorners?: boolean;
  addNewCardCallback: () => void;
  removeCardCallback: () => void;
}

const FavoritedCard: React.FC<FavoritedCardProps> = ({ companyLogo, tickerCode, companyName, stockPrice, variationPercentage, variationReal, emptyCard, backgroundDarker = false, hoverEffect = true, roundedCorners = true, addNewCardCallback, removeCardCallback }) => {
  const device = useBreakpoints();

  return (
    <Container
      backgroundDarker={backgroundDarker}
      roundedCorners={roundedCorners}
      whileHover={hoverEffect ? { scale: 1.02 } : {}}
      whileTap={{ scale: 0.99 }}
      >
      { emptyCard ? (
        <ButtonContent 
          backgroundDarker={backgroundDarker}
          onClick={addNewCardCallback}>
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
            <CloseButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={removeCardCallback}>
              x
            </CloseButton>
          </>
        )}
    </Container>
  );
}

export default FavoritedCard;