
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Circle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Circle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mentes Kriativas</h1>
              <p className="text-sm text-muted-foreground">Dashboard de Inovação</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex gap-2">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className={activeTab === 'dashboard' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'consulta' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('consulta')}
                className={activeTab === 'consulta' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                Consulta Funcionário
              </Button>
            </nav>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="ml-4"
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
