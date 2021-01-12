import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Accordion, { AccordionSizes } from '../../../components/Accordion';
import IndicatorChart from "../IndicatorChart";
import {
    CardContainer,
    ChartContainer,
    IconContainer,
    Container
} from "./styles";
import IndicatorCard from "../../../components/IndicatorCard";
import { company } from "../../../services";
import { SelectOptionType } from "../../../models";

export enum IndicatorType {
    valuation = 'Valuation',
    rentabilidade = 'Rentabilidade',
    eficiencia = 'Eficiência',
    endividamento = 'Endividamento'
}

interface CompanyIndicatorOptions {
    companyId: number;
    ticker: string;
    indicatorType: IndicatorType;
    indicatorSelectionOptions: SelectOptionType[];
    indicatorData: any[];
    anchor?: React.MutableRefObject<any>;
}

const CompanyIndicator: React.FC<CompanyIndicatorOptions> = ({ companyId, ticker, indicatorType, indicatorData, indicatorSelectionOptions, anchor }) => {
    const [isChartVisible, setIsChartVisible] = useState(false);
    const [indicatorHistory, setIndicatorHistory] = useState<SelectOptionType[]>([]);
    const [selectedIndicator, setSelectedIndicator] = useState<string>('');

    const _getBalanceIndicatorHistory = async (indicatorName: string, type: string) => {
        let formatedValues: SelectOptionType[] = [];
        if (type === "ANUAL") {

            return await company.getYearIndicator(companyId, indicatorName)
                .then(data => {
                    formatedValues = data.map((item: any) => {
                        return { label: item.year, value: item.value }
                    });
                    setIndicatorHistory(formatedValues);
                });
        } else {
            return await company.getQuarterIndicator(companyId, indicatorName)
                .then(data => {
                    formatedValues = data.map((item: any) => {
                        return { label: `${item.period}${item.year}`, value: item.value }
                    });
                    setIndicatorHistory(formatedValues);
                });
        }
    }

    const _getMarketIndicatorHistory = async (indicatorName: string, type: string) => {
        let formatedValues: SelectOptionType[] = [];

        return await company.getCompanyMarketIndicatorHistory(ticker, indicatorName, type === "ANUAL" ? "yearly" : "quarterly")
            .then(data => {
                formatedValues = data.map((item: any) => {
                    return { label: item.year, value: item.value }
                });
                setIndicatorHistory(formatedValues);
            });
    }

    const getIndicatorHistory = async (indicatorName: string, type: string) => {
        if (indicatorType === IndicatorType.valuation) {
            await _getMarketIndicatorHistory(indicatorName, type);
        } else {
            await _getBalanceIndicatorHistory(indicatorName, type);
        }
    }

    const handleSelectionChange = async (indicatorName: string, type: string) => {
        getIndicatorHistory(indicatorName, type);
        const selectedIndicatorValue = indicatorSelectionOptions.find(el => el.value === indicatorName)?.label || indicatorSelectionOptions[0].value;
        setSelectedIndicator(selectedIndicatorValue);
    }

    const handleOnCardClick = (indicatorName: string) => {
        setSelectedIndicator(indicatorName);
        setIsChartVisible(true);
        const selectedIndicator: string = indicatorSelectionOptions.find(el => el.label === indicatorName)?.value || indicatorSelectionOptions[0].value;
        getIndicatorHistory(selectedIndicator, "TRIMESTRAL");
    }

    const handleReturnCardView = () => {
        setSelectedIndicator('');
        setIsChartVisible(false);
    }

    const getTitle = (selectedIndicator: string): string => {
        const title = `Indicadores - ${indicatorType}`;
        return selectedIndicator ? `${title} - ${selectedIndicator}` : title;
    }

    return (
        <Accordion
            anchor={anchor}
            title={getTitle(selectedIndicator)}
            size={AccordionSizes.large}>

            <Container>
                {
                    isChartVisible ?
                        <ChartContainer>
                            <IconContainer onClick={handleReturnCardView}>
                                <FiArrowLeft />
                            </IconContainer>
                            {
                                indicatorHistory &&
                                <IndicatorChart
                                    defaultIndicator={selectedIndicator}
                                    data={indicatorHistory}
                                    onChangeSelection={(indicatorName: string, type: string) => handleSelectionChange(indicatorName, type)}
                                    indicatorSelectionOptions={indicatorSelectionOptions}
                                />

                            }
                        </ChartContainer>
                        :
                        <CardContainer>
                            {
                                indicatorData ?
                                    indicatorData.map((indicator: any, index: number) => {
                                        return indicator && (
                                            <IndicatorCard
                                                key={index}
                                                indicatorName={indicator.indicatorName}
                                                value={indicator.value}
                                                representationCharacter={indicator.signal}
                                                chartData={indicator.history}
                                                onClick={(indicatorName) => handleOnCardClick(indicatorName)}
                                            />
                                        )
                                    })
                                    :
                                    <p>Não há informações</p>
                            }
                        </CardContainer>
                }
            </Container>
        </Accordion>
    )
}

export default CompanyIndicator;