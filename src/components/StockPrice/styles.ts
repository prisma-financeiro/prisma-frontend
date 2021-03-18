import styled, { css } from 'styled-components';
import { StockPriceSize } from '.';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
`
interface PriceProps {
    size: StockPriceSize;
}

export const Price = styled.p`
${({ theme }) => css`
    font-weight: 700;
    color: ${theme.colors.grey};
    font-size: ${(props: PriceProps) => {
            switch (props.size) {
                case StockPriceSize.small:
                    return theme.fontSizes.large;

                case StockPriceSize.medium:
                    return theme.fontSizes.xlarge;

                case StockPriceSize.large:
                    return theme.fontSizes.xxlarge;
                default:
                    break;
            }
        }};  

    @media (max-width: ${theme.deviceWidth.mobile}) {  
        font-size: ${theme.fontSizes.default}
    }
`}
`

const getIconFontSize = (props: any, theme: any) => {
    switch (props.size) {
        case StockPriceSize.small:
            return theme.fontSizes.default;

        case StockPriceSize.medium:
            return theme.fontSizes.xlarge;

        case StockPriceSize.large:
            return theme.fontSizes.xlarge;
        default:
            break;
    }
}

export const IconUp = styled.div`
${({ theme }) => css`    
    color: ${theme.colors.success};
    font-size: ${(props: PriceProps) => getIconFontSize(props, theme)};
    display: flex;
    align-items: center;
    justify-content: center;
`}
`

export const IconRight = styled.div`
${({ theme }) => css`    
    color: ${theme.colors.yellow};
    font-size: ${(props: PriceProps) => getIconFontSize(props, theme)};
    display: flex;
    align-items: center;
    justify-content: center;
`}
`

export const IconDown = styled.div`
${({ theme }) => css`    
    color: ${theme.colors.danger};
    font-size: ${(props: PriceProps) => getIconFontSize(props, theme)};
    display: flex;
    align-items: center;
    justify-content: center;
`}
`

export const StockVariation = styled.div`
${({ theme }) => css`
    margin-top: 0.3rem;
    display: flex;
    font-weight: 500;
    color: ${theme.colors.grey};
    font-size: ${(props: PriceProps) => {
            switch (props.size) {
                case StockPriceSize.small:
                    return theme.fontSizes.default;

                case StockPriceSize.medium:
                    return theme.fontSizes.large;

                case StockPriceSize.large:
                    return theme.fontSizes.xlarge;
                default:
                    break;
            }
        }}; 
        
    @media (max-width: ${theme.deviceWidth.mobile}) {
        font-size: ${theme.fontSizes.small};
    }
`}
`