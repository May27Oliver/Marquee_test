function isPrimeDisplayDenominator(denominator: number) {
  const DENOMINATOR_USE_APOSTROPHE_DISPLAY = [
    4,
    8,
    32,
    64,
    128,
    256,
    320,
    3200,
    32000,
    64000,
  ];
  return DENOMINATOR_USE_APOSTROPHE_DISPLAY.includes(denominator);
}

export { isPrimeDisplayDenominator };
export default isPrimeDisplayDenominator;
