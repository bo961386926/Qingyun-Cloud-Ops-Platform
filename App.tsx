
import React, { useState } from 'react';
import { ViewState, Language } from './types';
import { NAV_ITEMS, MOCK_ALERTS } from './constants';
import Dashboard from './components/Dashboard';
import TenantList from './components/TenantList';
import ResourceMonitor from './components/ResourceMonitor';
import BillingCenter from './components/BillingCenter';
import AlgorithmCenter from './components/AlgorithmCenter';
import ProductCenter from './components/ProductCenter';
import AIAssistant from './components/AIAssistant';
import { Bell, Search, Menu, ChevronDown, User, Moon, Sun, Globe } from 'lucide-react';
import { LanguageProvider, ThemeProvider, useTranslation, useTheme } from './contexts';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { t, language, setLanguage } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Determine which component to render
  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD: return <Dashboard />;
      case ViewState.TENANTS: return <TenantList />;
      case ViewState.RESOURCES: return <ResourceMonitor />;
      case ViewState.ALGORITHMS: return <AlgorithmCenter />;
      case ViewState.PRODUCT_CENTER: return <ProductCenter />;
      case ViewState.BILLING: return <BillingCenter />;
      default: return <Dashboard />;
    }
  };

  const criticalAlertsCount = MOCK_ALERTS.filter(a => a.type === 'CRITICAL').length;

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'zh-CN', label: '简体中文' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'si', label: 'සිංහල' },
    { code: 'ta', label: 'தமிழ்' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200 relative">
      
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 dark:bg-black text-white transition-all duration-300 flex flex-col shadow-xl z-20`}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-800 dark:border-slate-800 bg-slate-950 dark:bg-black">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex-shrink-0 flex items-center justify-center font-bold text-white">Q</div>
          {sidebarOpen && <span className="ml-3 font-semibold text-lg tracking-tight whitespace-nowrap overflow-hidden">{t('app.title')}</span>}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                {sidebarOpen && <span className="ml-3 font-medium text-sm whitespace-nowrap overflow-hidden">{t(item.label)}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 dark:border-slate-800">
           <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center justify-center w-full p-2 rounded-lg bg-slate-800 dark:bg-slate-900 text-slate-400 hover:text-white transition-colors"
           >
              <Menu className="w-5 h-5" />
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shadow-sm z-10 transition-colors duration-200">
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
             <span className="hidden md:inline">Operations</span>
             <span className="mx-2 hidden md:inline">/</span>
             <span className="font-semibold text-slate-800 dark:text-slate-200">
               {NAV_ITEMS.find(n => n.id === currentView) ? t(NAV_ITEMS.find(n => n.id === currentView)!.label) : ''}
             </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="hidden md:flex relative mr-2">
                <input 
                    type="text" 
                    placeholder={t('header.search')} 
                    className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-0 rounded-full text-sm w-64 transition-all text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            </div>

             {/* Theme Toggle */}
             <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-full transition-colors"
                title="Change Language"
              >
                <Globe className="w-5 h-5" />
              </button>
              
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 z-20 py-1 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          language === lang.code 
                            ? 'bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-blue-400' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              {criticalAlertsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center pl-4 border-l border-slate-200 dark:border-slate-700 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <User className="w-5 h-5" />
              </div>
              <div className="ml-3 hidden md:block">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Admin</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('header.role')}</p>
              </div>
              <ChevronDown className="w-4 h-4 ml-2 text-slate-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainLayout />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
