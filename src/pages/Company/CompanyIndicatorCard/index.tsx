import React, { useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import Card, { CardSizes } from '../../../components/Card';
import useAppTheme from "../../../contexts/theme";
import IndicatorChart from "../IndicatorChart";
import * as themes from '../../../styles/themes';
import { IconContainer, AnimatedCard } from "./styles";
import IndicatorCard from "../../../components/IndicatorCard";
import { fakeIndicatorQuarter, fakeIndicatorYear } from "./fakeDate";

interface CompanyIndicatorCardOptions {
    title: string;
    indicatorSelectionOptions: Array<any>;
    indicatorData: Array<any>;
    anchor?: React.MutableRefObject<any>;
}

const CompanyIndicatorCard: React.FC<CompanyIndicatorCardOptions> = ({ indicatorData, title, indicatorSelectionOptions, anchor }) => {
    const [chartVisibled, setChartVisibled] = useState(false);

    const { currentTheme } = useAppTheme();

    const getIndicatorData = (indicator: string, displayOption: string): Array<any> => {
        if (displayOption === "ANUAL") {
            // fazer aqui a requisicao em api/v1/company/1/yearindicator?indicator=roe      
            return fakeIndicatorYear.content.map((item) => {
                return { label: item.year, value: item.value }
            });
        } else {
            // fazer aqui a requisicao em api/v1/company/:id/quarterindicator?indicator=roe
            return fakeIndicatorQuarter.content.map((item) => {
                return { label: `${item.period} - ${item.year}`, value: item.value }
            });
        }
    }

    return (

        <Card
            anchor={anchor}
            title={title}
            size={CardSizes.large}>
            <IconContainer
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                color={chartVisibled ? themes[currentTheme].colors.primary : themes[currentTheme].colors.grey}
                onClick={() => setChartVisibled(!chartVisibled)} >
                <FiBarChart2 />
            </IconContainer>
            <AnimatedCard>
                {
                    chartVisibled
                        ?
                        <IndicatorChart
                            getIndicatorData={getIndicatorData}
                            indicatorSelectionOptions={indicatorSelectionOptions}
                        />
                        :
                        <>
                            {
                                indicatorData ?
                                    indicatorData.map((indicator: any, index: number) => {
                                        return indicator && (
                                            <IndicatorCard
                                                key={index}
                                                indicatorName={indicator.indicatorName}
                                                value={indicator.value}
                                                chartData={indicator.history}
                                            />
                                        )
                                    })
                                    :
                                    <p>Não há informações</p>
                            }
                        </>
                }
            </AnimatedCard>
        </Card>
    )
}

export default CompanyIndicatorCard;