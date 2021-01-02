import React, { useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import Accordion, { AccordionSizes } from '../../../components/Accordion';
import useAppTheme from "../../../contexts/theme";
import IndicatorChart from "../IndicatorChart";
import * as themes from '../../../styles/themes';
import {
    IconContainer,
    AnimatedCardContainer,
    AnimatedChartContainer
} from "./styles";
import IndicatorCard from "../../../components/IndicatorCard";
import { company } from "../../../services";

interface CompanyIndicatorCardOptions {
    companyId: number;
    title: string;
    indicatorSelectionOptions: Array<any>;
    indicatorData: Array<any>;
    anchor?: React.MutableRefObject<any>;
}

const CompanyIndicatorCard: React.FC<CompanyIndicatorCardOptions> = ({ companyId, indicatorData, title, indicatorSelectionOptions, anchor }) => {
    const [chartVisibled, setChartVisibled] = useState(false);
    const [indicatorHistory, setIndicatorHistory] = useState<any[]>([]);

    const { currentTheme } = useAppTheme();

    useEffect(() => {
        if (chartVisibled) {
            getIndicatorHistory(indicatorSelectionOptions[0].value, "TRIMESTRAL")
                .then(data => setIndicatorHistory(data));
        }
    }, [chartVisibled]);

    const getIndicatorHistory = async (indicatorName: string, type: string) => {
        if (type === "ANUAL") {

            return await company.getYearIndicator(companyId, indicatorName)
                .then(data => {
                    return data.map((item: any) => {
                        return { label: item.year, value: item.value }
                    });
                });

        } else {
            return await company.getQuarterIndicator(companyId, indicatorName)
                .then(data => {
                    return data.map((item: any) => {
                        return { label: `${item.period}${item.year}`, value: item.value }
                    });
                });
        }
    }

    const handleSelectionChange = async (indicatorName: string, type: string) => {
        const history = await getIndicatorHistory(indicatorName, type);
        setIndicatorHistory(history);
    }

    return (

        <Accordion
            anchor={anchor}
            title={title}
            size={AccordionSizes.large}>
            <IconContainer
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                color={chartVisibled ? themes[currentTheme].colors.primary : themes[currentTheme].colors.grey}
                onClick={() => setChartVisibled(!chartVisibled)} >
                <FiBarChart2
                    title={'Gráfico'}
                />
            </IconContainer>
            {
                chartVisibled ?
                    <AnimatedChartContainer>
                        {
                            indicatorHistory &&
                            <IndicatorChart
                                data={indicatorHistory}
                                onChangeSelection={(indicatorName: string, type: string) => handleSelectionChange(indicatorName, type)}
                                indicatorSelectionOptions={indicatorSelectionOptions}
                            />

                        }
                    </AnimatedChartContainer>
                    :
                    <AnimatedCardContainer>
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
                    </AnimatedCardContainer>
            }
        </Accordion>
    )
}

export default CompanyIndicatorCard;