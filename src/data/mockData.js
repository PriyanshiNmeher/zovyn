import { subDays } from 'date-fns';

const categories = [
  'Groceries',
  'Utilities',
  'Entertainment',
  'Dining',
  'Transport',
  'Salary',
  'Freelance',
  'Healthcare',
  'Shopping',
  'Investments'
];

const generateMockData = (count = 50) => {
  const data = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    // Generate dates spread over the last 30 days
    const date = subDays(today, Math.floor(Math.random() * 30)).toISOString();
    
    // 70% chance of an expense, 30% chance of income
    const isExpense = Math.random() > 0.3;
    const type = isExpense ? 'expense' : 'income';
    
    // Pick categories based on type
    const expenseCategories = ['Groceries', 'Utilities', 'Entertainment', 'Dining', 'Transport', 'Healthcare', 'Shopping'];
    const incomeCategories = ['Salary', 'Freelance', 'Investments'];
    
    const categoryList = isExpense ? expenseCategories : incomeCategories;
    const category = categoryList[Math.floor(Math.random() * categoryList.length)];
    
    // Generate amounts skewed towards lower values, but occasional larger ones
    let amount = 0;
    if (isExpense) {
      amount = Math.floor(Math.random() * 150) + 10; // 10 to 160
      if (Math.random() > 0.9) amount += 500; // Rare large expense (rent, etc.)
    } else {
      amount = Math.floor(Math.random() * 1000) + 500; // 500 to 1500
      if (category === 'Salary') amount += 3000;
    }

    // Determine an appealing description
    const expenseMerchants = ['Amazon', 'Uber', 'Walmart', 'Netflix', 'Starbucks', 'Pharmacy', 'Gas Station', 'Apple Store'];
    const incomeSources = ['Employer Inc', 'Upwork', 'Dividends', 'Client Payment', 'Stripe Transfer'];
    const sourceList = isExpense ? expenseMerchants : incomeSources;
    const description = sourceList[Math.floor(Math.random() * sourceList.length)];

    data.push({
      id: crypto.randomUUID(),
      date,
      amount,
      category,
      type,
      description
    });
  }

  // Sort by date descending
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const initialTransactions = generateMockData(60);
