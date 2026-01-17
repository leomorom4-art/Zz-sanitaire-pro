
export type Category = 'Lavabo' | 'Meuble' | 'Robinetterie' | 'Baignoire' | 'Accessoires';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  priceRange: string;
  image: string;
  isFeatured?: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
  status: 'Pending' | 'Contacted' | 'Closed';
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  products: string[];
  quantity: number;
  timestamp: string;
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
