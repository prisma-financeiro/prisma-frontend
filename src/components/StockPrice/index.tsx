import React from 'react';

import {
    Content,
    Price,
    StockVariation,
    IconUp,
    IconDown
} from './styles';

import {
    FiArrowDown,
    FiArrowUp
} from 'react-icons/fi';

interface StockPriceProps {
    stockPrice: number;
    variationPercentage: number;
    variationValue?: number;
}

const StockPrice: React.FC<StockPriceProps> = ({ stockPrice, variationPercentage, variationValue }) => {

    return (
        <Content>
            <Price>
                R${stockPrice}
            </Price>
            <StockVariation>
                {
                    variationPercentage &&
                        variationPercentage > 0 ?
                        <IconUp>
                            <FiArrowUp />
                        </IconUp>
                        :
                        <IconDown>
                            <FiArrowDown />
                        </IconDown>
                }
                {variationValue} {variationValue ? `(${variationPercentage}%)` : `${variationPercentage}%`}
            </StockVariation>
        </Content>
    );
}

export default StockPrice;