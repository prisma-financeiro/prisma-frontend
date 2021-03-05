import light from './light';

const dark: typeof light = {
  ...light,
  colors: {
    ...light.colors,
    grey: '#d4d6e0',
    lightGrey: '#F3F3F3',
    darkGrey: '#343233',
    background: '#272727',
    color4: '#2E2D2D',
    h1: '#F3F3F3',
    h2: '#F3F3F3',
    h3: '#F3F3F3'
  },
};

export default dark;
