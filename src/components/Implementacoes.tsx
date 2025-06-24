import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock, XCircle, AlertCircle, TrendingUp, Database, Activity, Target, Zap } from 'lucide-react';
import implementsData from '@/data/implementsData.json';

const Implementacoes = () => {
  // Dados fixos conforme solicitado
  const totalIdeias = 216;
  const implantadas = 147;
  const emAndamento = 20;
  const emAnalise = 19;
  const reprovadas = 30;
  const implementadasSemanaAtual = 12;

  // Dados para gráfico de pizza - Status das ideias
  const statusData = [
    { name: 'Implantadas', value: implantadas, color: '#22c55e' },
    { name: 'Reprovadas', value: reprovadas, color: '#ef4444' },
    { name: 'Em Andamento', value: emAndamento, color: '#f59e0b' },
    { name: 'Em Análise', value: emAnalise, color: '#3b82f6' },
  ];

  // Evolução semanal conforme solicitado
  const evolucaoSemanal = [
    { semana: 'De 06 até 09 de Maio', implementadas: 50 },
    { semana: 'De 02 até 06 de Junho', implementadas: 50 },
    { semana: 'De 09 até 13 de Junho', implementadas: 35 },
    { semana: 'De 16 até 18 de Junho', implementadas: 12 },
  ];

  const chartConfig = {
    implementadas: {
      label: "Implementadas",
      color: "#22c55e",
    },
  };

  // Obter ideias implementadas do JSON para a lista
  const ideias = implementsData.HISTORICO.filter(item => item !== null);
  const ideiasImplementadas = ideias.filter(item => item.STATUS === 'Implantada');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-violet-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="space-y-8">
        {/* Header Analytics */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-violet-900 rounded-2xl p-8 text-white shadow-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                Implementation Intelligence Hub
              </h1>
              <p className="text-slate-300 text-lg">Advanced Implementation Tracking & Analytics Platform</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Database className="h-5 w-5 text-purple-300" />
                <span className="text-sm font-medium text-slate-200">Total Ideas</span>
              </div>
              <div className="text-2xl font-bold text-white">{totalIdeias}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-sm font-medium text-slate-200">Implemented</span>
              </div>
              <div className="text-2xl font-bold text-white">{implantadas}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="h-5 w-5 text-amber-300" />
                <span className="text-sm font-medium text-slate-200">In Progress</span>
              </div>
              <div className="text-2xl font-bold text-white">{emAndamento}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-cyan-300" />
                <span className="text-sm font-medium text-slate-200">This Week</span>
              </div>
              <div className="text-2xl font-bold text-white">{implementadasSemanaAtual}</div>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">Total Ideas</CardTitle>
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent mb-2">
                {totalIdeias}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Under Evaluation</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Implemented</CardTitle>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
                {implantadas}
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">
                {((implantadas / totalIdeias) * 100).toFixed(1)}% success rate
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-900 shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-amber-700 dark:text-amber-300">In Progress</CardTitle>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent mb-2">
                {emAndamento}
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-400">Active Development</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Under Analysis</CardTitle>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
                {emAnalise}
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Pending Evaluation</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900 dark:to-rose-900 shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-red-700 dark:text-red-300">Rejected</CardTitle>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <XCircle className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-700 bg-clip-text text-transparent mb-2">
                {reprovadas}
              </div>
              <p className="text-sm text-red-600 dark:text-red-400">Not Viable</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900 dark:to-violet-900 shadow-xl backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">This Week</CardTitle>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-700 bg-clip-text text-transparent mb-2">
                {implementadasSemanaAtual}
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-400">Implemented</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Evolution */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
            <CardHeader className="border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-t-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Weekly Implementation Trend</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Implementation performance over time
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={evolucaoSemanal}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                    <XAxis 
                      dataKey="semana" 
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      className="text-slate-600"
                    />
                    <YAxis fontSize={14} className="text-slate-600" />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="implementadas" 
                      stroke="url(#implementGradient)" 
                      strokeWidth={4}
                      dot={{ fill: "#22c55e", strokeWidth: 3, r: 8, className: 'drop-shadow-lg' }}
                      activeDot={{ r: 10, stroke: "#16a34a", strokeWidth: 3, className: 'drop-shadow-xl' }}
                    />
                    <defs>
                      <linearGradient id="implementGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={1}/>
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900 dark:to-violet-900 rounded-t-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Status Distribution Analysis</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Current idea distribution by status
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent, value }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      fontSize={12}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Implementations */}
        <Card className="shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <CardHeader className="border-b bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">Recent Implementation Activity</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Latest 10 successfully implemented ideas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {ideiasImplementadas
                .slice(-10)
                .reverse()
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 hover:shadow-lg transition-all duration-300">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                          <span className="text-white text-xs font-bold">#{item['N° ID']}</span>
                        </div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">Idea #{item['N° ID']}</p>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 ml-11">{item['IDEIA ']}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg font-medium">
                        {item['DATA IMPLANTAÇÃO']}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md">
                        Implemented
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Report */}
        <Card className="shadow-2xl bg-gradient-to-r from-slate-900 via-purple-900 to-violet-900 text-white border-0">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                  Implementation Intelligence Summary
                </CardTitle>
                <CardDescription className="text-slate-300 text-lg mt-2">
                  Advanced Analytics Report - Innovation Implementation Platform
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-300 mb-2">{implantadas}</div>
                <p className="text-sm text-slate-300 font-medium">Successfully Implemented</p>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-amber-300 mb-2">{emAndamento}</div>
                <p className="text-sm text-slate-300 font-medium">Active Development</p>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <AlertCircle className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-300 mb-2">{emAnalise}</div>
                <p className="text-sm text-slate-300 font-medium">Under Analysis</p>
              </div>
              <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-300 mb-2">{implementadasSemanaAtual}</div>
                <p className="text-sm text-slate-300 font-medium">Weekly Performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Implementacoes;
