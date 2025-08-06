import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgendamentosRealtime } from "@/hooks/useAgendamentosRealtime";
import { Calendar, Clock, User, Briefcase } from "lucide-react";

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'AGENDADO':
      return <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">Agendado</Badge>;
    case 'REAGENDADO':
      return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">Reagendado</Badge>;
    case 'CANCELADO':
      return <Badge className="bg-red-500/20 text-red-300 border-red-400/30">Cancelado</Badge>;
    default:
      return <Badge className="bg-gray-500/20 text-gray-300 border-gray-400/30">{status}</Badge>;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatTime = (timeString: string) => {
  return timeString.slice(0, 5); // Remove segundos se existirem
};

export const PainelAgendamentos = () => {
  const { agendamentos, isLoading, error } = useAgendamentosRealtime();

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Acompanhamento de Agendamentos</h1>
        <div className="text-red-400 bg-red-500/10 border border-red-400/30 rounded-lg p-4">
          Erro ao carregar agendamentos: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Acompanhamento de Agendamentos</h1>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Tempo Real</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : agendamentos.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Nenhum agendamento encontrado no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agendamentos.map((agendamento) => (
            <Card 
              key={agendamento.id} 
              className="hover:shadow-lg transition-all duration-200 border-border/50 hover:border-primary/20"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {agendamento.NOME || 'Nome não informado'}
                  </CardTitle>
                  {getStatusBadge(agendamento.STATUS)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(agendamento.DATA)} às {formatTime(agendamento.HORA)}</span>
                </div>
                
                {agendamento.PROFISSIONAL && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>{agendamento.PROFISSIONAL}</span>
                  </div>
                )}
                
                {agendamento.CONTATO && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{agendamento.CONTATO}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};