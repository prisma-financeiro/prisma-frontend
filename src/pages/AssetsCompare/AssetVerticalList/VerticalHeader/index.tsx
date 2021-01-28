import React from 'react';

import { Container, Title, Field, FieldGroup, EmptyBox } from './styles';

const VerticalHeader: React.FC = () => {
  return (
    <Container>
      <EmptyBox />

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

    </Container>
  );
}

export default VerticalHeader;