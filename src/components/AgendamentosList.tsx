import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent, CalendarIcon, Filter } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgendamentosSegmentados } from "@/hooks/useAgendamentosSegmentados";
import { AgendamentosTempoReal } from "./AgendamentosTempoReal";
import { HistoricoDia } from "./HistoricoDia";
import { CancelamentosDia } from "./CancelamentosDia";

export const AgendamentosList = () => {
  const { data: agendamentosSegmentados, isLoading } = useAgendamentosSegmentados();
  const [profissionalFilter, setProfissionalFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [dataInicial, setDataInicial] = useState<Date>();
  const [dataFinal, setDataFinal] = useState<Date>();

  const filtrarAgendamentos = (agendamentos: any[]) => {
    return agendamentos?.filter(agendamento => {
      const profissionalMatch = profissionalFilter === "todos" || agendamento.PROFISSIONAL === profissionalFilter;
      const statusMatch = statusFilter === "todos" || agendamento.STATUS === statusFilter;
      return profissionalMatch && statusMatch;
    }) || [];
  };

  const agendamentosTempoRealFiltrados = filtrarAgendamentos(agendamentosSegmentados?.tempoReal || []);
  const agendamentosHistoricoFiltrados = filtrarAgendamentos(agendamentosSegmentados?.historico || []);
  const cancelamentosFiltrados = filtrarAgendamentos(agendamentosSegmentados?.cancelamentos || []);

  return (
    <div className="space-y-6">
      {/* Agendamentos - Tempo Real */}
      <AgendamentosTempoReal 
        agendamentos={agendamentosTempoRealFiltrados} 
        isLoading={isLoading} 
      />

      {/* Histórico do Dia */}
      <HistoricoDia 
        agendamentos={agendamentosHistoricoFiltrados} 
        isLoading={isLoading} 
      />

      {/* Cancelamentos */}
      <CancelamentosDia 
        agendamentos={cancelamentosFiltrados} 
        isLoading={isLoading} 
      />

      {/* Filtros */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-base font-medium text-card-foreground mb-2 block">Profissional</label>
              <Select value={profissionalFilter} onValueChange={setProfissionalFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                   <SelectItem value="todos">Todos</SelectItem>
                   <SelectItem value="Allan Marques🪒">Allan Marques🪒</SelectItem>
                   <SelectItem value="Gil Pedrosa✂️">Gil Pedrosa✂️</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-base font-medium text-card-foreground mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="AGENDADO">AGENDADO</SelectItem>
                  <SelectItem value="CANCELADO">CANCELADO</SelectItem>
                  <SelectItem value="REAGENDADO">REAGENDADO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-base font-medium text-card-foreground mb-2 block">Data Inicial</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background border-border",
                      !dataInicial && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataInicial ? format(dataInicial, "PPP") : <span>Selecionar data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                  <Calendar
                    mode="single"
                    selected={dataInicial}
                    onSelect={setDataInicial}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-base font-medium text-card-foreground mb-2 block">Data Final</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background border-border",
                      !dataFinal && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataFinal ? format(dataFinal, "PPP") : <span>Selecionar data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                  <Calendar
                    mode="single"
                    selected={dataFinal}
                    onSelect={setDataFinal}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                setProfissionalFilter("todos");
                setStatusFilter("todos");
                setDataInicial(undefined);
                setDataFinal(undefined);
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};