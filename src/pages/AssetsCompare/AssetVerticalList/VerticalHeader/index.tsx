import React from 'react';

import { Container, Title, Field, FieldGroup, EmptyBox, AssetHeader } from './styles';

const VerticalHeader: React.FC = () => {
  return (
    <Container>
      <AssetHeader>
        <EmptyBox />
      </AssetHeader>

      <FieldGroup>
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

      <FieldGroup>
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

      <FieldGroup>
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

      <FieldGroup>
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