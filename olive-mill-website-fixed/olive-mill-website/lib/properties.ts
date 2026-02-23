export interface Property {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  description: string;
  gallery: string[];
}

const properties: Property[] = [
  {
    id: 'olive-villa',
    name: 'Olive Villa',
    location: 'Woodland, CA',
    imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
    description:
      'A serene olive grove villa offering tranquil living spaces and stunning views.',
    gallery: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6',
    ],
  },
  {
    id: 'sunset-retreat',
    name: 'Sunset Retreat',
    location: 'Napa Valley, CA',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
    description:
      'A modern retreat nestled in Napa Valley featuring luxurious interiors and breathtaking sunsets.',
    gallery: [
      'https://images.unsplash.com/photo-1521119989659-a83eee488004',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1495433324511-bf8e92934d90',
    ],
  },
  {
    id: 'modern-loft',
    name: 'Modern Loft',
    location: 'San Francisco, CA',
    imageUrl: 'https://images.unsplash.com/photo-1549187774-b4e9a92ef64e',
    description:
      'A stylish loft in the heart of San Francisco combining contemporary design with comfort.',
    gallery: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1',
    ],
  },
];

export default properties;