import React, { InputHTMLAttributes } from 'react';

import { Container, StyledInput, IconContainer } from './styles';
import { FiSearch } from 'react-icons/fi';
import Spinner from '../Spinner';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  isLoading?: boolean;
  showIcon: boolean;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <Container>
      <StyledInput 
        {...props}
      />
      {props.showIcon && (
        <IconContainer>
          {props.isLoading ? (
            <Spinner />
          ) : (
            <FiSearch />
          )}
        </IconContainer>
      )}
    </Container>
  );
}

export default Input;