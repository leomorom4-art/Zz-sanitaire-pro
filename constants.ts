
import { Product } from './types';

export const BUSINESS_INFO = {
  name: 'Zz-Sanitaire',
  location: 'Ouled Moussa, Ouled Moussa, Algeria',
  phone: '+213 5XX XX XX XX',
  email: 'contact@zz-sanitaire.dz',
  hours: 'Sat - Thu: 08:00 - 17:00',
  description: 'Spécialiste de la vente en gros de produits sanitaires de haute qualité en Algérie.',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Lavabo Design Porcelaine',
    category: 'Lavabo',
    description: 'Lavabo suspendu en porcelaine blanche de première qualité.',
    priceRange: '€€€€',
    image: 'https://picsum.photos/seed/lavabo1/600/400',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Meuble de Bain Moderne 80cm',
    category: 'Meuble',
    description: 'Ensemble meuble avec vasque intégrée et miroir LED.',
    priceRange: '€€€€',
    image: 'https://picsum.photos/seed/meuble1/600/400',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Mitigeur Cascade Chromé',
    category: 'Robinetterie',
    description: 'Robinet haut de gamme avec cartouche céramique durable.',
    priceRange: '€€€€',
    image: 'https://picsum.photos/seed/robinet1/600/400',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Baignoire Îlot Luxe',
    category: 'Baignoire',
    description: 'Baignoire autoportante en acrylique renforcé.',
    priceRange: '€€€€',
    image: 'https://picsum.photos/seed/baignoire1/600/400',
  },
  {
    id: '5',
    name: 'Pack Colonne Douche',
    category: 'Robinetterie',
    description: 'Système de douche thermostatique avec tête XXL.',
    priceRange: '€€€€',
    image: 'https://picsum.photos/seed/douche1/600/400',
  },
  {
    id: '6',
    name: 'Meuble Double Vasque 120cm',
    category: 'Meuble',
    description: 'Grand format pour projets résidentiels de luxe.',
    priceRange: '€€€€',
    image: 'https://picsum.photos/seed/meuble2/600/400',
  },
];
