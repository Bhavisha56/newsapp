// context/PayoutContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const PayoutContext = createContext();
export const usePayout = () => useContext(PayoutContext);

export const PayoutProvider = ({ children }) => {
  const [payoutItems, setPayoutItems] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('payout');
    if (stored) setPayoutItems(JSON.parse(stored));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('payout', JSON.stringify(payoutItems));
  }, [payoutItems]);

  const addToPayout = (item) => {
    setPayoutItems((prev) => [...prev, item]);
  };

  const removeFromPayout = (indexToRemove) => {
    setPayoutItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <PayoutContext.Provider value={{ payoutItems, addToPayout, removeFromPayout }}>
      {children}
    </PayoutContext.Provider>
  );
};
