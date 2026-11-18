export type CandleType = 'sculptural' | 'container';

export type WaxType = 'soy' | 'beeswax';

export interface Product {
  id: number;
  name: string;
  description: string;
  candleType: CandleType;
  waxType: WaxType;
  price: number;
  weight: number;
  image: string;
}
