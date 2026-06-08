"use client";
import { useCart } from '@/hooks/use-cart';
import { Trash2, ShoppingCart, CreditCard, Lock } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { role } = useAuth();
  
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  if (role === 'guest') {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Lock className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Для работы с корзиной нужна авторизация</h2>
        <p className="text-gray-500 mt-2 text-center max-w-md">
          Гости не могут совершать покупки. Переключите роль на <b>Покупатель</b> или <b>Администратор</b> в верхнем меню.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ваша корзина</h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-200">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-gray-900">Корзина пуста</h2>
          <p className="text-gray-500 mt-1 mb-6">Вы еще не добавили ни одной запчасти.</p>
          <Link 
            href="/" 
            className="inline-flex bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li key={`${item.id}-${index}`} className="p-6 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-gray-900">{item.price} ₽</span>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                      title="Удалить из корзины"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button 
                onClick={clearCart}
                className="text-sm border border-gray-300 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-gray-700 font-medium transition"
              >
                Очистить корзину
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
                Итого
              </h2>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Товаров ({cart.length}):</span>
                <span className="font-bold text-xl text-gray-900">{totalPrice} ₽</span>
              </div>
              <button 
                onClick={() => alert('Функция оформления заказа в разработке!')}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition flex justify-center items-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
