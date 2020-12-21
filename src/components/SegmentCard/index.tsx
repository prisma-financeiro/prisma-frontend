import React, { useEffect, useState } from 'react';

import { Container, Title, Description, CountWrapper, Count, CountSubtitle } from './styles';

interface SegmentCardProps {
  title: string;
  description?: string;
  companyCount?: number;
  onClick?: (event: any) => any;
}

const SegmentCard: React.FC<SegmentCardProps> = ({ title, description, companyCount, onClick, children }) => {

  return (
    <Container onClick={(event) => onClick ? onClick(event) : null}>
      <Description>
        {description ? description : "Não Informado"}
      </Description>
      <Title>
        {title}
      </Title>
      <CountWrapper>
        <Count>
          {companyCount}
        </Count>
        <CountSubtitle>
          {companyCount ? "Empresas" : ""}
        </CountSubtitle>
      </CountWrapper>
    </Container>
  )
}

export default SegmentCard;