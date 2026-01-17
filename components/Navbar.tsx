
import React, { useState } from 'react';
import { Menu, X, Droplets, User } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', id: 'home' },
    { name: 'Produits', id: 'products' },
    { name: 'À Propos', id: 'about' },
    { name: 'Contact', id: 'contact' },
    { name: 'Admin', id: 'admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center space-x-2 group"
            >
              <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900 font-montserrat">
                Zz-Sanitaire
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  currentPage === link.id ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => onNavigate('quote')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
            >
              Demander un Devis
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => {
              onNavigate('quote');
              setIsOpen(false);
            }}
            className="w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold"
          >
            Demander un Devis
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
