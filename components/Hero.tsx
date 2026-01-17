
import React from 'react';
import { ArrowRight, CheckCircle, Droplets } from 'lucide-react';
import ProductImage from './ProductImage';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              Grossiste Sanitaire #1 en Algérie
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-8">
              Équipez vos Projets avec <span className="text-blue-600">Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Une large gamme de produits sanitaires de qualité supérieure pour les acheteurs en gros, installateurs et promoteurs immobiliers à Ouled Moussa et partout en Algérie.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => onNavigate('products')}
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-xl active:scale-95 group"
              >
                Explorer le Catalogue
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95"
              >
                Nous Contacter
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {['Produits Certifiés', 'Prix Compétitifs', 'Stock Disponible', 'Livraison Rapide'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 lg:mt-0 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float">
              <ProductImage 
                prompt="Luxury wholesale sanitary showroom in Algeria, high-end washbasins and modern bathroom vanities display, architectural photography"
                alt="Showroom Zz-Sanitaire"
                className="w-full h-auto"
                aspectRatio="16:9"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden sm:block border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">+500</div>
                  <div className="text-sm text-gray-500 font-medium">Modèles en Stock</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
