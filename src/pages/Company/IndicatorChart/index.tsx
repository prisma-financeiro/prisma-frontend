import React, { useEffect, useState } from 'react';

import useAppTheme from '../../../contexts/theme';
import * as themes from '../../../styles/themes';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import { SelectOptionType } from '../../../models';

import BarChart from '../../../components/BarChart';
import Select from '../../../components/Select';

import { 
    Container, 
    SelectContainer
} from './styles';

export interface IndicatorData {
    label: string;
    value: string;
}

interface IndicatorChartOptions {
    data: any[];
    defaultIndicator: string;
    indicatorSelectionOptions: SelectOptionType[];
    onChangeSelection: (indicatorName: string, type: string) => any;
}

const IndicatorChart: React.FC<IndicatorChartOptions> = ({ data, defaultIndicator, indicatorSelectionOptions, onChangeSelection }) => {

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
                    backgroundColor: item.value > 0 ? '#20C05C' : '#fe807a',
                    hoverBackgroundColor: item.value > 0 ? '#20C05C' : '#fe807a',
                    borderColor: item.value > 0 ? '#20C05C' : '#fe807a',
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
                borderWidth: 1,
                minBarLength: 10
            }]
        }
    }

    const handleIndicatorChange = (option: SelectOptionType) => {
        const newIndicatorName = option;
        setIndicatorName(newIndicatorName.value);

        onChangeSelection(newIndicatorName.value, type);
    }

    const handleTypeChange = (option: SelectOptionType) => {
        const newType = option.value;
        setType(newType);

        onChangeSelection(indicatorName, newType);
    }

    return (
        <Container>
            <SelectContainer>
                <Select
                    defaultValue={indicatorSelectionOptions.find(el => el.label === defaultIndicator)}
                    isClearable={false}
                    isDisabled={false}
                    isLoading={false}
                    isMulti={false}
                    isSearchable={false}
                    options={indicatorSelectionOptions}
                    onChange={(option: SelectOptionType) => handleIndicatorChange(option)} />
                <Select
                    defaultValue={displayOptions[0]}
                    isClearable={false}
                    isDisabled={false}
                    isLoading={false}
                    isMulti={false}
                    isSearchable={false}
                    options={displayOptions}
                    onChange={(option: SelectOptionType) => handleTypeChange(option)} />
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
