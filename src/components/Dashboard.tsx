
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, CheckCircle, Circle, Info, Target, TrendingUp, Users, Lightbulb, BarChart3, Database, Activity } from 'lucide-react';

// Importar os novos arquivos JSON
import ideiasTotal from '@/data/ideias_total.json';
import ideiasPorMes from '@/data/ideias_por_mes.json';
import ideiasPorSemana from '@/data/ideias_por_semana.json';
import ideiasPorElaborador from '@/data/ideias_por_elaborador.json';

const Dashboard = () => {
  // Metas predefinidas
  const META_ANUAL = 770;
  const META_MENSAL = 67;
  const META_SEMANAL = 15;
  const META_POR_COLABORADOR = 14;

  // Dados principais
  const totalIdeiasAnual = ideiasTotal[0].quantidade_total_ideias;
  const percentualAnual = Math.round((totalIdeiasAnual / META_ANUAL) * 100);

  // Mês atual (último mês no array)
  const mesAtual = ideiasPorMes[ideiasPorMes.length - 1];
  const totalIdeiasDoMesAtual = mesAtual.quantidade_ideias;
  const percentualMesAtual = Math.round((totalIdeiasDoMesAtual / META_MENSAL) * 100);

  // Semana atual (última semana no array)
  const semanaAtual = ideiasPorSemana[ideiasPorSemana.length - 1];
  const totalIdeiasSemanAtual = semanaAtual.quantidade_ideias;
  const percentualSemanaAtual = Math.round((totalIdeiasSemanAtual / META_SEMANAL) * 100);

  // Semana anterior (penúltima semana no array)
  const semanaAnterior = ideiasPorSemana[ideiasPorSemana.length - 2];
  const totalIdeiasSemanAnterior = semanaAnterior ? semanaAnterior.quantidade_ideias : 0;
  const percentualSemanaAnterior = Math.round((totalIdeiasSemanAnterior / META_SEMANAL) * 100);

  // Dados dos colaboradores
  const totalColaboradores = ideiasPorElaborador.length;
  const colaboradoresMetaAtingida = ideiasPorElaborador.filter(c => c.quantidade_ideias >= META_POR_COLABORADOR).length;
  const percentualColaboradores = Math.round((colaboradoresMetaAtingida / totalColaboradores) * 100);

  // Dados para gráfico mensal
  const dadosGraficoMensal = ideiasPorMes.map(item => ({
    mes: item.mes.substring(0, 3),
    Meta: META_MENSAL,
    Submissões: item.quantidade_ideias,
    Percentual: Math.round((item.quantidade_ideias / META_MENSAL) * 100)
  }));

  // Dados para gráfico de evolução mensal com pontos
  const dadosEvolucaoMensal = ideiasPorMes.map(item => ({
    mes: item.mes.substring(0, 3),
    ideias: item.quantidade_ideias
  }));

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen p-6">
      {/* Header Analytics */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Database className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Dashboard de envio de ideias
            </h1>
            <p className="text-slate-300 text-lg">Análise Avançada e Rastreamento de Submissão de ideias</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-5 w-5 text-cyan-300" />
              <span className="text-sm font-medium text-slate-200">Total de Ideias</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalIdeiasAnual}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-300" />
              <span className="text-sm font-medium text-slate-200">Mês Atual</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalIdeiasDoMesAtual}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-purple-300" />
              <span className="text-sm font-medium text-slate-200">Semana Atual</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalIdeiasSemanAtual}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-orange-300" />
              <span className="text-sm font-medium text-slate-200">Colaboradores</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalColaboradores}</div>
          </div>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-xl backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">Meta Anual 2025</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              {totalIdeiasAnual}/{META_ANUAL}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              {percentualAnual}% da meta atingida
            </p>
            <Progress value={percentualAnual} className="h-3 bg-slate-200 dark:bg-slate-700" />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900 dark:to-green-900 shadow-xl backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Meta Mensal - {mesAtual.mes}</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-2">
              {totalIdeiasDoMesAtual}/{META_MENSAL}
            </div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-3">
              {percentualMesAtual}% da meta mensal atingida
            </p>
            <Progress value={percentualMesAtual} className="h-3 bg-emerald-200 dark:bg-emerald-800" />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900 dark:to-violet-900 shadow-xl backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">Semana Atual - {semanaAtual.semana}</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent mb-2">
              {totalIdeiasSemanAtual}/{META_SEMANAL}
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">
              {percentualSemanaAtual}% da meta semanal atingida
            </p>
            <Progress value={percentualSemanaAtual} className="h-3 bg-purple-200 dark:bg-purple-800" />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-900 shadow-xl backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-amber-700 dark:text-amber-300">Semana Anterior - {semanaAnterior?.semana || 'N/A'}</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent mb-2">
              {totalIdeiasSemanAnterior}/{META_SEMANAL}
            </div>
            <p className="text-sm text-amber-600 dark:text-amber-400 mb-3">
              {percentualSemanaAnterior}% da meta semanal atingida
            </p>
            <Progress value={percentualSemanaAnterior} className="h-3 bg-amber-200 dark:bg-amber-800" />
          </CardContent>
        </Card>
      </div>

      {/* Métricas de colaboradores */}
      <div className="grid gap-6 md:grid-cols-1">
        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900 dark:to-blue-900 shadow-xl backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Performance de Colaboradores</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent mb-2">
              {colaboradoresMetaAtingida}/{totalColaboradores}
            </div>
            <p className="text-sm text-cyan-600 dark:text-cyan-400 mb-3">
              {percentualColaboradores}% atingiram a meta de {META_POR_COLABORADOR} ideias
            </p>
            <Progress value={percentualColaboradores} className="h-3 bg-cyan-200 dark:bg-cyan-800" />
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <CardHeader className="border-b bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Análise Mensal Comparativa</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Performance vs. Metas Estabelecidas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dadosGraficoMensal} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                <XAxis dataKey="mes" fontSize={12} className="text-slate-600" />
                <YAxis fontSize={12} className="text-slate-600" />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'Meta' ? 'Meta' : 'Submissões']}
                  labelFormatter={(label) => `Mês: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="Meta" fill="url(#metaGradient)" name="Meta" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Submissões" fill="url(#submissoesGradient)" name="Submissões" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="metaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e0e7ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#c7d2fe" stopOpacity={0.6}/>
                  </linearGradient>
                  <linearGradient id="submissoesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <CardHeader className="border-b bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900 dark:to-green-900 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Tendência de Inovação</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Evolução temporal das submissões
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={dadosEvolucaoMensal} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                <XAxis dataKey="mes" fontSize={12} className="text-slate-600" />
                <YAxis fontSize={12} className="text-slate-600" />
                <Tooltip 
                  formatter={(value) => [value, 'Ideias Submetidas']}
                  labelFormatter={(label) => `Mês: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ideias" 
                  stroke="url(#lineGradient)" 
                  strokeWidth={4}
                  dot={{ fill: '#10b981', strokeWidth: 3, r: 8, className: 'drop-shadow-lg' }}
                  activeDot={{ r: 10, stroke: '#059669', strokeWidth: 3, className: 'drop-shadow-xl' }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumo executivo */}
      <Card className="shadow-2xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Relatório de Inteligência de Inovação
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg mt-2">
                Sistema de Monitoramento Avançado - Programa Mentes Kriativas
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-300 mb-2">{totalIdeiasAnual}</div>
              <p className="text-sm text-slate-300 font-medium">Total de Ideias 2025</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-emerald-300 mb-2">{totalIdeiasDoMesAtual}</div>
              <p className="text-sm text-slate-300 font-medium">Performance Mensal</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Activity className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-300 mb-2">{totalIdeiasSemanAtual}</div>
              <p className="text-sm text-slate-300 font-medium">Atividade Semanal</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-cyan-300 mb-2">{totalColaboradores}</div>
              <p className="text-sm text-slate-300 font-medium">Colaboradores Ativos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
