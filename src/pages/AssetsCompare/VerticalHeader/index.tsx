import React from 'react';

import { Container, Title, Field, FieldGroup, AssetHeader } from './styles';
import FavoritedCard from '../../../components/FavoritedCard';

interface VerticalHeaderProps {
  anchor: {
    valuation: React.MutableRefObject<any>,
    rentabilidade: React.MutableRefObject<any>,
    eficiencia: React.MutableRefObject<any>,
    endividamento: React.MutableRefObject<any>,
  };
  numberOfAssets: number;
  isLoading: boolean;
  openModal(): void
}
const VerticalHeader: React.FC<VerticalHeaderProps> = ({ anchor, numberOfAssets, isLoading, openModal }) => {
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
        <Field>
          P/L
        </Field>
        <Field>
          LPA
        </Field>
        <Field>
          VPA
        </Field>
      </FieldGroup>

      <FieldGroup ref={anchor.rentabilidade}>
        <Title>
          Rentabilidade
        </Title>
        <Field>
          ROE
        </Field>
        <Field>
          ROA
        </Field>
        <Field>
          ROIC
        </Field>
      </FieldGroup>

      <FieldGroup ref={anchor.endividamento}>
        <Title>
          Endividamento
        </Title>
        <Field>
          Liq. Corrent
        </Field>
        <Field>
          Passivos / Ativos
        </Field>
        <Field>
          PL / Ativos
        </Field>
        <Field>
          Dívida Liq. / EBIT
        </Field>
        <Field>
          Dívida Liq. / EBITDA
        </Field>
        <Field>
          Dívida Liq. / PL
        </Field>
      </FieldGroup>

      <FieldGroup  ref={anchor.eficiencia}>
        <Title>
          Eficiência
        </Title>
        <Field>
          Margen Bruta
        </Field>
        <Field>
          Margen Líquida
        </Field>
        <Field>
          Margen EBIT
        </Field>
        <Field>
          Margen EBITDA
        </Field>
      </FieldGroup>

    </Container>
  );
}

export default VerticalHeader;