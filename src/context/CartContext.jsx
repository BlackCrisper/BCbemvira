import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'bemvira_cart';

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD': return action.payload ?? [];
    case 'ADD': {
      const existing = state.find((i) => i.id === action.payload.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE': return state.filter((i) => i.id !== action.payload);
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity < 1) return state.filter((i) => i.id !== id);
      return state.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
    }
    case 'CLEAR': return [];
    default: return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'LOAD', payload: JSON.parse(raw) });
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (_) {}
  }, [items]);

  const addItem = (item) => dispatch({ type: 'ADD', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const getCount = () => items.reduce((n, i) => n + (i.quantity || 1), 0);
  const getTotal = () => {
    const parse = (s) => parseFloat(String(s).replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    return items.reduce((sum, i) => sum + parse(i.price) * (i.quantity || 1), 0);
  };
  const formatTotal = () => `R$ ${getTotal().toFixed(2).replace('.', ',')}`;

  const value = { items, addItem, removeItem, updateQuantity, getCount, getTotal, formatTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
