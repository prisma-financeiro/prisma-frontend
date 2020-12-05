import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import useAppTheme from "../../contexts/theme";
import * as themes from '../../styles/themes';

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";

interface BarChartProps {
    data: Array<any>;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const chartRef: React.RefObject<any> = React.createRef();
    const [chart, setChart] = useState<Chart>();
    const { currentTheme } = useAppTheme();
    const theme = themes[currentTheme];

    useEffect(() => {

        if (!chart) {
            const newChart = new Chart(chartRef.current, {
                type: 'bar',
                options: {
                    legend: {
                        display: false
                    },
                },
                data: {
                    // labels: this.props.data.map(d => d.time),
                    labels: ['2020-01-01', '2020-04-01', '2020-07-01'],
                    datasets: [{
                        // data: this.props.data.map(d => d.value),
                        data: [5, 4.5, 2.8],
                        borderColor: 'rgba(32, 226, 47, 1)',
                        backgroundColor: 'rgba(32, 226, 47, 0.56)',
                        borderWidth: 1.5,
                    }]
                }
            });

            setChart(newChart);
        }

        if (chart) {
            chart.options = {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
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
                            },
                            gridLines: {
                                color: theme.colors.grey,
                            },
                        }
                    ]
                }
            }
            chart.update();
        }
    })

    return (
        <canvas ref={chartRef} />
    )
}

export default BarChart;