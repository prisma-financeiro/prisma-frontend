import React, { useEffect, useState } from "react";
import { createChart, IChartApi, ISeriesApi, DeepPartial, ChartOptions } from "lightweight-charts"; // https://github.com/tradingview/lightweight-charts
import { Container } from "./styles";
import useAppTheme from "../../contexts/theme";
import * as themes from '../../styles/themes';

interface LineChartProps {
    data: Array<any>;
}

const chartOptions: DeepPartial<ChartOptions> = {
    localization: {
        dateFormat: 'yyyy/MM/dd',
    },
    rightPriceScale: {
        borderVisible: false,
        autoScale: true,
        entireTextOnly: true,
    },
    timeScale: {
        borderVisible: false,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
    },
    watermark: {
        color: 'rgba(0, 0, 0, 0)',
    },
    grid: {
        vertLines: {
            visible: false,
        },
        horzLines: {
            color: '#363C4E',
        },
    },
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    const chartRef: React.RefObject<any> = React.createRef();
    const [chart, setChart] = useState<IChartApi>();

    const { currentTheme } = useAppTheme();
    const theme = themes[currentTheme];

    useEffect(() => {

        if (!chart) {
            const newChart: IChartApi = createChart(chartRef.current, chartOptions);

            const chartSeries: ISeriesApi<"Area"> = newChart.addAreaSeries({
                topColor: 'rgba(32, 226, 47, 0.56)',
                bottomColor: 'rgba(32, 226, 47, 0.04)',
                lineColor: 'rgba(32, 226, 47, 1)',
                lineWidth: 2,
            });

            chartSeries.setData(data);
            newChart.timeScale().fitContent();

            setChart(newChart);
        }

        if (chart) {
            chart.applyOptions(
                {
                    layout: {
                        backgroundColor: theme.colors.background,
                        textColor: theme.colors.grey,
                    },
                    grid: {
                        horzLines: {
                            color: theme.colors.greyLowerOpacity,
                        },
                    },
                }
            );
        }
    });

    return (
        <Container
            ref={chartRef}
            onChange={() => alert("test")}
        />
    )
}

export default LineChart;