import { AgendamentoCard } from "./AgendamentoCard";
import { Loader2, Calendar, AlertCircle } from "lucide-react";

// Mock data for development - will be replaced when Supabase is connected
const mockAgendamentos = [
  {
    id: 1,
    NOME: "João Silva",
    DATA: "2025-01-22",
    HORA: "09:00",
    STATUS: "AGENDADO",
    PROFISSIONAL: "Dr. Maria Santos",
    CONTATO: "(11) 99999-9999"
  },
  {
    id: 2,
    NOME: "Ana Costa",
    DATA: "2025-01-22",
    HORA: "10:30",
    STATUS: "REAGENDADO",
    PROFISSIONAL: "Dr. João Pereira",
    CONTATO: "(11) 88888-8888"
  },
  {
    id: 3,
    NOME: "Carlos Oliveira",
    DATA: "2025-01-23",
    HORA: "14:00",
    STATUS: "CANCELADO",
    PROFISSIONAL: "Dra. Paula Lima",
    CONTATO: "(11) 77777-7777"
  },
  {
    id: 4,
    NOME: "Mariana Ferreira",
    DATA: "2025-01-23",
    HORA: "15:30",
    STATUS: "AGENDADO",
    PROFISSIONAL: "Dr. Pedro Alves",
    CONTATO: "(11) 66666-6666"
  },
  {
    id: 5,
    NOME: "Roberto Santos",
    DATA: "2025-01-24",
    HORA: "08:00",
    STATUS: "AGENDADO",
    PROFISSIONAL: "Dra. Lucia Mendes",
    CONTATO: "(11) 55555-5555"
  },
  {
    id: 6,
    NOME: "Patricia Lima",
    DATA: "2025-01-24",
    HORA: "11:00",
    STATUS: "REAGENDADO",
    PROFISSIONAL: "Dr. Fernando Costa",
    CONTATO: "(11) 44444-4444"
  }
];

export const AgendamentosList = () => {
  // Mock loading/error states for demonstration
  const isLoading = false;
  const error = false;
  const agendamentos = mockAgendamentos;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <span className="text-lg font-semibold text-gray-700">Carregando agendamentos...</span>
          <p className="text-sm text-gray-500 mt-2">Conectando com o banco de dados</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-red-600 mb-2">Erro ao carregar agendamentos</p>
          <p className="text-gray-600 mb-4">Não foi possível conectar com o banco de dados</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!agendamentos || agendamentos.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
        <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600 mb-2">Nenhum agendamento encontrado</p>
          <p className="text-gray-500">Não há agendamentos para exibir no momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total de Agendamentos</h3>
              <p className="text-gray-600">Encontrados na base de dados</p>
            </div>
          </div>
          <div className="bg-primary text-white px-6 py-3 rounded-2xl font-bold text-2xl">
            {agendamentos.length}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {agendamentos.map((agendamento) => (
          <AgendamentoCard key={agendamento.id} agendamento={agendamento} />
        ))}
      </div>
    </div>
  );
};