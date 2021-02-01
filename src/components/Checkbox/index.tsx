import React from 'react';

import { Container } from './styles';

interface CheckboxProps {
  onChange: (checked: boolean) => void,
  checked: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, children, onChange }) =>  {
    return (
      <Container
        onClick={() => onChange(!checked)}
      >
        <input
          type="checkbox"
          checked={checked}
        />
        <label>{children}</label>
      </Container>
    );
}

export default Checkbox;