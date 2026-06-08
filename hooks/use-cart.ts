"use client";
import { useState, useEffect } from 'react';
import { Part } from '@/lib/store';

export function useCart() {
  const [cart, setCart] = useState<Part[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('autoparts_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Ошибка парсинга корзины из LocalStorage', error);
      }
    }
  }, []);

  const addToCart = (part: Part) => {
    const updatedCart = [...cart, part];
    setCart(updatedCart);
    localStorage.setItem('autoparts_cart', JSON.stringify(updatedCart));
    alert(`${part.title} добавлен в корзину!`);
  };

  const removeFromCart = (indexToRemove: number) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem('autoparts_cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('autoparts_cart');
  };

  return { cart, addToCart, removeFromCart, clearCart };
}

