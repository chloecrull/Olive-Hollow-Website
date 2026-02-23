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
    location: 'Northern California',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=80',
    description:
      'A serene residence framed by natural light, refined materials, and calm outdoor space — designed for quiet comfort and effortless living.',
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80',
    ],
  },
  {
    id: 'sunset-retreat',
    name: 'Sunset Retreat',
    location: 'Wine Country',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=80',
    description:
      'A warm, modern retreat with open living space and elevated finishes — positioned to capture the soft glow of evening light.',
    gallery: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80',
    ],
  },
  {
    id: 'modern-loft',
    name: 'Modern Loft',
    location: 'Bay Area',
    imageUrl: 'https://images.unsplash.com/photo-1549187774-b4e9a92ef64e?auto=format&fit=crop&w=2400&q=80',
    description:
      'A contemporary loft aesthetic with balanced proportions, premium textures, and a clean, airy interior — effortless and modern.',
    gallery: [
      'https://images.unsplash.com/photo-1549187774-b4e9a92ef64e?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?auto=format&fit=crop&w=2000&q=80',
    ],
  },
];

export default properties;
