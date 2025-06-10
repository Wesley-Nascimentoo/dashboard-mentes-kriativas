
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Calendar, Info, User, Building2 } from 'lucide-react';
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
        const metaAtual = 6;
        const metaAnual = 12;
        const ideiasSubmitidas = funcionario.total;
        
        const funcionarioCompleto = {
          id: funcionario.Matricula.toString(),
          nome: funcionario.Nome,
          departamento: funcionario["Descrição Seção"],
          ideiasSubmitidas: ideiasSubmitidas,
          metaAtual: metaAtual,
          metaAnual: metaAnual,
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Consulta Serasa - Mentes Kriativas
          </CardTitle>
          <CardDescription>
            Digite sua matrícula para consultar o status das suas metas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="matricula" className="text-sm font-medium mb-2 block">
                Matrícula do Funcionário
              </label>
              <Input
                id="matricula"
                placeholder="Digite sua matrícula (ex: 500360, 501075...)"
                value={matriculaFuncionario}
                onChange={(e) => setMatriculaFuncionario(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && buscarFuncionario()}
              />
            </div>
            <Button 
              onClick={buscarFuncionario} 
              disabled={carregando}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {carregando ? 'Consultando...' : 'Consultar'}
            </Button>
            {funcionarioEncontrado && (
              <Button variant="outline" onClick={limparConsulta}>
                Nova Consulta
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {funcionarioEncontrado && (
        <div className="space-y-4">
          {/* Informações do funcionário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <User className="h-5 w-5" />
                {funcionarioEncontrado.nome}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {funcionarioEncontrado.departamento}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Matrícula</p>
                  <div className="text-lg font-bold text-blue-600 mt-1">
                    {funcionarioEncontrado.id}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Última submissão</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">
                      {new Date(funcionarioEncontrado.ultimaSubmissao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de ideias submetidas</p>
                  <div className="text-2xl font-bold text-blue-600 mt-1">
                    {funcionarioEncontrado.ideiasSubmitidas}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status das metas */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className={`border-l-4 ${funcionarioEncontrado.atingiuMetaAtual ? 'border-l-green-500' : 'border-l-orange-500'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  {funcionarioEncontrado.atingiuMetaAtual ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-orange-500" />
                  )}
                  Meta Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progresso</span>
                    <Badge variant={funcionarioEncontrado.atingiuMetaAtual ? "default" : "secondary"}>
                      {funcionarioEncontrado.atingiuMetaAtual ? 'Atingida' : 'Em andamento'}
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold">
                    {funcionarioEncontrado.ideiasSubmitidas}/{funcionarioEncontrado.metaAtual}
                  </div>
                  <Progress 
                    value={Math.min((funcionarioEncontrado.ideiasSubmitidas / funcionarioEncontrado.metaAtual) * 100, 100)} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className={`border-l-4 ${funcionarioEncontrado.atingiuMetaAnual ? 'border-l-green-500' : 'border-l-blue-500'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  {funcionarioEncontrado.atingiuMetaAnual ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-blue-500" />
                  )}
                  Meta Anual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progresso</span>
                    <Badge variant={funcionarioEncontrado.atingiuMetaAnual ? "default" : "secondary"}>
                      {funcionarioEncontrado.percentualAnual}%
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold">
                    {funcionarioEncontrado.ideiasSubmitidas}/{funcionarioEncontrado.metaAnual}
                  </div>
                  <Progress 
                    value={funcionarioEncontrado.percentualAnual} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dicas e incentivos */}
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">
                {funcionarioEncontrado.atingiuMetaAnual ? '🎉 Parabéns!' : '💡 Continue inovando!'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-600 dark:text-blue-400">
                {funcionarioEncontrado.atingiuMetaAnual 
                  ? 'Você já atingiu sua meta anual! Continue contribuindo com suas ideias inovadoras.'
                  : funcionarioEncontrado.atingiuMetaAtual
                    ? 'Você atingiu sua meta atual! Faltam apenas algumas ideias para completar sua meta anual.'
                    : 'Continue submetendo suas ideias. Cada contribuição é valiosa para o programa Mentes Kriativas!'}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Instruções */}
      {!funcionarioEncontrado && (
        <Card>
          <CardHeader>
            <CardTitle>Como consultar?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Digite sua matrícula no campo acima</p>
              <p>• Clique em "Consultar" para ver o status das suas metas</p>
              <p>• Matrículas de exemplo para teste: 500360, 501075, 501211, 502559</p>
              <p>• Em caso de dúvidas, entre em contato com o RH</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConsultaFuncionario;
