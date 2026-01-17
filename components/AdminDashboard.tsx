
import React, { useState, useEffect } from 'react';
import { Package, MessageSquare, Plus, Trash2, Edit, Save, CheckCircle2, User, Clock, Phone, Mail } from 'lucide-react';
import { Product, Inquiry } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'inquiries'>('products');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    // Initialize from local storage or constants
    const savedProducts = localStorage.getItem('zz_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('zz_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    const savedInquiries = localStorage.getItem('zz_inquiries');
    if (savedInquiries) {
      setInquiries(JSON.parse(savedInquiries));
    }
  }, []);

  const saveToStorage = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('zz_products', JSON.stringify(newProducts));
    // Also update global event for app.tsx if needed, or rely on reload
  };

  const deleteProduct = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const updated = products.filter(p => p.id !== id);
      saveToStorage(updated);
    }
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    localStorage.setItem('zz_inquiries', JSON.stringify(updated));
  };

  const addProduct = () => {
    const newProd: Product = {
      id: Date.now().toString(),
      name: 'Nouveau Produit',
      category: 'Lavabo',
      description: 'Description du produit...',
      priceRange: '€€€€',
      image: 'https://picsum.photos/seed/' + Math.random() + '/600/400',
    };
    saveToStorage([newProd, ...products]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-montserrat">Gestion Zz-Sanitaire</h2>
          <p className="text-gray-500">Gérez votre inventaire et vos demandes clients.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg transition-all ${
              activeTab === 'products' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Package className="h-4 w-4" />
            <span className="text-sm font-semibold">Produits</span>
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg transition-all relative ${
              activeTab === 'inquiries' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm font-semibold">Demandes</span>
            {inquiries.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {inquiries.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Catalogue Produits ({products.length})</h3>
            <button 
              onClick={addProduct}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-bold">Ajouter un Produit</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Nom</th>
                  <th className="px-6 py-4">Catégorie</th>
                  <th className="px-6 py-4">Prix</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <img src={p.image} className="w-12 h-12 rounded-lg object-cover shadow-sm" alt="" />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-blue-600 font-bold">{p.priceRange}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => deleteProduct(p.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {inquiries.length > 0 ? (
            <div className="grid gap-6">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{inq.name}</h4>
                        <div className="text-xs text-gray-400 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {inq.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => deleteInquiry(inq.id)}
                        className="text-gray-400 hover:text-red-600 p-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {inq.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {inq.phone}
                    </div>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-gray-400" />
                      Sujet: {inq.service}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-gray-800 text-sm whitespace-pre-wrap italic">
                    "{inq.message}"
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
              <MessageSquare className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Boîte de réception vide</h3>
              <p className="text-gray-500">Les demandes de devis et messages de contact apparaîtront ici.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
