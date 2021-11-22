function isVirtualSymbol(symbol: string) {
  return isDomesticVirtualSymbol(symbol) || isForeignVirtualSymbol(symbol);
}

function isDomesticVirtualSymbol(symbol: string) {
  return symbol.slice(3, 5) === '00';
}

function isForeignVirtualSymbol(symbol: string) {
  const nearOrFarMonthSymbol = ['.00.', '.FF.'];

  return nearOrFarMonthSymbol.some((each) => symbol.includes(each));
}

export { isVirtualSymbol };
export default isVirtualSymbol;
