
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Chatbot from './components/Chatbot';
import VoiceAgent from './components/VoiceAgent';
import AdminDashboard from './components/AdminDashboard';
import { INITIAL_PRODUCTS, BUSINESS_INFO } from './constants';
import { Product, Category, Inquiry, QuoteRequest } from './types';
import { Search, Filter, MapPin, Phone, Mail, Clock, ShieldCheck, Award, Users, Droplets } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filter, setFilter] = useState<Category | 'Tous'>('Tous');

  // Load products from localStorage on mount
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
      quantity: 1, // Default or add field
      timestamp: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem('zz_inquiries') || '[]'); // Reusing inquiry storage for simplicity or create separate
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
                  <h2 className="text-4xl font-bold mb-4 font-montserrat">Nos Produits Vedettes</h2>
                  <p className="text-gray-600">Sélection exclusive pour nos clients professionnels.</p>
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
                    className="text-blue-600 font-bold flex items-center justify-center space-x-2 mx-auto hover:underline group"
                  >
                    <span>Voir tout le catalogue</span>
                    <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </button>
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
            <div className="grid md:grid-cols-4 gap-8">
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
                <h1 className="text-5xl font-bold font-montserrat mb-8">Votre Partenaire Sanitaire de <span className="text-blue-600">Confiance</span></h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Zz-Sanitaire s'est imposé comme le leader de la distribution de matériel sanitaire à Ouled Moussa. Notre mission est de fournir aux professionnels du bâtiment des solutions durables, esthétiques et innovantes.
                </p>
                <p className="text-lg text-gray-600 mb-10">
                  Depuis notre création, nous privilégions la qualité des matériaux et la satisfaction client. Nous collaborons avec les meilleures marques pour garantir des standards européens sur le marché algérien.
                </p>
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">10+</div>
                    <div className="text-sm text-gray-500 font-medium">Années d'Expertise</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">500+</div>
                    <div className="text-sm text-gray-500 font-medium">Clients B2B</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">2k+</div>
                    <div className="text-sm text-gray-500 font-medium">Projets Réalisés</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
                  alt="Quality Control" 
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden sm:block">
                  <Award className="h-12 w-12 mb-4" />
                  <div className="text-xl font-bold">Certification Qualité</div>
                  <div className="text-blue-100 opacity-80">Produits Normés ISO</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="animate-in slide-in-from-left duration-700">
                <h1 className="text-4xl font-bold font-montserrat mb-8">Contactez-nous</h1>
                <p className="text-gray-600 mb-12 text-lg">
                  Vous avez un projet de construction ou de rénovation ? Notre équipe B2B est là pour vous accompagner.
                </p>
                <div className="space-y-8">
                  <ContactItem icon={<MapPin className="text-blue-600" />} title="Adresse" text={BUSINESS_INFO.location} />
                  <ContactItem icon={<Phone className="text-blue-600" />} title="Téléphone" text={BUSINESS_INFO.phone} />
                  <ContactItem icon={<Mail className="text-blue-600" />} title="Email" text={BUSINESS_INFO.email} />
                  <ContactItem icon={<Clock className="text-blue-600" />} title="Horaires" text={BUSINESS_INFO.hours} />
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
            <h1 className="text-4xl font-bold mb-6 font-montserrat">Demande de Devis Personnalisé</h1>
            <p className="text-xl text-gray-600 mb-12">Remplissez le formulaire ci-dessous et recevez une offre adaptée à votre volume.</p>
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-left">
               <form className="space-y-8" onSubmit={handleQuoteSubmit}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <InputField label="Nom complet" name="name" placeholder="Nom" required />
                    <InputField label="Téléphone" name="phone" placeholder="+213..." required />
                  </div>
                  <InputField label="Email" name="email" type="email" placeholder="votre@email.com" required />
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Produits Intéressés</label>
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
                    Obtenir mon Devis
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
      <Chatbot />
      <VoiceAgent />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

// Helper Components
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
    <div className="aspect-[4/3] overflow-hidden relative">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
  </div>
);

const ContactItem: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="flex space-x-4 group">
    <div className="bg-blue-50 p-3 rounded-2xl h-fit group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

const InputField: React.FC<{ label: string; placeholder: string; type?: string; name: string; required?: boolean }> = ({ label, placeholder, type = 'text', name, required = false }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{label}</label>
    <input 
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
    />
  </div>
);

const Footer: React.FC<{ onNavigate: (p: string) => void }> = ({ onNavigate }) => (
  <footer className="bg-gray-900 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <div className="flex items-center space-x-2 mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
            <Droplets className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold font-montserrat tracking-tight">Zz-Sanitaire</span>
          </div>
          <p className="text-gray-400 max-w-sm text-lg leading-relaxed mb-8">
            Grossiste leader en solutions sanitaires haute performance pour les professionnels de la construction en Algérie.
          </p>
          <div className="flex space-x-4">
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">FB</div>
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">IN</div>
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">LN</div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Navigation</h4>
          <ul className="space-y-4 text-gray-400">
            <li><button onClick={() => onNavigate('home')} className="hover:text-blue-400 transition-colors">Accueil</button></li>
            <li><button onClick={() => onNavigate('products')} className="hover:text-blue-400 transition-colors">Produits</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">À Propos</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors">Contact</button></li>
            <li><button onClick={() => onNavigate('quote')} className="hover:text-blue-400 transition-colors">Devis</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Informations</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>{BUSINESS_INFO.location}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-blue-500" />
              <span>{BUSINESS_INFO.phone}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-blue-500" />
              <span>{BUSINESS_INFO.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2024 Zz-Sanitaire. Tous droits réservés.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
          <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
        </div>
      </div>
    </div>
  </footer>
);

export default App;
