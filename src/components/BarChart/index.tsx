import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { CharCanvas } from "./styles";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";

interface BarChartProps {
    data: Chart.ChartData;
    options: Chart.ChartConfiguration;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
    const chartRef: React.RefObject<any> = React.createRef();
    const [chart, setChart] = useState<Chart>();

    useEffect(() => {

        if (!chart) {
            const newChart = new Chart(chartRef.current, options);
            newChart.data = data;
            newChart.update();

            setChart(newChart);
        }

        if (chart) {
            chart.data = data;
            chart.update();
        }
    })

    return (
        <CharCanvas ref={chartRef} />
    )
}

export default BarChart;