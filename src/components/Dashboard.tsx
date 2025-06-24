
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, CheckCircle, Circle, Info, Target, TrendingUp, Users, Lightbulb } from 'lucide-react';

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

  // Dados para gráfico semanal (últimas 8 semanas)
  const dadosGraficoSemanal = ideiasPorSemana.slice(-8).map(item => ({
    semana: item.semana,
    Meta: META_SEMANAL,
    Submissões: item.quantidade_ideias,
    Percentual: Math.round((item.quantidade_ideias / META_SEMANAL) * 100)
  }));

  return (
    <div className="space-y-8">
      {/* Métricas principais */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Meta Anual 2025</CardTitle>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">{totalIdeiasAnual}/{META_ANUAL}</div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              {percentualAnual}% da meta atingida
            </p>
            <Progress value={percentualAnual} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Meta Mensal - {mesAtual.mes}</CardTitle>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-200">{totalIdeiasDoMesAtual}/{META_MENSAL}</div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {percentualMesAtual}% da meta mensal atingida
            </p>
            <Progress value={percentualMesAtual} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Semana Atual - {semanaAtual.semana}</CardTitle>
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">{totalIdeiasSemanAtual}/{META_SEMANAL}</div>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
              {percentualSemanaAtual}% da meta semanal atingida
            </p>
            <Progress value={percentualSemanaAtual} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Semana Anterior - {semanaAnterior?.semana || 'N/A'}</CardTitle>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">{totalIdeiasSemanAnterior}/{META_SEMANAL}</div>
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
              {percentualSemanaAnterior}% da meta semanal atingida
            </p>
            <Progress value={percentualSemanaAnterior} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Métricas de colaboradores */}
      <div className="grid gap-6 md:grid-cols-1">
        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Colaboradores Meta Anual</CardTitle>
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-800 dark:text-indigo-200">{colaboradoresMetaAtingida}/{totalColaboradores}</div>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
              {percentualColaboradores}% atingiram a meta de {META_POR_COLABORADOR} ideias
            </p>
            <Progress value={percentualColaboradores} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Submissões vs Meta Mensal</CardTitle>
                <CardDescription>
                  Comparativo entre ideias submetidas e metas mensais
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dadosGraficoMensal} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="mes" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'Meta' ? 'Meta' : 'Submissões']}
                  labelFormatter={(label) => `Mês: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="Meta" fill="#93c5fd" name="Meta" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Submissões" fill="#3b82f6" name="Submissões" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Evolução Semanal</CardTitle>
                <CardDescription>
                  Submissões vs Meta Semanal (últimas 8 semanas)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dadosGraficoSemanal} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="semana" fontSize={10} angle={-45} textAnchor="end" height={60} />
                <YAxis fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'Meta' ? 'Meta' : 'Submissões']}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="Meta" fill="#86efac" name="Meta" radius={[2, 2, 0, 0]} />
                <Bar dataKey="Submissões" fill="#16a34a" name="Submissões" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumo do desempenho */}
      <Card className="shadow-lg bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resumo do Programa Mentes Kriativas
              </CardTitle>
              <CardDescription className="text-base">
                Visão geral do programa de inovação do setor de engenharia
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{totalIdeiasAnual}</div>
              <p className="text-sm text-muted-foreground">Total de Ideias 2025</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{totalIdeiasDoMesAtual}</div>
              <p className="text-sm text-muted-foreground">Ideias do Mês Atual</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{totalIdeiasSemanAtual}</div>
              <p className="text-sm text-muted-foreground">Ideias da Semana Atual</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-indigo-600 mb-1">{totalColaboradores}</div>
              <p className="text-sm text-muted-foreground">Colaboradores Ativos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
