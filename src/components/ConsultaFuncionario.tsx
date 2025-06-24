
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Calendar, Info, User, Building2, Search, Database, Activity, Target } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import mentesData from '@/data/mentesKriativasData.json';

const ConsultaFuncionario = () => {
  const [matriculaFuncionario, setMatriculaFuncionario] = useState('');
  const [funcionarioEncontrado, setFuncionarioEncontrado] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  const buscarFuncionario = async () => {
    if (!matriculaFuncionario.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite a matrícula do funcionário.",
        variant: "destructive"
      });
      return;
    }

    setCarregando(true);
    
    // Simular consulta à API
    setTimeout(() => {
      const funcionario = mentesData.src.find(
        f => f.Matricula.toString() === matriculaFuncionario
      );

      if (funcionario) {
        // Calcular dados baseados na nova estrutura
        const metaAtual = mentesData.atual[0]["Meta atual"];
        const dataLimite = mentesData.atual[0]["Data limite"];
        const metaAnual = 14;
        const ideiasSubmitidas = funcionario.total;
        
        const funcionarioCompleto = {
          id: funcionario.Matricula.toString(),
          nome: funcionario.Nome,
          departamento: funcionario["Descrição Seção"],
          ideiasSubmitidas: ideiasSubmitidas,
          metaAtual: metaAtual,
          metaAnual: metaAnual,
          dataLimite: dataLimite,
          atingiuMetaAtual: ideiasSubmitidas >= metaAtual,
          atingiuMetaAnual: ideiasSubmitidas >= metaAnual,
          percentualAnual: Math.round((ideiasSubmitidas / metaAnual) * 100),
          ultimaSubmissao: "2024-03-15" // Data fictícia para exemplo
        };
        
        setFuncionarioEncontrado(funcionarioCompleto);
        toast({
          title: "Sucesso",
          description: "Funcionário encontrado!",
        });
      } else {
        setFuncionarioEncontrado(null);
        toast({
          title: "Não encontrado",
          description: "Funcionário não encontrado no sistema.",
          variant: "destructive"
        });
      }
      setCarregando(false);
    }, 1000);
  };

  const limparConsulta = () => {
    setMatriculaFuncionario('');
    setFuncionarioEncontrado(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="space-y-8">
        {/* Header Analytics */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-900 to-green-900 rounded-2xl p-8 text-white shadow-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                Plataforma de Análise de Funcionários
              </h1>
              <p className="text-slate-300 text-lg">Sistema Avançado de Inteligência de Performance</p>
            </div>
          </div>
        </div>

        {/* Search Interface */}
        <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900 dark:to-green-900 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Análise de Performance de Funcionários</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Digite a matrícula do funcionário para acessar métricas detalhadas de performance
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="matricula" className="text-sm font-semibold mb-3 block text-slate-700 dark:text-slate-300">
                  Matrícula do Funcionário
                </label>
                <Input
                  id="matricula"
                  placeholder="Digite a matrícula (ex: 500360, 501075...)"
                  value={matriculaFuncionario}
                  onChange={(e) => setMatriculaFuncionario(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && buscarFuncionario()}
                  className="h-12 text-lg border-2 border-emerald-200 focus:border-emerald-500 rounded-xl"
                />
              </div>
              <Button 
                onClick={buscarFuncionario} 
                disabled={carregando}
                className="h-12 px-8 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 rounded-xl font-semibold shadow-lg"
              >
                {carregando ? (
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 animate-spin" />
                    Analisando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Analisar
                  </div>
                )}
              </Button>
              {funcionarioEncontrado && (
                <Button variant="outline" onClick={limparConsulta} className="h-12 px-6 rounded-xl border-2">
                  Nova Consulta
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {funcionarioEncontrado && (
          <div className="space-y-6">
            {/* Employee Profile */}
            <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900 dark:to-green-900">
              <CardHeader className="border-b bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-800 dark:to-green-800 rounded-t-lg">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent">
                      {funcionarioEncontrado.nome}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-lg text-emerald-600 dark:text-emerald-400">
                      <Building2 className="h-5 w-5" />
                      {funcionarioEncontrado.departamento}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid gap-6 md:grid-cols-4">
                  <div className="text-center p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Info className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Matrícula</p>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                      {funcionarioEncontrado.id}
                    </div>
                  </div>
                  <div className="text-center p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Total de Ideias</p>
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                      {funcionarioEncontrado.ideiasSubmitidas}
                    </div>
                  </div>
                  <div className="text-center p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Progresso Anual</p>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent">
                      {funcionarioEncontrado.percentualAnual}%
                    </div>
                  </div>
                  <div className="text-center p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Status</p>
                    <Badge className={`text-sm px-4 py-2 rounded-xl font-semibold ${
                      funcionarioEncontrado.atingiuMetaAnual 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                        : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                    }`}>
                      {funcionarioEncontrado.atingiuMetaAnual ? 'Meta Atingida' : 'Em Progresso'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className={`shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-gradient-to-br ${funcionarioEncontrado.atingiuMetaAtual ? 'from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900' : 'from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-900'}`}>
                <CardHeader className="border-b bg-white/50 dark:bg-slate-800/50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    {funcionarioEncontrado.atingiuMetaAtual ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-amber-600" />
                    )}
                    Performance da Meta Atual
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Status do Progresso</span>
                      <Badge className={`px-4 py-2 rounded-xl font-semibold ${
                        funcionarioEncontrado.atingiuMetaAtual 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                          : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                      }`}>
                        {funcionarioEncontrado.atingiuMetaAtual ? 'Meta Atingida' : 'Em Progresso'}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      {funcionarioEncontrado.ideiasSubmitidas}/{funcionarioEncontrado.metaAtual}
                    </div>
                    <Progress 
                      value={Math.min((funcionarioEncontrado.ideiasSubmitidas / funcionarioEncontrado.metaAtual) * 100, 100)} 
                      className="h-4 bg-slate-200 dark:bg-slate-700"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className={`shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-gradient-to-br ${funcionarioEncontrado.atingiuMetaAnual ? 'from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900' : 'from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900'}`}>
                <CardHeader className="border-b bg-white/50 dark:bg-slate-800/50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    {funcionarioEncontrado.atingiuMetaAnual ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-blue-600" />
                    )}
                    Performance da Meta Anual
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Progresso Anual</span>
                      <Badge className={`px-4 py-2 rounded-xl font-semibold ${
                        funcionarioEncontrado.atingiuMetaAnual 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                      }`}>
                        {funcionarioEncontrado.percentualAnual}%
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                      {funcionarioEncontrado.ideiasSubmitidas}/{funcionarioEncontrado.metaAnual}
                    </div>
                    <Progress 
                      value={funcionarioEncontrado.percentualAnual} 
                      className="h-4 bg-slate-200 dark:bg-slate-700"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Success Message */}
            <Card className="shadow-2xl bg-gradient-to-r from-slate-900 via-emerald-900 to-green-900 text-white border-0">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-xl">
                    {funcionarioEncontrado.atingiuMetaAnual ? (
                      <CheckCircle className="h-8 w-8 text-white" />
                    ) : (
                      <Activity className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                      {funcionarioEncontrado.atingiuMetaAnual ? '🎉 Performance Excepcional!' : '💡 Jornada de Inovação Continua!'}
                    </CardTitle>
                    <CardDescription className="text-slate-300 text-lg mt-2">
                      Relatório Avançado de Inteligência de Performance
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
                  <p className="text-emerald-200 text-lg leading-relaxed">
                    {funcionarioEncontrado.atingiuMetaAnual 
                      ? 'Parabéns! Você superou sua meta anual de inovação. Sua contribuição para o programa Mentes Kriativas demonstra criatividade excepcional e compromisso com a melhoria contínua.'
                      : funcionarioEncontrado.atingiuMetaAtual
                        ? 'Excelente progresso! Você atingiu sua meta atual. Continue sua jornada de inovação para alcançar o objetivo anual e contribuir para a excelência organizacional.'
                        : 'Sua jornada de inovação está gerando impacto valioso. Cada ideia submetida contribui para a inteligência coletiva de nossa organização. Continue inovando e explorando novas possibilidades!'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instructions */}
        {!funcionarioEncontrado && (
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
            <CardHeader className="border-b bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                <Info className="h-6 w-6 text-blue-600" />
                Como Usar a Plataforma de Análise
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-xl">
                  <Search className="h-5 w-5 text-blue-600" />
                  <p className="font-medium">Digite sua matrícula no campo de busca acima</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950 rounded-xl">
                  <Activity className="h-5 w-5 text-emerald-600" />
                  <p className="font-medium">Clique em "Analisar" para acessar suas métricas de performance e progresso das metas</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-950 rounded-xl">
                  <Database className="h-5 w-5 text-purple-600" />
                  <p className="font-medium">Matrículas de exemplo para teste: 500360, 501075, 501211, 502559</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950 rounded-xl">
                  <Building2 className="h-5 w-5 text-amber-600" />
                  <p className="font-medium">Para suporte técnico ou dúvidas, entre em contato com Recursos Humanos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConsultaFuncionario;
