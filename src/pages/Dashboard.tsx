
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { AgendamentosTable } from "@/components/AgendamentosTable";
import { StatsCards } from "@/components/StatsCards";
import { ChartsSection } from "@/components/ChartsSection";

export const Dashboard = () => {
  useEffect(() => {
    // Aplicar tema escuro automaticamente
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* Cabeçalho */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">
            DASHBOARD DE AGENDAMENTOS
          </h1>
          <p className="text-muted-foreground text-lg">
            Análise completa e interativa dos seus agendamentos em tempo real
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <StatsCards />

        {/* Tabela de Agendamentos */}
        <div className="mb-8">
          <AgendamentosTable />
        </div>

        {/* Gráficos */}
        <ChartsSection />
      </main>
    </div>
  );
};
