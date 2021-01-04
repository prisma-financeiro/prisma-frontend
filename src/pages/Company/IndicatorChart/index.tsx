import React, { useEffect, useState } from 'react';

import { Container, SelectContainer } from './styles';
import BarChart from '../../../components/BarChart';
import useAppTheme from '../../../contexts/theme';
import * as themes from '../../../styles/themes';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import Select, { OptionType } from '../../../components/Select';

export interface IndicatorData {
    label: string;
    value: string;
}

interface IndicatorChartOptions {
    data: any[];
    indicatorSelectionOptions: OptionType[];
    onChangeSelection: (indicatorName: string, type: string) => any;
}

const IndicatorChart: React.FC<IndicatorChartOptions> = ({ data, indicatorSelectionOptions, onChangeSelection }) => {

    const device = useBreakpoints();
    const { currentTheme } = useAppTheme();
    const theme = themes[currentTheme];

    const displayOptions = [
        { value: "TRIMESTRAL", label: "Trimestral" },
        { value: "ANUAL", label: "Anual" },
    ];

    const [indicatorName, setIndicatorName] = useState<string>(indicatorSelectionOptions[0].value);
    const [type, setType] = useState<string>(displayOptions[0].value);
    const [indicatorData, setIndicatorData] = useState<Chart.ChartData>();

    useEffect(() => {
        const chartData = getChartData(data);
        setIndicatorData(chartData);
    }, [data]);


    const gridLinesColor = currentTheme === 'light' ? theme.colors.lightGrey : theme.colors.greyLowerOpacity;
    const ticksColor = currentTheme === 'light' ? theme.colors.greyLowerOpacity : theme.colors.grey;
    const chartOptions: Chart.ChartConfiguration = {
        type: 'bar',
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            display: false,
                            drawOnChartArea: true,
                        },
                        ticks: {
                            fontColor: ticksColor,
                            fontSize: device.isMobile ? 10 : 12
                        },
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            fontColor: ticksColor,
                            beginAtZero: true,
                            fontSize: device.isMobile ? 10 : 12
                        },
                        gridLines: {
                            color: gridLinesColor,
                            zeroLineColor: theme.colors.grey,
                            zeroLineWidth: 0.8,
                        },
                    }
                ]
            }
        },
    }

    const getChartData = (data: any): any => {
        const formatedData = data.map((item: any) => {
            return {
                ...item,
                color: {
                    backgroundColor: item.value > 0 ? 'rgba(32, 226, 47, 0.35)' : 'rgba(300, 10, 10, 0.35)',
                    hoverBackgroundColor: item.value > 0 ? 'rgba(32, 226, 47, 1)' : '#E81010',
                    borderColor: item.value > 0 ? 'rgba(32, 226, 47, 1)' : '#E82020',
                }
            }
        });

        return {
            labels: formatedData ? formatedData.map((item: any) => item.label) : [],
            datasets: [{
                data: formatedData ? formatedData.map((item: any) => item.value) : [],
                borderColor: formatedData.map((item: any) => item.color.borderColor),
                backgroundColor: formatedData.map((item: any) => item.color.backgroundColor),
                hoverBackgroundColor: formatedData.map((item: any) => item.color.hoverBackgroundColor),
                borderWidth: 1
            }]
        }
    }

    const handleIndicatorChange = (option: OptionType) => {
        const newIndicatorName = option;
        setIndicatorName(newIndicatorName.value);

        onChangeSelection(newIndicatorName.value, type);
    }

    const handleTypeChange = (option: OptionType) => {
        const newType = option.value;
        setType(newType);

        onChangeSelection(indicatorName, newType);
    }

    return (
        <Container>
            <SelectContainer>
                <Select
                    placeholder={indicatorSelectionOptions[0].label}
                    isClearable={false}
                    isDisabled={false}
                    isLoading={false}
                    isMulti={false}
                    isSearchable={false}
                    options={indicatorSelectionOptions}
                    onChange={(option: OptionType) => handleIndicatorChange(option)} />
                <Select
                    placeholder={displayOptions[0].label}
                    isClearable={false}
                    isDisabled={false}
                    isLoading={false}
                    isMulti={false}
                    isSearchable={false}
                    options={displayOptions}
                    onChange={(option: OptionType) => handleTypeChange(option)} />
            </SelectContainer>
            {
                indicatorData &&
                <BarChart
                    data={indicatorData}
                    options={chartOptions}
                />
            }
        </Container>
    );
};

export default IndicatorChart;
