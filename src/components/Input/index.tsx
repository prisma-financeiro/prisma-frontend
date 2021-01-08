import React, { InputHTMLAttributes } from 'react';

import { Container, StyledInput, IconContainer } from './styles';
import Spinner from '../Spinner';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <Container>
      <StyledInput 
        {...props}
      />
      <IconContainer>
        {props.isLoading ? <Spinner /> : props.icon }    
      </IconContainer>
    </Container>
  );
}

export default Input;