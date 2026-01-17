
import { Product, Testimonial, FAQItem } from './types';

export const BUSINESS_INFO = {
  name: 'Zz-Sanitaire',
  location: 'Ouled Moussa, Ouled Moussa, Algeria',
  phone: '+213 5XX XX XX XX',
  whatsapp: 'https://wa.me/2135XXXXXXXX',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ouled+Moussa+Sanitaire',
  email: 'contact@zz-sanitaire.dz',
  hours: 'Sat - Thu: 08:00 - 17:00',
  description: 'Spécialiste de la vente en gros de produits sanitaires de haute qualité en Algérie.',
};

export const INITIAL_PRODUCTS: (Product & { imagePrompt: string })[] = [
  {
    id: '1',
    name: 'Lavabo Design Porcelaine',
    category: 'Lavabo',
    description: 'Lavabo suspendu en porcelaine blanche de première qualité, design épuré.',
    priceRange: '€€€€',
    image: '', // Managed by generator
    imagePrompt: 'Premium white porcelain wall-hung washbasin, minimalist modern design, luxury showroom background',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Meuble de Bain Moderne 80cm',
    category: 'Meuble',
    description: 'Ensemble meuble avec vasque intégrée et miroir LED pour projets résidentiels.',
    priceRange: '€€€€',
    image: '',
    imagePrompt: '80cm modern bathroom vanity unit, wood finish, integrated white sink, LED mirror above, realistic interior',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Mitigeur Cascade Chromé',
    category: 'Robinetterie',
    description: 'Robinet haut de gamme avec cartouche céramique durable et finition miroir.',
    priceRange: '€€€€',
    image: '',
    imagePrompt: 'Luxury chrome bathroom waterfall faucet, studio lighting, water flowing effect, high-end fixture',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Baignoire Îlot Luxe',
    category: 'Baignoire',
    description: 'Baignoire autoportante en acrylique renforcé, ergonomie supérieure.',
    priceRange: '€€€€',
    image: '',
    imagePrompt: 'Freestanding luxury oval bathtub, white acrylic, modern luxury bathroom setting, catalog style',
  },
  {
    id: '5',
    name: 'Pack Colonne Douche',
    category: 'Robinetterie',
    description: 'Système de douche thermostatique avec tête XXL et jet massant.',
    priceRange: '€€€€',
    image: '',
    imagePrompt: 'Thermostatic shower column set, stainless steel, modern spray head, professional plumbing display',
  },
  {
    id: '6',
    name: 'Meuble Double Vasque 120cm',
    category: 'Meuble',
    description: 'Grand format pour hôtellerie et projets résidentiels de prestige.',
    priceRange: '€€€€',
    image: '',
    imagePrompt: '120cm double sink bathroom vanity cabinet, marble top, modern gray finish, wholesale catalog view',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Mohamed Brahimi',
    company: 'SARL Immo-Construction',
    content: 'Zz-Sanitaire est notre fournisseur principal depuis 3 ans. La qualité est toujours au rendez-vous et le stock est fiable.',
    rating: 5,
  },
  {
    id: '2',
    author: 'Karim Ziane',
    company: 'Entreprise Plomberie Moderne',
    content: 'Le meilleur rapport qualité-prix en gros pour les meubles de salle de bain design.',
    rating: 5,
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "Proposez-vous la livraison sur chantier ?",
    answer: "Oui, nous organisons la livraison sur tout le territoire national pour les commandes en gros volume."
  },
  {
    question: "Quels sont vos délais pour un devis personnalisé ?",
    answer: "Notre équipe commerciale traite vos demandes sous 24 à 48 heures ouvrables."
  },
  {
    question: "Les produits sont-ils garantis ?",
    answer: "Tous nos produits bénéficient d'une garantie constructeur de 2 à 10 ans selon la gamme."
  }
];
