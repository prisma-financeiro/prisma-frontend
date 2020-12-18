import React, { useEffect, useState } from 'react';

import { Container, Title, CompaniesCount, Description, CountWrapper, Count, CountSubtitle } from './styles';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface SegmentCardProps {
  id: number;
  title: string;
  description: string;
  companyCount: number;
}

const SegmentCard: React.FC<SegmentCardProps> = ({ id, title, description, companyCount, children }) => {
  const [segmentId, setSegmentId] = useState<number>(id);

  return (
    <Container>
      <Description>
        {description}
      </Description>
      <Title>
        {title}
      </Title>
      <CountWrapper>
        <Count>
          {companyCount}
        </Count>
        <CountSubtitle>
          {'Empresas'}
        </CountSubtitle>
      </CountWrapper>
    </Container>
  )
}

export default SegmentCard;