import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const SummaryCards = () => {
  const transactions = useStore((state) => state.transactions);

  const { totalBalance, income, expense } = useMemo(() => {
    const inc = transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc, 0);
    const exp = transactions.reduce((acc, t) => t.type === 'expense' ? acc + t.amount : acc, 0);
    return {
      totalBalance: inc - exp,
      income: inc,
      expense: exp
    };
  }, [transactions]);

  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: <DollarSign size={24} className="text-primary" />,
      bg: 'bg-primary/10',
      textColor: 'text-primary'
    },
    {
      title: 'Total Income',
      amount: income,
      icon: <TrendingUp size={24} className="text-emerald-500" />,
      bg: 'bg-emerald-500/10',
      textColor: 'text-emerald-500'
    },
    {
      title: 'Total Expenses',
      amount: expense,
      icon: <TrendingDown size={24} className="text-destructive" />,
      bg: 'bg-destructive/10',
      textColor: 'text-destructive'
    }
  ];

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
          className="bg-card rounded-xl p-6 shadow-sm border border-border flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div className={`p-4 rounded-xl ${card.bg}`}>
            {card.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold tracking-tight">{formatCurrency(card.amount)}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
