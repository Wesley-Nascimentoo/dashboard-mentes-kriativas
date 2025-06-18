
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import implementsData from '@/data/implementsData.json';

const Implementacoes = () => {
  // Processar dados para métricas
  const ideias = implementsData.HISTORICO.filter(item => item !== null);
  
  const totalIdeias = ideias.length;
  const implantadas = ideias.filter(item => item.STATUS === 'Implantada').length;
  const reprovadas = ideias.filter(item => item.STATUS === 'Reprovada').length;
  const emAndamento = ideias.filter(item => item.STATUS === 'Andamento').length;
  const emAnalise = ideias.filter(item => item.STATUS === 'Análise').length;

  // Dados para gráfico de pizza - Status das ideias
  const statusData = [
    { name: 'Implantadas', value: implantadas, color: '#22c55e' },
    { name: 'Em Análise', value: emAnalise, color: '#3b82f6' },
    { name: 'Em Andamento', value: emAndamento, color: '#f59e0b' },
    { name: 'Reprovadas', value: reprovadas, color: '#ef4444' },
  ];

  // Processar dados para evolução semanal das implementações baseado na DATA IMPLANTAÇÃO
  const evolucaoSemanal = React.useMemo(() => {
    const implementadasPorData = ideias
      .filter(item => item.STATUS === 'Implantada' && item['DATA IMPLANTAÇÃO'])
      .map(item => {
        const dataStr = item['DATA IMPLANTAÇÃO'];
        if (dataStr && dataStr.includes('/')) {
          const [day, month, year] = dataStr.split('/');
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
        return null;
      })
      .filter(date => date !== null)
      .sort((a, b) => a.getTime() - b.getTime());

    // Agrupar por semana
    const semanas = {};
    implementadasPorData.forEach(date => {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = `${weekStart.getDate().toString().padStart(2, '0')}/${(weekStart.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!semanas[weekKey]) {
        semanas[weekKey] = 0;
      }
      semanas[weekKey]++;
    });

    return Object.entries(semanas)
      .map(([semana, count]) => ({ 
        semana, 
        implementadas: count,
        label: `${count} implementadas`
      }))
      .slice(-16); // Últimas 16 semanas para melhor visualização
  }, [ideias]);

  // Dados semanais detalhados para o gráfico de barras
  const implementacoesPorSemana = React.useMemo(() => {
    const semanas = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12'];
    const dadosSemanais = {};

    ideias.forEach(item => {
      if (item.STATUS === 'Implantada' && item['DATA IMPLANTAÇÃO']) {
        const dataStr = item['DATA IMPLANTAÇÃO'];
        if (dataStr.includes('/')) {
          const [day, month] = dataStr.split('/');
          const weekOfMonth = Math.ceil(parseInt(day) / 7);
          const monthIndex = parseInt(month) - 1;
          const weekKey = `Sem ${weekOfMonth + (monthIndex * 4)}`;
          
          if (!dadosSemanais[weekKey]) {
            dadosSemanais[weekKey] = 0;
          }
          dadosSemanais[weekKey]++;
        }
      }
    });

    return semanas.map(semana => ({
      semana,
      implementadas: dadosSemanais[semana] || 0
    })).filter(item => item.implementadas > 0).slice(-8); // Últimas 8 semanas com dados
  }, [ideias]);

  const chartConfig = {
    implementadas: {
      label: "Implementadas",
      color: "#22c55e",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Implementações de Ideias
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe o status e evolução das ideias implementadas por semana
          </p>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
            <p className="text-xs text-muted-foreground">
              22 analisadas esta semana
            </p>
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
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução Semanal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Evolução Semanal - Implementações
            </CardTitle>
            <CardDescription>
              Ideias implementadas por semana (7 implementadas na segunda)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={evolucaoSemanal}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="semana" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 14, fontWeight: 'bold' }}
                    domain={[0, 'dataMax + 1']}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    labelStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                    contentStyle={{ fontSize: '16px', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="implementadas" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: "#22c55e", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

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
                    label={({ name, value, percent }) => 
                      `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    fontSize={14}
                    fontWeight="bold"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    contentStyle={{ fontSize: '16px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Implementações por Semana - Gráfico de Barras */}
      <Card>
        <CardHeader>
          <CardTitle>Volume de Implementações por Semana</CardTitle>
          <CardDescription>
            Distribuição semanal das ideias implementadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={implementacoesPorSemana}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="semana" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 14, fontWeight: 'bold' }}
                  domain={[0, 'dataMax + 1']}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  labelStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                  contentStyle={{ fontSize: '16px', fontWeight: 'bold' }}
                />
                <Bar 
                  dataKey="implementadas" 
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Lista de Implementações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Implementações Recentes</CardTitle>
          <CardDescription>
            Últimas 10 ideias implementadas (baseado na data de implementação)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ideias
              .filter(item => item.STATUS === 'Implantada' && item['DATA IMPLANTAÇÃO'])
              .sort((a, b) => {
                const dateA = new Date(a['DATA IMPLANTAÇÃO'].split('/').reverse().join('-'));
                const dateB = new Date(b['DATA IMPLANTAÇÃO'].split('/').reverse().join('-'));
                return dateB.getTime() - dateA.getTime();
              })
              .slice(0, 10)
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
      </Card>
    </div>
  );
};

export default Implementacoes;
