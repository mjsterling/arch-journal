export const shortNumber = (num: number) => {
  if (num >= 10000) {
    return Math.round(num / 1000).toFixed(0) + 'k';
  }
  if (num >= 1000) {
    return (Math.round(num / 100) / 10).toFixed(1) + 'k';
  }
  return num.toString();
};
