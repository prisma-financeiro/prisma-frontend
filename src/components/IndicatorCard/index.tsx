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

const getIndicatorData = () => {

  const data = {
    "cache": false,
    "content": [
      {
        "value": Math.floor(Math.random() * 201) - 100,
        "year": 2019
      },
      {
        "value": Math.floor(Math.random() * 201) - 100,
        "year": 2018
      },
      {
        "value": Math.floor(Math.random() * 201) - 100,
        "year": 2017
      },
      {
        "value": Math.floor(Math.random() * 201) - 100,
        "year": 2016
      },
      {
        "value": Math.floor(Math.random() * 201) - 100,
        "year": 2015
      },
      {
        "value": Math.floor(Math.random() * 201) - 100,
        "year": 2014
      },
      {
        "value": Math.floor(Math.random() * 201) - 100,
        "year": 2013
      }

    ]
  }

  return data.content.map(item => {
    return {
      ...item,
      color: {
        backgroundColor: item.value > 0 ? 'rgba(32, 226, 47, 0.35)' : 'rgba(300, 10, 10, 0.35)',
        hoverBackgroundColor: item.value > 0 ? 'rgba(32, 226, 47, 1)' : '#E81010',
        borderColor: item.value > 0 ? 'rgba(32, 226, 47, 1)' : '#E82020',
      }

    }
  }).reverse();

}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicatorName, value }) => {
  const [indicatorData, setIndicatorData] = useState(getIndicatorData());

  const { currentTheme } = useAppTheme();
  const theme = themes[currentTheme];

  const data: Chart.ChartData = {
    labels: indicatorData.map(d => d.year),
    datasets: [{
      data: indicatorData.map(d => d.value),
      borderColor: indicatorData.map(d => d.color.borderColor),
      backgroundColor: indicatorData.map(d => d.color.backgroundColor),
      hoverBackgroundColor: indicatorData.map(d => d.color.hoverBackgroundColor),
      borderWidth: 0.5,
      maxBarThickness: 10,
      fill: false,
    }]
  }

  const chartConfig: Chart.ChartConfiguration = {
    type: 'bar',
    options: {
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
              zeroLineColor: 'rgba(100, 100, 100, 0.40)',
              offsetGridLines: false,
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
          <p>{indicatorName}</p>
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