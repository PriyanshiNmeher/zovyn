import React from 'react';
import { useStore } from '../../store/useStore';
import { LayoutDashboard, Moon, Sun, Download, Search, Bell, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardLayout = ({ children }) => {
  const { role, setRole, isDarkMode, toggleDarkMode, transactions } = useStore();

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ['Date,Description,Category,Type,Amount'].join('\n') + '\n' +
      transactions.map(t => `${t.date},${t.description},${t.category},${t.type},${t.amount}`).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen bg-background text-foreground flex ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar - Desktop Only */}
      <aside className="w-64 border-r border-border hidden md:flex flex-col h-screen sticky top-0 bg-card">
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="bg-primary p-2 rounded-lg text-primary-foreground">
             <LayoutDashboard size={20} />
          </div>
          <h1 className="text-xl font-bold">FinTrack</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           <a href="#" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium transition-colors">
             <LayoutDashboard size={18} /> Dashboard
           </a>
           {/* Placeholder Links */}
           <a href="#" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary rounded-lg font-medium transition-colors">
             <Search size={18} /> Transactions
           </a>
           <a href="#" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary rounded-lg font-medium transition-colors">
             <Bell size={18} /> Notifications
           </a>
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-secondary rounded-lg font-medium transition-colors">
            <Settings size={18} /> Settings
          </a>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold hidden sm:block">Overview</h2>
          </div>
          
          <div className="flex items-center gap-4">
            
            {/* Export Action */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportCSV}
              className="text-sm font-medium flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Download size={16} /> Export CSV
            </motion.button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Role Switcher */}
            <div className="flex items-center gap-2 pl-4 border-l border-border">
              <User size={20} className="text-muted-foreground" />
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="bg-transparent border-none text-sm font-medium focus:ring-0 outline-none cursor-pointer"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

          </div>
        </header>
        
        {/* Main Scrolling Container */}
        <main className="flex-1 p-6 overflow-x-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto space-y-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
