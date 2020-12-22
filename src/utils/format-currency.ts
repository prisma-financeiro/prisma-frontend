export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
    .format(value)
    .replace(/\u00A0/, ' ');

export const formatCurrencyCompact = (value: number) => new Intl.NumberFormat('pt-br', {
  notation: "compact",
  minimumFractionDigits: 2,
}).format(value);

export const formatStandard = (value: number) => new Intl.NumberFormat('pt-br', {
  notation: 'standard',
}).format(value);
