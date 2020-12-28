import React from 'react';

import { Container } from './styles';

interface LogoProps {
  imageUrl: string;
}

const Logo: React.FC<LogoProps> = ({ imageUrl }) => {
  return imageUrl ? 
    <Container src={imageUrl} /> : 
    <Container src="https://eu.ui-avatars.com/api/"/>;
}

export default Logo;