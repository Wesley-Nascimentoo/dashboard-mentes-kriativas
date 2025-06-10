
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Circle, Calendar, CheckCircle, Info } from 'lucide-react';
import mentesData from '@/data/mentesKriativasData.json';

const Dashboard = () => {
  const { metasAno, metasMensais, funcionarios } = mentesData;
  const anoAtual = 2024;
  const dadosAno = metasAno[anoAtual.toString() as keyof typeof metasAno];

  // Dados para o gráfico mensal
  const dadosGraficoMensal = metasMensais.map(item => ({
    mes: item.mes.substring(0, 3),
    Meta: item.meta,
    Submissões: item.submissoes,
    Percentual: item.percentual
  }));

  return (
    <div className="space-y-6">
      {/* Métricas principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Anual {anoAtual}</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dadosAno.submissoes}/{dadosAno.metaTotal}</div>
            <p className="text-xs text-muted-foreground">
              {dadosAno.percentualAtingido}% da meta atingida
            </p>
            <Progress value={dadosAno.percentualAtingido} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários Meta Atual</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{funcionarios.funcionariosMetaAtual}/{funcionarios.totalFuncionarios}</div>
            <p className="text-xs text-muted-foreground">
              {funcionarios.percentualMetaAtual}% atingiram a meta atual
            </p>
            <Progress value={funcionarios.percentualMetaAtual} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários Meta Anual</CardTitle>
            <Circle className="h-4 w-4 text-blue-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{funcionarios.funcionariosMetaAnual}/{funcionarios.totalFuncionarios}</div>
            <p className="text-xs text-muted-foreground">
              {funcionarios.percentualMetaAnual}% atingiram a meta anual
            </p>
            <Progress value={funcionarios.percentualMetaAnual} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Participantes</CardTitle>
            <Info className="h-4 w-4 text-blue-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{funcionarios.funcionariosComMeta}</div>
            <p className="text-xs text-muted-foreground">
              De {funcionarios.totalFuncionarios} funcionários totais
            </p>
            <Progress value={(funcionarios.funcionariosComMeta / funcionarios.totalFuncionarios) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submissões vs Meta Mensal</CardTitle>
            <CardDescription>
              Comparativo entre ideias submetidas e metas mensais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosGraficoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, name === 'Meta' ? 'Meta' : 'Submissões']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Bar dataKey="Meta" fill="#93c5fd" name="Meta" />
                <Bar dataKey="Submissões" fill="#3b82f6" name="Submissões" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Percentual de Atingimento</CardTitle>
            <CardDescription>
              Evolução do percentual de atingimento das metas mensais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosGraficoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentual']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="Percentual" 
                  stroke="#1d4ed8" 
                  strokeWidth={3}
                  dot={{ fill: '#1d4ed8', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumo do desempenho */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Programa Mentes Kriativas</CardTitle>
          <CardDescription>
            Visão geral do programa de inovação do setor de engenharia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{dadosAno.submissoes}</div>
              <p className="text-sm text-muted-foreground">Ideias Submetidas em {anoAtual}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{funcionarios.funcionariosComMeta}</div>
              <p className="text-sm text-muted-foreground">Funcionários Participantes</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{dadosAno.percentualAtingido}%</div>
              <p className="text-sm text-muted-foreground">Meta Anual Atingida</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
