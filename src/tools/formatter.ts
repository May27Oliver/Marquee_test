import numeral from 'numeral';

import decimalMap from '../decimalMap.json';
import { isPrimeDisplayDenominator } from './isPrimeDisplayDenominator';

function priceFormatterFactory({
  fractionDigits,
  denominator,
  defaultValue: factoryDefaultValue = '--',
}: {
  /** 顯示小數位數 */
  fractionDigits: number;
  /** 分母 */
  denominator: number;
  /** 預設顯示 */
  defaultValue?: string;
}) {
  const decimalToPrimeMap = decimalMap['decimalToPrime'] as any;

  return (value: number | null, defaultValue?: string) => {
    if (value === null) {
      return defaultValue || factoryDefaultValue;
    }

    if (!isPrimeDisplayDenominator(denominator)) {
      return normalPriceFormatter(value, fractionDigits);
    }

    const [integer, decimal] = value.toString().split('.');
    if (!decimal) {
      return `${integer}'0`;
    }

    const decimalValue = `0.${decimal}`;

    if (
      decimalToPrimeMap[decimalValue] &&
      decimalToPrimeMap[decimalValue][denominator]
    ) {
      return `${integer}'${decimalToPrimeMap[decimalValue][denominator]}`;
    }

    return normalPriceFormatter(value, fractionDigits);
  };
}

function normalPriceFormatter(value: number, fractionDigits: number = 0) {
  return numeral(value).format(
    `0.${'0'.repeat(Math.max(fractionDigits, 0))}`,
    Math.floor,
  );
}
export { priceFormatterFactory };
