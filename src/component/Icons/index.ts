import { SVGProps } from 'react';

export type AvailableSVGProps = Pick<
  SVGProps<SVGSVGElement>,
  'width' | 'height'
>;

export * from './Loading';
