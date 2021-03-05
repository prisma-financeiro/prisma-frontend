import React, { useState, useEffect } from 'react';

import getIndicatorValueFormated from '../../utils/format-company-indicator';

import BarChart from '../BarChart';
import { useBreakpoints } from '../../hooks/useBreakpoints';

import {
  Container,
  Header,
  Title,
  Content,
  Value,
} from './styles';

interface IndicatorCardProps {
  indicatorName: string;
  value: number;
  representationCharacter: string;
  chartData?: any[];
  onClick: (indicatorName: string) => void;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicatorName, value, chartData, onClick, representationCharacter }) => {
  const device = useBreakpoints();
  const [data, setData] = useState<Chart.ChartData>();

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const indicatorData = formatChartData(chartData);

      setData({
        labels: indicatorData.map(d => d.year),
        datasets: [{
          data: indicatorData.map(d => d.value),
          borderColor: indicatorData.map(d => d.color.borderColor),
          backgroundColor: indicatorData.map(d => d.color.backgroundColor),
          hoverBackgroundColor: indicatorData.map(d => d.color.hoverBackgroundColor),
          borderWidth: 0.5,
          maxBarThickness: 20,
          barThickness: device.isMobile ? 5 : 15,
          spanGaps: true,
          fill: false,
          minBarLength: 5,
          hitRadius: 10,
        }]
      })
    }
  }, [chartData, device.isMobile, indicatorName]);

  const formatChartData = (data: Array<any>) => {
    return data.map(item => {
      return {
        ...item,
        color: {
          backgroundColor: item.value > 0 ? '#20C05C' : '#fe807a',
          hoverBackgroundColor: item.value > 0 ? '#20AD48' : '#fe807a',
          borderColor: item.value > 0 ? '#20C05C' : '#fe807a',
        }

      }
    }).reverse();
  }

  const chartConfig: Chart.ChartConfiguration = {
    type: 'bar',
    options: {
      animation: {
        easing: 'easeInOutQuint'
      },
      elements: {
        line: {
          borderJoinStyle: 'round'
        },
      },
      responsive: true,
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 5,
          right: 10,
          top: 5,
          bottom: 5
        },
      },
      tooltips: {
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
        xPadding: 15,
      },
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              display: false,
            },
          }
        ],
        yAxes: [
          {
            ticks: {
              display: false,
            },
            gridLines: {
              display: true,
              color: 'transparent',
              zeroLineWidth: 0.8,
              zeroLineColor: 'rgba(88, 99, 99, 0.40)',
              offsetGridLines: false,
            },
          }
        ]
      }
    },
  }

  return (
    <Container
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(indicatorName)}
    >
      <Header>
        <Value>
          { value && getIndicatorValueFormated(value, representationCharacter) }
        </Value>
        <Title>
          <p>{indicatorName}</p>
        </Title>
      </Header>
      <Content>
        {
          !device.isMobile &&
          value &&
          data &&
          <BarChart
            data={data}
            options={chartConfig}
          />
        }

      </Content>
    </Container>
  );
}

export default IndicatorCard;