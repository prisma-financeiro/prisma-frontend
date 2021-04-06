import React from 'react';

import {
  FiPlus,
  FiArrowRight
} from 'react-icons/fi';

import { useDispatch } from 'react-redux';
import { Creators } from '../../store/ducks/application';

import { useBreakpoints } from '../../hooks/useBreakpoints';

import StockPrice from '../StockPrice';
import CompanyHeader from '../CompanyHeader';

import {
  Container,
  CloseButton,
  ButtonContent,
  NavigateToCompanyButton,
  Footer
} from './styles';

interface FavoritedCardProps {
  companyLogo?: string;
  tickerCode?: string;
  companyId?: number;
  companyName?: string;
  stockPrice?: number;
  variationReal?: number;
  variationPercentage?: number;
  emptyCard?: boolean;
  backgroundDarker?: boolean;
  roundedCorners?: boolean;
  addNewCardCallback: () => void;
  removeCardCallback: () => void;
}

const FavoritedCard: React.FC<FavoritedCardProps> = ({ companyLogo, tickerCode, companyId, companyName, stockPrice, variationPercentage, variationReal, emptyCard, backgroundDarker = false, roundedCorners = true, addNewCardCallback, removeCardCallback }) => {
  
  const device = useBreakpoints();
  const dispatch = useDispatch();

  const navigateToCompany = () => {
    dispatch(Creators.navigate(`/assets/company/${companyId}/${tickerCode}`));
  }

  return (
    <Container
      backgroundDarker={backgroundDarker}
      roundedCorners={roundedCorners}
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
            <Footer>
              {
                stockPrice &&
                variationPercentage &&
                <StockPrice
                  stockPrice={stockPrice}
                  variationPercentage={variationPercentage}
                  variationValue={variationReal}
                />
              }
              <NavigateToCompanyButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={navigateToCompany}>
                <FiArrowRight />
              </NavigateToCompanyButton>
            </Footer>
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