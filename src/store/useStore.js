import { create } from 'zustand';
import { initialTransactions } from '../data/mockData';

export const useStore = create((set) => ({
  // Core State
  transactions: initialTransactions,
  role: 'viewer', // 'viewer' or 'admin'
  searchTerm: '',
  categoryFilter: 'All',
  isDarkMode: false,

  // Actions
  addTransaction: (transaction) => set((state) => ({
    transactions: [{ ...transaction, id: crypto.randomUUID() }, ...state.transactions]
  })),

  updateTransaction: (id, updated) => set((state) => ({
    transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updated } : t))
  })),

  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter((t) => t.id !== id)
  })),

  setRole: (role) => set({ role }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),

  toggleDarkMode: () => {
    set((state) => {
      const nextTheme = !state.isDarkMode;
      if (nextTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDarkMode: nextTheme };
    });
  }
}));
