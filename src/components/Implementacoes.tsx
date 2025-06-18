
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock, XCircle, AlertCircle, TrendingUp, BarChart3 } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Implementações de Ideias
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe o status e evolução das ideias implementadas
          </p>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ideias</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIdeias}</div>
            <p className="text-xs text-muted-foreground">Avaliadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implantadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{implantadas}</div>
            <p className="text-xs text-muted-foreground">
              {((implantadas / totalIdeias) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{emAndamento}</div>
            <p className="text-xs text-muted-foreground">Em desenvolvimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{emAnalise}</div>
            <p className="text-xs text-muted-foreground">Aguardando avaliação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reprovadas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{reprovadas}</div>
            <p className="text-xs text-muted-foreground">Não viáveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{implementadasSemanaAtual}</div>
            <p className="text-xs text-muted-foreground">Implementadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução Semanal - Gráfico de Linha */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Evolução Semanal - Linha
            </CardTitle>
            <CardDescription>
              Tendência das implementações por semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={evolucaoSemanal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="semana" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis fontSize={14} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="implementadas" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: "#22c55e", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Evolução Semanal - Gráfico de Barras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Evolução Semanal - Barras
            </CardTitle>
            <CardDescription>
              Quantidade de implementações por semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={evolucaoSemanal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="semana" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis fontSize={14} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="implementadas" 
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  >
                    {/* Labels nas barras */}
                    {evolucaoSemanal.map((entry, index) => (
                      <text
                        key={index}
                        x={index * (100 / evolucaoSemanal.length) + (100 / evolucaoSemanal.length) / 2 + '%'}
                        y={350 - (entry.implementadas / Math.max(...evolucaoSemanal.map(d => d.implementadas))) * 300 - 10}
                        textAnchor="middle"
                        fontSize={14}
                        fontWeight="bold"
                        fill="#22c55e"
                      >
                        {entry.implementadas}
                      </text>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Status das Ideias - Gráfico de Pizza */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Status</CardTitle>
            <CardDescription>
              Proporção das ideias por status atual
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Implementações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Implementações Recentes</CardTitle>
          <CardDescription>
            Últimas 10 ideias implementadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ideiasImplementadas
              .slice(-10)
              .reverse()
              .map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">ID #{item['N° ID']}</p>
                    <p className="text-sm text-muted-foreground">{item['IDEIA ']}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {item['DATA IMPLANTAÇÃO']}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      Implantada
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default Implementacoes;
