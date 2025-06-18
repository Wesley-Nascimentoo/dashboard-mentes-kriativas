
import React, { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import ConsultaFuncionario from '@/components/ConsultaFuncionario';
import Implementacoes from '@/components/Implementacoes';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'consulta' && <ConsultaFuncionario />}
        {activeTab === 'implementacoes' && <Implementacoes />}
      </main>

      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Programa Mentes Kriativas - Setor de Engenharia</p>
            <p className="mt-1">Dashboard de acompanhamento de submissões de ideias</p>
            <p className="mt-1">Desenvolvido por Wesley S. do Nascimento</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
