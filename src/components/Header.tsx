
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Lightbulb, BarChart3, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Lightbulb className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mentes Kriativas
              </h1>
              <p className="text-sm text-muted-foreground">Dashboard de Inovação</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex gap-2">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  activeTab === 'dashboard' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md' 
                    : 'hover:bg-blue-50 dark:hover:bg-blue-950'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'consulta' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('consulta')}
                className={`flex items-center gap-2 transition-all duration-200 ${
                  activeTab === 'consulta' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md' 
                    : 'hover:bg-blue-50 dark:hover:bg-blue-950'
                }`}
              >
                <Search className="h-4 w-4" />
                Consulta Funcionário
              </Button>
            </nav>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="ml-4 w-10 h-10 p-0 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
