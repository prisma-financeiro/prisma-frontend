import React from 'react';

import {
    Content,
    Price,
    StockVariation,
    IconUp,
    IconDown,
    IconRight
} from './styles';

import {
    FiArrowDown,
    FiArrowRight,
    FiArrowUp
} from 'react-icons/fi';

import { formatCurrency } from '../../utils';

export enum StockPriceSize {
    small = 'small',
    medium = 'medium',
    large = 'large'
}

interface StockPriceProps {
    stockPrice: number;
    variationPercentage: number;
    variationValue?: number;
    size?: StockPriceSize;
}

const StockPrice: React.FC<StockPriceProps> = ({ stockPrice, variationPercentage, variationValue, size }) => {

    const getVariationArrow = () => {
        if (variationPercentage) {
            if (variationPercentage === 0) {
                return (
                    <IconRight
                        size={size ? size : StockPriceSize.small}
                    >
                        <FiArrowRight />
                    </IconRight>
                )
            } else if (variationPercentage > 0) {
                return (
                    <IconUp
                        size={size ? size : StockPriceSize.small}
                    >
                        <FiArrowUp />
                    </IconUp>
                )
            } else {
                return (
                    <IconDown
                        size={size ? size : StockPriceSize.small}
                    >
                        <FiArrowDown />
                    </IconDown>
                )
            }
        }
    }

    return (
        <Content>
            <Price
                size={size ? size : StockPriceSize.small}
            >
                {formatCurrency(stockPrice)}
            </Price>
            <StockVariation
                size={size ? size : StockPriceSize.small}
            >
                {
                    getVariationArrow()
                }
                {
                    variationValue !== 0 &&
                    variationValue
                }
                {
                    variationPercentage &&
                        variationValue ? `(${variationPercentage}%)` : `${variationPercentage}%`
                }
            </StockVariation>
        </Content>
    );
}

export default StockPrice;