import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { AlertCircle, TrendingUp, TrendingDown, Info } from 'lucide-react';

export const InsightsPanel = () => {
  const transactions = useStore((state) => state.transactions);

  const insights = useMemo(() => {
    if (transactions.length === 0) return [];

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Total spent this month vs last month
    const thisMonthSpent = expenses.reduce((acc, t) => {
      const d = new Date(t.date);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) return acc + t.amount;
      return acc;
    }, 0);

    const lastMonthSpent = expenses.reduce((acc, t) => {
      const d = new Date(t.date);
      let lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      let targetYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      if (d.getMonth() === lastMonth && d.getFullYear() === targetYear) return acc + t.amount;
      return acc;
    }, 0);

    let monthCompareMsg = "Not enough data for previous month.";
    let monthIcon = <Info size={20} className="text-primary" />;
    if (lastMonthSpent > 0) {
      const diff = thisMonthSpent - lastMonthSpent;
      const pct = (Math.abs(diff) / lastMonthSpent * 100).toFixed(1);
      if (diff > 0) {
        monthCompareMsg = `You spent ${pct}% more this month than last month.`;
        monthIcon = <TrendingUp size={20} className="text-destructive" />;
      } else {
        monthCompareMsg = `Great! You spent ${pct}% less this month than last month.`;
        monthIcon = <TrendingDown size={20} className="text-emerald-500" />;
      }
    }

    // Highest category overall
    const catMap = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    let highestCat = '';
    let highestAmount = 0;
    Object.entries(catMap).forEach(([k, v]) => {
      if (v > highestAmount) {
        highestAmount = v;
        highestCat = k;
      }
    });

    const highestCatMsg = highestAmount > 0 
      ? `Your highest expense category is ${highestCat} ($${highestAmount.toFixed(2)}).` 
      : "No highest spending category found.";

    return [
      { id: 1, icon: monthIcon, text: monthCompareMsg },
      { id: 2, icon: <AlertCircle size={20} className="text-amber-500" />, text: highestCatMsg }
    ];

  }, [transactions]);

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">AI Observations</h3>
      {insights.length === 0 ? (
        <p className="text-muted-foreground text-sm">Not enough data to generate insights.</p>
      ) : (
        <div className="space-y-4 text-sm font-medium">
          {insights.map(i => (
            <div key={i.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex-shrink-0 mt-0.5">{i.icon}</div>
              <p className="text-foreground">{i.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
