import React from "react";
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
// Chart.defaults.global.legend.display = false;

interface BarChartProps {
    data: Array<any>;
    color: string;
}

export default class BarChart extends React.Component<BarChartProps, BarChartProps> {
    chartRef: React.RefObject<any>;
    myChart!: Chart;

    constructor(props: BarChartProps) {
        super(props);
        this.chartRef = React.createRef();
    }

    // componentDidUpdate() {
    //   this.myChart.data.labels = this.props.data.map(d => d.time);
    //   this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    //   this.myChart.update();
    // }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                            type: 'time',
                            distribution: 'series',
                            time: {
                                displayFormats: {
                                    quarter: 'MMM D'
                                }
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                color: 'grey',
                            },
                            ticks: {
                                min: 0,
                                max: 20,

                            }
                        }
                    ]
                }
            },
            data: {
                labels: this.props.data.map(d => d.time),
                datasets: [{
                    data: this.props.data.map(d => d.value),
                    fill: 'none',
                    // backgroundColor: this.props.color,
                    // borderColor: this.props.color,
                    borderColor: 'green',
                    backgroundColor: 'red',
                    borderWidth: 1.5,
                    pointBorderWidth: 3,
                    pointRadius: 2,
                    lineTension: 0
                }]
            }
        });
    }

    render() {
        return (
            <canvas ref={this.chartRef} />
        )
    }
}