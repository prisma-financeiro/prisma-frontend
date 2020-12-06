import React, { useEffect, useState } from 'react';

import { Container, SelectContainer } from './styles';
import BarChart from '../../../components/BarChart';
import Selection, { Option } from '../../../components/Selection';
import useAppTheme from '../../../contexts/theme';
import * as themes from '../../../styles/themes';

export interface IndicatorData {
    label: string;
    value: string;
}

interface IndicatorChartOptions {
    getIndicatorData: (indicator: string, displayOption: string) => Array<IndicatorData>;
    indicatorSelectionOptions: Array<Option>;
}

const displayOptions = [
    { value: "TRIMESTRAL", label: "TRIMESTRAL" },
    { value: "ANUAL", label: "ANUAL" },
];

const IndicatorChart: React.FC<IndicatorChartOptions> = ({ getIndicatorData, indicatorSelectionOptions }) => {

    const [selectedIndicator, setSelectedIndicator] = useState<string>(indicatorSelectionOptions[0].value);
    const [selectedDisplayOption, setSelectedDisplayOption] = useState<string>(displayOptions[0].value);
    const [indicatorsData, setIndicatorsData] = useState<Array<IndicatorData>>(getIndicatorData(selectedIndicator, selectedDisplayOption));

    const { currentTheme } = useAppTheme();
    const theme = themes[currentTheme];

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
                            fontColor: theme.colors.grey,
                        },
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            fontColor: theme.colors.grey,
                            beginAtZero: true,
                        },
                        gridLines: {
                            color: theme.colors.grey,
                            zeroLineColor: theme.colors.grey,
                            zeroLineWidth: 2,
                        },
                    }
                ]
            }
        },
    }


    useEffect(() => {
        if (selectedIndicator && selectedDisplayOption) {
            const currentData = getIndicatorData(selectedIndicator, selectedDisplayOption);

            setIndicatorsData(currentData);
        }
    }, [selectedIndicator, selectedDisplayOption]);

    const getData = (): any => {
        return {
            labels: indicatorsData.map(d => d.label),
            datasets: [{
                data: indicatorsData.map(d => d.value),
                borderColor: 'rgba(32, 226, 47, 1)',
                backgroundColor: 'rgba(32, 226, 47, 0.56)',
                hoverBackgroundColor: 'rgba(32, 226, 47, 0.40)',
                borderWidth: 1.5,
            }]
        }
    }

    return (
        <Container>
            <SelectContainer>
                <Selection
                    options={indicatorSelectionOptions}
                    onChange={(event) => setSelectedIndicator(event.target.value)} />
                <Selection
                    options={displayOptions}
                    onChange={(event) => setSelectedDisplayOption(event.target.value)} />
            </SelectContainer>
            <BarChart
                data={getData()}
                options={chartOptions}
            />
        </Container>
    );
};

export default IndicatorChart;
