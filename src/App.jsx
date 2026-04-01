import React, { useState } from 'react';
import { useStore } from './store/useStore';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { SummaryCards } from './components/Overview/SummaryCards';
import { Charts } from './components/Overview/Charts';
import { TransactionList } from './components/Transactions/TransactionList';
import { TransactionForm } from './components/Transactions/TransactionForm';
import { InsightsPanel } from './components/Insights/InsightsPanel';

function App() {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditRow = (transaction) => {
    setEditingTransaction(transaction || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  return (
    <DashboardLayout>
      
      {/* Overview Elements */}
      <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
      
      <SummaryCards />
      
      <Charts />
      
      <InsightsPanel />

      <TransactionList onEditRow={handleEditRow} />

      {/* Admin editing/adding modal */}
      {isFormOpen && (
        <TransactionForm 
          transaction={editingTransaction} 
          onClose={handleCloseForm} 
        />
      )}

    </DashboardLayout>
  );
}

export default App;
