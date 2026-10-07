import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GameItem {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  category: string;
  image: string;
}

interface CartContextType {
  cart: GameItem[];
  addToCart: (game: GameItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<GameItem[]>([]);

  const addToCart = (game: GameItem) => {
    setCart((prevCart) => {
      const exists = prevCart.some((item) => item.id === game.id);
      if (exists) return prevCart;
      return [...prevCart, game];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};