import React from 'react';

import FavoritedCard from '../../../components/FavoritedCard';
import Hint from '../../../components/Hint';

import indicators from '../../../utils/indicators-description';

import { 
  Container, 
  Title, 
  Field,
  AssetHeader,
  HintContainer } from './styles';

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
  const endividamentoFieldNames = ['Liq. Corrente', 'Passivos/Ativos', 'PL/Ativos', 'Dívida Liq./EBIT', 'Dívida Liq./EBITDA', 'Dívida Liq./PL'];
  const eficienciaFieldNames = ['Margem Bruta', 'Margem Líquida', 'Margem EBIT', 'Margem EBITDA'];

  const renderFields = (indicatorFieldNames: string[]) => {
    return indicatorFieldNames.map((field, index) => (
      <Field key={index}>
        {field} 
        <HintContainer>
          <Hint title={field} content={indicators[field]}/>
        </HintContainer>
      </Field>)
    )
  }

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

      <div ref={anchor.valuation}>
        <Title thinnerHeight={true}>
          Valuation
        </Title>
        {renderFields(valuationFieldNames)}
      </div>

      <div ref={anchor.rentabilidade}>
        <Title>
          Rentabilidade
        </Title>
        {renderFields(rentabilidadeFieldNames)}
      </div>

      <div ref={anchor.endividamento}>
        <Title>
          Endividamento
        </Title>
        {renderFields(endividamentoFieldNames)}
      </div>

      <div  ref={anchor.eficiencia}>
        <Title>
          Eficiência
        </Title>
        {renderFields(eficienciaFieldNames)}
      </div>

    </Container>
  );
}

export default VerticalHeader;