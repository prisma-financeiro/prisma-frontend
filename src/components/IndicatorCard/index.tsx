import React from 'react';

import {
  Container,
  Header,
  Title,
  Content,
  Value,
} from './styles';

import { Divider } from '../ContentDivider/styles';

interface IndicatorCardProps {
  indicatorName: string;
  value: number;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ indicatorName, value }) => {
  return (
    <Container>
      <Header>
        <Title>
          <h1>{indicatorName}</h1>
        </Title>
      </Header>
      <Divider />
      <Content>
        <Value>
          {value}
        </Value>
      </Content>
    </Container>
  );
}

export default IndicatorCard;