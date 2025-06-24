
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Lightbulb, BarChart3, Search, CheckCircle, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Mentes Kriativas
              </h1>
              <p className="text-slate-300 text-lg font-medium">Plataforma Avançada de Inteligência e Inovação</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex gap-3">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  activeTab === 'dashboard' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg text-white border border-cyan-400/30' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20 backdrop-blur-sm'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                Dashboard de Inteligência
              </Button>
              <Button
                variant={activeTab === 'consulta' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('consulta')}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  activeTab === 'consulta' 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg text-white border border-emerald-400/30' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20 backdrop-blur-sm'
                }`}
              >
                <Search className="h-5 w-5" />
                Análise de Funcionários
              </Button>
              <Button
                variant={activeTab === 'implementacoes' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('implementacoes')}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  activeTab === 'implementacoes' 
                    ? 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg text-white border border-purple-400/30' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20 backdrop-blur-sm'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
                Central de Implementações
              </Button>
            </nav>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="ml-6 w-12 h-12 p-0 rounded-full bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 backdrop-blur-md transition-all duration-300 text-white hover:text-white"
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
