
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, CheckCircle, Circle, Info, Target, TrendingUp, Users, Lightbulb } from 'lucide-react';
import mentesData from '@/data/mentesKriativasData.json';

const Dashboard = () => {
  // Calcular dados baseados na nova estrutura
  const totalIdeiasAnual = mentesData.anual[0]["Ideias enviadas"];
  const metaAnual = mentesData.anual[0]["Meta"];
  const percentualAnual = Math.round((totalIdeiasAnual / metaAnual) * 100);

  // Total de funcionários e funcionários com metas
  const totalFuncionarios = mentesData.src.length;
  const metaAtual = mentesData.atual[0]["Meta atual"];
  const metaAnualFuncionario = 14; // Meta anual padrão
  
  const funcionariosMetaAtual = mentesData.src.filter(f => f.total >= metaAtual).length;
  const funcionariosMetaAnual = mentesData.src.filter(f => f.total >= metaAnualFuncionario).length;
  
  const percentualMetaAtual = Math.round((funcionariosMetaAtual / totalFuncionarios) * 100);
  const percentualMetaAnualFunc = Math.round((funcionariosMetaAnual / totalFuncionarios) * 100);

  const totalDeIdeiasNoMesAtual = mentesData.kpi[5]["Ideias Enviadas"]
  
  // Dados para o gráfico mensal
  const dadosGraficoMensal = mentesData.kpi.map(item => ({
    mes: item.Mês.substring(0, 3),
    Meta: item.Meta,
    Submissões: item["Ideias enviadas"],
    Percentual: Math.round((item["Ideias enviadas"] / item.Meta) * 100)
  }));

  return (
    <div className="space-y-8">
      {/* Métricas principais com design moderno */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Meta Anual 2025</CardTitle>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Target className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">{totalIdeiasAnual}/{metaAnual}</div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              {percentualAnual}% da meta atingida
            </p>
            <Progress value={percentualAnual} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Funcionários Meta Atual</CardTitle>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-200">{funcionariosMetaAtual}/{totalFuncionarios}</div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              {percentualMetaAtual}% atingiram a meta atual ({metaAtual} ideias)
            </p>
            <Progress value={percentualMetaAtual} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Funcionários Meta Anual</CardTitle>
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">{funcionariosMetaAnual}/{totalFuncionarios}</div>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
              {percentualMetaAnualFunc}% atingiram a meta anual
            </p>
            <Progress value={percentualMetaAnualFunc} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Total de ideias enviadas no mês de Junho</CardTitle>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">{totalDeIdeiasNoMesAtual}</div>
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
              Funcionários cadastrados
            </p>
            <Progress value={100} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Gráficos modernos */}
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
                <CardTitle className="text-lg">Percentual de Atingimento</CardTitle>
                <CardDescription>
                  Evolução do percentual de atingimento das metas mensais
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={dadosGraficoMensal} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="mes" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentual']}
                  labelFormatter={(label) => `Mês: ${label}`}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Percentual" 
                  stroke="#16a34a" 
                  strokeWidth={3}
                  dot={{ fill: '#16a34a', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, fill: '#16a34a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumo do desempenho modernizado */}
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
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{totalIdeiasAnual}</div>
              <p className="text-sm text-muted-foreground">Ideias Submetidas em 2025</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{totalFuncionarios}</div>
              <p className="text-sm text-muted-foreground">Funcionários Participantes</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{percentualAnual}%</div>
              <p className="text-sm text-muted-foreground">Meta Anual Atingida</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
