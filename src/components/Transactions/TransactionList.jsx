import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Search as SearchIcon, Filter, Plus, FileEdit, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionList = ({ onEditRow }) => {
  const { role, searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, deleteTransaction, transactions: allTransactions } = useStore();

  const transactions = useMemo(() => {
    return allTransactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [allTransactions, searchTerm, categoryFilter]);

  // Get unique categories for filter
  const categories = ['All', ...new Set(allTransactions.map(t => t.category))].sort();

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm mb-8 overflow-hidden">
      
      {/* Header & Controls */}
      <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text"
              placeholder="Search descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          
          {/* Category Filter */}
          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Add Button (Admin Only) */}
          {role === 'admin' && (
            <button 
              onClick={() => onEditRow(null)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus size={16} /> Add 
            </button>
          )}
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-muted text-muted-foreground sticky top-0 z-10 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              {role === 'admin' && <th className="px-6 py-4 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <AnimatePresence>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-8 text-center text-muted-foreground">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <motion.tr 
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="hover:bg-muted/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium">{t.description}</td>
                    <td className="px-6 py-4">
                      <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      <span className={t.type === 'income' ? 'text-emerald-500' : ''}>
                        {t.type === 'income' ? '+' : '-'} ${t.amount.toFixed(2)}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => onEditRow(t)}
                          className="p-1.5 text-muted-foreground hover:text-primary rounded-md hover:bg-muted transition-colors"
                        >
                          <FileEdit size={16} />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(t.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};
