import React, { useEffect, useState } from 'react';

import {
  Container,
  Header,
  Title,
  Content,
  Value,
} from './styles';

import BarChart from '../BarChart';
import useAppTheme from '../../contexts/theme';
import * as themes from '../../styles/themes';

interface IndicatorCardProps {
  indicatorName: string;
  value: number;
}

export const fakeIndicatorYear = {
  "cache": false,
  "content": [
    {
      "value": "15.0500000000",
      "year": 2019
    },
    {
      "value": "23.8300000000",
      "year": 2018
    },
    {
      "value": "-4.0400000000",
      "year": 2017
    },
    {
      "value": "6.0400000000",
      "year": 2016
    },
    {
      "value": "12.5600000000",
      "year": 2015
    }
  ]
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicatorName, value }) => {
  const [indicatorData, setIndicatorData] = useState(fakeIndicatorYear.content);

  const { currentTheme } = useAppTheme();
  const theme = themes[currentTheme];

  const data: Chart.ChartData = {
    labels: indicatorData.map(d => d.year).reverse(),
    datasets: [{
      data: indicatorData.map(d => parseFloat(d.value)).reverse(),
      borderColor: 'rgba(32, 226, 47, 1)',
      backgroundColor: 'rgba(32, 226, 47, 0.56)',
      hoverBackgroundColor: 'rgba(32, 226, 47, 0.40)',
      borderWidth: 0.5,
      maxBarThickness: 10,

    }]
  }

  useEffect(() => {

  });

  const chartConfig: Chart.ChartConfiguration = {
    type: 'bar',
    options: {
      legend: {
        display: false
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
              display: false,
              // color: theme.colors.darkGrey,
              // zeroLineColor: theme.colors.lightGrey,
              zeroLineWidth: 0.5,
            },
          }
        ]
      }
    },
  }

  return (
    <Container>
      <Header>
        <Value>
          {parseFloat(String(value)).toFixed(2).toString().replace('.', ',')}
        </Value>
        <Title>
          <h1>{indicatorName}</h1>
        </Title>
      </Header>
      <Content>
        <BarChart
          data={data}
          options={chartConfig}
        />
      </Content>
    </Container>
  );
}

export default IndicatorCard;