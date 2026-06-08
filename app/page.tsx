"use client";
import { useEffect, useState } from 'react';
import { Part } from '@/lib/store';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/lib/auth';

export default function PartsStore() {
  const { role } = useAuth();
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/parts')
      .then(res => res.json())
      .then(data => {
        setParts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-gray-500">Загрузка каталога...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Каталог автозапчастей</h1>
        <p className="text-gray-500 mt-1">Доступные детали на складе</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parts.map(part => (
          <div key={part.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {part.category}
                </div>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {part.stock} шт
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900">{part.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{part.description}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                {role === 'guest' ? (
                  <span className="text-sm text-gray-500 italic">Цены доступны покупателям</span>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-gray-900">{part.price} ₽</span>
                    <button 
                      onClick={() => addToCart(part)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors" 
                      title="В корзину"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
