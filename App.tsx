
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Chatbot from './components/Chatbot';
import VoiceAgent from './components/VoiceAgent';
import AdminDashboard from './components/AdminDashboard';
import ProductImage from './components/ProductImage';
import { INITIAL_PRODUCTS, BUSINESS_INFO, TESTIMONIALS, FAQS } from './constants';
import { Product, Category, Inquiry, QuoteRequest } from './types';
import { Search, Filter, MapPin, Phone, Mail, Clock, ShieldCheck, Award, Users, Droplets, Star, ChevronDown, ChevronUp, MessageCircle, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState<(Product & { imagePrompt?: string })[]>(INITIAL_PRODUCTS);
  const [filter, setFilter] = useState<Category | 'Tous'>('Tous');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('zz_products');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const handleInquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newInquiry: Inquiry = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('company') as string,
      message: formData.get('message') as string,
      timestamp: new Date().toLocaleString(),
      status: 'Pending'
    };
    
    const existing = JSON.parse(localStorage.getItem('zz_inquiries') || '[]');
    localStorage.setItem('zz_inquiries', JSON.stringify([newInquiry, ...existing]));
    alert('Votre message a été envoyé avec succès ! Nous vous contacterons sous peu.');
    e.currentTarget.reset();
  };

  const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedProds: string[] = [];
    e.currentTarget.querySelectorAll('input[type="checkbox"]:checked').forEach((el: any) => {
      selectedProds.push(el.nextElementSibling.textContent);
    });

    const newQuote: QuoteRequest = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      products: selectedProds,
      quantity: 1,
      timestamp: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem('zz_inquiries') || '[]');
    localStorage.setItem('zz_inquiries', JSON.stringify([{...newQuote, service: 'DEVIS', message: `Produits: ${selectedProds.join(', ')}`}, ...existing]));
    alert('Demande de devis envoyée ! Notre équipe commerciale vous répondra rapidement.');
    e.currentTarget.reset();
  };

  const filteredProducts = filter === 'Tous' 
    ? products 
    : products.filter(p => p.category === filter);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <section className="py-24 bg-gray-50 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
                  <h2 className="text-4xl font-bold mb-4 font-montserrat uppercase tracking-tight">Nos Produits Vedettes</h2>
                  <p className="text-gray-600 text-lg">Sélection exclusive pour nos partenaires professionnels.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {products.filter(p => p.isFeatured).slice(0, 3).map((p, idx) => (
                    <div key={p.id} className={`opacity-0 animate-[fadeInUp_1s_ease-out_forwards]`} style={{ animationDelay: `${idx * 0.2}s` }}>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
                <div className="text-center mt-12">
                  <button 
                    onClick={() => setCurrentPage('products')}
                    className="text-blue-600 font-bold flex items-center justify-center space-x-2 mx-auto hover:underline group text-lg"
                    aria-label="Voir tout le catalogue"
                  >
                    <span>Découvrir tout le catalogue</span>
                    <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* Testimonials Preview Section */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-4xl font-bold font-montserrat mb-4">Ils nous font confiance</h2>
                    <p className="text-gray-500">Avis de nos clients professionnels à travers l'Algérie.</p>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('testimonials')} 
                    className="text-blue-600 font-bold hover:underline"
                    aria-label="Voir tous les témoignages"
                  >
                    Voir tout
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {TESTIMONIALS.slice(0, 2).map((t) => (
                    <TestimonialCard key={t.id} testimonial={t} />
                  ))}
                </div>
              </div>
            </section>
          </>
        );
      case 'products':
        return (
          <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div>
                <h1 className="text-4xl font-bold font-montserrat mb-2">Catalogue Grossiste</h1>
                <p className="text-gray-600">Explorez nos {products.length} références disponibles.</p>
              </div>
              <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                {['Tous', 'Lavabo', 'Meuble', 'Robinetterie', 'Baignoire'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat as any)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                      filter === cat ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((p, idx) => (
                <div key={p.id} className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: `${(idx % 4) * 0.1}s` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="max-w-7xl mx-auto px-4 py-24 animate-in slide-in-from-bottom-8 duration-700">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <h1 className="text-5xl font-bold font-montserrat mb-8 leading-tight">Expertise & <span className="text-blue-600">Innovation</span> Sanitaire</h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Zz-Sanitaire s'est imposé comme le leader de la distribution de matériel sanitaire à Ouled Moussa. Notre mission est de fournir aux professionnels du bâtiment des solutions durables.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-12">
                   <div className="p-6 bg-blue-50 rounded-2xl">
                     <Users className="h-8 w-8 text-blue-600 mb-4" aria-hidden="true" />
                     <h3 className="font-bold mb-2">Support B2B</h3>
                     <p className="text-sm text-gray-500">Accompagnement dédié pour vos chantiers.</p>
                   </div>
                   <div className="p-6 bg-blue-50 rounded-2xl">
                     <ShieldCheck className="h-8 w-8 text-blue-600 mb-4" aria-hidden="true" />
                     <h3 className="font-bold mb-2">Garantie</h3>
                     <p className="text-sm text-gray-500">Qualité certifiée sur tout le catalogue.</p>
                   </div>
                </div>
              </div>
              <div className="relative">
                <ProductImage 
                  prompt="Modern industrial sanitary equipment showroom, professional B2B setting, luxury display"
                  alt="Showroom de Zz-Sanitaire"
                  className="rounded-3xl shadow-2xl"
                  aspectRatio="4:3"
                />
              </div>
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold font-montserrat mb-4 uppercase">Témoignages</h1>
              <p className="text-xl text-gray-600">Découvrez l'expérience de nos clients professionnels.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <TestimonialCard key={`${t.id}-${idx}`} testimonial={t} />
              ))}
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="max-w-3xl mx-auto px-4 py-24">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold font-montserrat mb-4">Questions Fréquentes</h1>
              <p className="text-gray-600">Tout ce que vous devez savoir sur nos services de gros.</p>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={activeFaq === idx}
                  >
                    <span className="font-bold text-gray-900">{faq.question}</span>
                    {activeFaq === idx ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-gray-400" />}
                  </button>
                  {activeFaq === idx && (
                    <div className="px-6 pb-6 text-gray-600 animate-in slide-in-from-top-2">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="animate-in slide-in-from-left duration-700">
                <h1 className="text-4xl font-bold font-montserrat mb-8">Nous Contacter</h1>
                <div className="space-y-8 mb-12">
                  <ContactItem icon={<MapPin className="text-blue-600" />} title="Adresse" text={BUSINESS_INFO.location} />
                  <a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 font-bold hover:underline ml-14">
                    Voir sur Google Maps <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                  <ContactItem icon={<Phone className="text-blue-600" />} title="Téléphone" text={BUSINESS_INFO.phone} />
                  <ContactItem icon={<Mail className="text-blue-600" />} title="Email" text={BUSINESS_INFO.email} />
                </div>
                <div className="p-8 bg-blue-600 rounded-3xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Besoin d'aide immédiate ?</h3>
                  <p className="mb-6 opacity-90">Nos conseillers sont disponibles sur WhatsApp pour répondre à vos questions techniques.</p>
                  <a href={BUSINESS_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                    <MessageCircle className="mr-2 h-5 w-5" /> Discuter sur WhatsApp
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-in slide-in-from-right duration-700">
                <form className="space-y-6" onSubmit={handleInquirySubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label="Nom complet" name="name" placeholder="Ex: Ahmed Ben" required />
                    <InputField label="Entreprise" name="company" placeholder="Ex: SARL Construction" required />
                  </div>
                  <InputField label="Email" name="email" type="email" placeholder="votre@email.com" required />
                  <InputField label="Téléphone" name="phone" placeholder="+213..." required />
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Message</label>
                    <textarea 
                      name="message"
                      required
                      className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 min-h-[150px] outline-none"
                      placeholder="Comment pouvons-nous vous aider ?"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                    Envoyer le Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      case 'admin':
        return <AdminDashboard />;
      case 'quote':
        return (
          <div className="max-w-4xl mx-auto px-4 py-24 text-center animate-in zoom-in duration-500">
            <h1 className="text-4xl font-bold mb-6 font-montserrat">Demande de Devis Professionnel</h1>
            <p className="text-xl text-gray-600 mb-12">Bénéficiez de tarifs préférentiels pour vos achats en volume.</p>
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-left">
               <form className="space-y-8" onSubmit={handleQuoteSubmit}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <InputField label="Nom complet" name="name" placeholder="Nom" required />
                    <InputField label="Téléphone" name="phone" placeholder="+213..." required />
                  </div>
                  <InputField label="Email" name="email" type="email" placeholder="votre@email.com" required />
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Produits Souhaités</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['Lavabos', 'Meubles', 'Baignoires', 'Robinetterie', 'Accessoires'].map(item => (
                        <label key={item} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors group">
                          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl active:scale-95">
                    Envoyer ma demande
                  </button>
               </form>
            </div>
          </div>
        );
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-blue-100 selection:text-blue-900">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      
      {/* Floating WhatsApp FAB */}
      <a 
        href={BUSINESS_INFO.whatsapp} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-[90] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95 flex items-center group"
        aria-label="Contacter sur WhatsApp Business"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-bold">WhatsApp Business</span>
      </a>

      <Chatbot />
      <VoiceAgent />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

// Helper Components
const ProductCard: React.FC<{ product: Product & { imagePrompt?: string } }> = ({ product }) => (
  <article className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
    <div className="aspect-[4/3] overflow-hidden relative">
      <ProductImage 
        prompt={product.imagePrompt || `Sanitary product ${product.name}`}
        alt={product.name}
        className="w-full h-full"
        aspectRatio="4:3"
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600 border border-blue-100">
        {product.category}
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">{product.name}</h3>
        <span className="text-blue-600 font-bold">{product.priceRange}</span>
      </div>
      <p className="text-sm text-gray-500 mb-6 line-clamp-2">{product.description}</p>
      <button className="w-full bg-gray-50 text-gray-900 py-3 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all active:scale-95">
        Voir Détails
      </button>
    </div>
  </article>
);

const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => (
  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 h-full flex flex-col">
    <div className="flex text-yellow-400 mb-4" aria-label={`${testimonial.rating} étoiles sur 5`}>
      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
    </div>
    <p className="text-gray-700 italic mb-6 leading-relaxed flex-grow">"{testimonial.content}"</p>
    <div>
      <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
      <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
    </div>
  </div>
);

const ContactItem: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="flex space-x-4 group">
    <div className="bg-blue-50 p-3 rounded-2xl h-fit group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300" aria-hidden="true">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-1 uppercase tracking-wider text-xs">{title}</h4>
      <p className="text-gray-600 font-medium">{text}</p>
    </div>
  </div>
);

const InputField: React.FC<{ label: string; placeholder: string; type?: string; name: string; required?: boolean }> = ({ label, placeholder, type = 'text', name, required = false }) => (
  <div className="space-y-2 text-left">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    <input 
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      autoComplete="on"
      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
    />
  </div>
);

const Footer: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => (
  <footer className="bg-gray-900 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center space-x-2 mb-6 cursor-pointer group" onClick={() => onNavigate('home')}>
            <Droplets className="h-8 w-8 text-blue-500 group-hover:animate-bounce" />
            <span className="text-2xl font-bold font-montserrat tracking-tight">Zz-Sanitaire</span>
          </div>
          <p className="text-gray-400 max-w-sm text-lg leading-relaxed mb-8">
            Grossiste leader en solutions sanitaires haute performance pour les professionnels de la construction en Algérie.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-xs opacity-50">Navigation</h4>
          <ul className="space-y-4 text-gray-400">
            <li><button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors">Accueil</button></li>
            <li><button onClick={() => onNavigate('products')} className="hover:text-blue-400 transition-colors">Produits</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">À Propos</button></li>
            <li><button onClick={() => onNavigate('testimonials')} className="hover:text-blue-400 transition-colors">Témoignages</button></li>
            <li><button onClick={() => onNavigate('faq')} className="hover:text-blue-400 transition-colors">FAQ</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-xs opacity-50">Support</h4>
          <ul className="space-y-4 text-gray-400">
            <li><button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors">Contact</button></li>
            <li><button onClick={() => onNavigate('quote')} className="hover:text-blue-400 transition-colors">Demande de Devis</button></li>
            <li><a href={BUSINESS_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">WhatsApp Business</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2024 Zz-Sanitaire. Tous droits réservés. Ouled Moussa, Algérie.</p>
        <p className="mt-4 md:mt-0">Propulsé par Zz-Sanitaire AI</p>
      </div>
    </div>
  </footer>
);

export default App;
