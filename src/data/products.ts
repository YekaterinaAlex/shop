import type { Product } from '../types/Product';

import cloudImage from '../assets/images/cloud.png';
import twistImage from '../assets/images/twist.png';
import bubbleImage from '../assets/images/bubble.png';
import honeycombImage from '../assets/images/honeycomb.png';
import archImage from '../assets/images/arch.png';
import blossomImage from '../assets/images/blossom.png';
import amberGlowImage from '../assets/images/amber-glow.png';
import lavenderDreamsImage from '../assets/images/lavender-dreams.png';
import pureLinenImage from '../assets/images/pure-linen.png';
import goldenHourImage from '../assets/images/golden-hour.png';
import honeyOakImage from '../assets/images/honey-oak.png';
import citrusMorningImage from '../assets/images/citrus-morning.png';

export const products: Product[] = [
  {
    id: 1,
    name: 'Cloud',
    description: 'A charming cloud-shaped candle with a soft, minimalist design.',
    candleType: 'sculptural',
    waxType: 'soy',
    price: 12,
    weight: 120,
    image: cloudImage,
  },
  {
    id: 2,
    name: 'Twist',
    description: 'An elegant twisted candle that adds a modern touch to any interior.',
    candleType: 'sculptural',
    waxType: 'soy',
    price: 14,
    weight: 150,
    image: twistImage,
  },
  {
    id: 3,
    name: 'Bubble',
    description: 'A playful bubble-shaped candle with a unique geometric design.',
    candleType: 'sculptural',
    waxType: 'soy',
    price: 11,
    weight: 130,
    image: bubbleImage,
  },
  {
    id: 4,
    name: 'Honeycomb',
    description: 'A decorative beeswax candle inspired by the natural honeycomb pattern.',
    candleType: 'sculptural',
    waxType: 'beeswax',
    price: 16,
    weight: 180,
    image: honeycombImage,
  },
  {
    id: 5,
    name: 'Arch',
    description: 'A minimalist geometric candle shaped like a graceful arch.',
    candleType: 'sculptural',
    waxType: 'beeswax',
    price: 15,
    weight: 170,
    image: archImage,
  },
  {
    id: 6,
    name: 'Blossom',
    description: 'A delicate flower-shaped candle made from natural beeswax.',
    candleType: 'sculptural',
    waxType: 'beeswax',
    price: 13,
    weight: 140,
    image: blossomImage,
  },
  {
    id: 7,
    name: 'Amber Glow',
    description: 'A warm scented candle with comforting vanilla and sandalwood notes.',
    candleType: 'container',
    waxType: 'soy',
    price: 22,
    weight: 200,
    image: amberGlowImage,
  },
  {
    id: 8,
    name: 'Lavender Dreams',
    description: 'A relaxing candle with a delicate lavender fragrance.',
    candleType: 'container',
    waxType: 'soy',
    price: 20,
    weight: 200,
    image: lavenderDreamsImage,
  },
  {
    id: 9,
    name: 'Pure Linen',
    description: 'A fresh and clean fragrance inspired by freshly washed linen.',
    candleType: 'container',
    waxType: 'soy',
    price: 19,
    weight: 180,
    image: pureLinenImage,
  },
  {
    id: 10,
    name: 'Golden Hour',
    description: 'A natural beeswax candle with a warm golden glow.',
    candleType: 'container',
    waxType: 'beeswax',
    price: 24,
    weight: 220,
    image: goldenHourImage,
  },
  {
    id: 11,
    name: 'Honey & Oak',
    description: 'A cozy candle combining warm woody notes with a hint of honey.',
    candleType: 'container',
    waxType: 'beeswax',
    price: 26,
    weight: 250,
    image: honeyOakImage,
  },
  {
    id: 12,
    name: 'Citrus Morning',
    description: 'A refreshing candle with bright and uplifting citrus notes.',
    candleType: 'container',
    waxType: 'beeswax',
    price: 21,
    weight: 200,
    image: citrusMorningImage,
  },
];
