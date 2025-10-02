import { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id ? { ...i, qty: i.qty + (action.item.qty || 1) } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, qty: action.item.qty || 1 }],
      };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i => (i.id === action.id ? { ...i, qty: action.qty } : i)),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    () => {
      // Lazy initializer: read from localStorage once
      try {
        const raw = localStorage.getItem('cart');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) return { items: parsed };
          if (parsed && Array.isArray(parsed.items)) return { items: parsed.items };
        }
      } catch (e) {
        // ignore parse errors, fall back to empty
      }
      return { items: [] };
    }
  );

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } catch (e) {
      // Could optionally surface a warning
    }
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems,
      totalPrice,
      addToCart: item => dispatch({ type: 'ADD', item }),
      removeFromCart: id => dispatch({ type: 'REMOVE', id }),
      updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty: Math.max(1, qty) }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }),
    [state, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider />');
  return ctx;
}
