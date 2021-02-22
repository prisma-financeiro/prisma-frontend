import React from 'react';

import FavoritedCard from '../../../components/FavoritedCard';

import { 
  Container, 
  Title, 
  Field, 
  FieldGroup, 
  AssetHeader } from './styles';

interface VerticalHeaderProps {
  anchor: {
    valuation: React.MutableRefObject<any>,
    rentabilidade: React.MutableRefObject<any>,
    eficiencia: React.MutableRefObject<any>,
    endividamento: React.MutableRefObject<any>,
  };
  openModal(): void
}

const VerticalHeader: React.FC<VerticalHeaderProps> = ({ anchor, openModal }) => {

  const valuationFieldNames = ['P/L', 'LPA', 'VPA'];
  const rentabilidadeFieldNames = ['ROE', 'ROA', 'ROIC'];
  const endividamentoFieldNames = ['Liq. Corrente', 'Passivos / Ativos', 'PL / Ativos', 'Dívida Liq. / EBIT', 'Dívida Liq. / EBITDA', 'Dívida Liq. / PL'];
  const eficienciaFieldNames = ['Margen Bruta', 'Margen Líquida', 'Margen EBIT', 'Margen EBIT'];

  return (
    <Container>
      <AssetHeader>
        <FavoritedCard
          roundedCorners={false}
          emptyCard={true}
          backgroundDarker={true}
          removeCardCallback={() => { }}
          addNewCardCallback={openModal}
        />
      </AssetHeader>

      <FieldGroup ref={anchor.valuation}>
        <Title>
          Valuation
        </Title>
        {valuationFieldNames.map((field, index) => <Field key={index}>{field}</Field>)}
      </FieldGroup>

      <FieldGroup ref={anchor.rentabilidade}>
        <Title>
          Rentabilidade
        </Title>
        {rentabilidadeFieldNames.map((field, index) => <Field key={index}>{field}</Field>)}
      </FieldGroup>

      <FieldGroup ref={anchor.endividamento}>
        <Title>
          Endividamento
        </Title>
        {endividamentoFieldNames.map((field, index) => <Field key={index}>{field}</Field>)}
      </FieldGroup>

      <FieldGroup  ref={anchor.eficiencia}>
        <Title>
          Eficiência
        </Title>
        {eficienciaFieldNames.map((field, index) => <Field key={index}>{field}</Field>)}
      </FieldGroup>

    </Container>
  );
}

export default VerticalHeader;