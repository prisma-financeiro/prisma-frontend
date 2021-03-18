const getIndicatorValueFormated = (indicator: number, simbol: string | undefined = ''): string => {
  return indicator ? 
    parseFloat(String(indicator))
      .toFixed(2)
        .replace('.', ',') + simbol : '-';
}

export default getIndicatorValueFormated;