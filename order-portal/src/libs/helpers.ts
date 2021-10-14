
const ringgitFormatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
});

export const convertCentsToRM = (cents: number): string => ringgitFormatter.format(cents / 100);