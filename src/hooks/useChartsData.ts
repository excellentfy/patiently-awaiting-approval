import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useChartsData = () => {
  return useQuery({
    queryKey: ['charts-data'],
    queryFn: async () => {
      // Garantir que pegamos a data local, não UTC
      const hoje = new Date();
      const year = hoje.getFullYear();
      const month = String(hoje.getMonth() + 1).padStart(2, '0');
      const day = String(hoje.getDate()).padStart(2, '0');
      const dataHoje = `${year}-${month}-${day}`;

      const { data, error } = await supabase
        .from('agendamentos_robustos')
        .select('*');

      if (error) {
        console.error('Error fetching chart data:', error);
        throw error;
      }

      // Filtrar apenas dados do dia atual para os gráficos específicos
      const dadosHoje = data?.filter(item => item.DATA === dataHoje) || [];

      // Dados para distribuição por status (todos os dados)
      const statusCounts = data?.reduce((acc: any, item) => {
        acc[item.STATUS] = (acc[item.STATUS] || 0) + 1;
        return acc;
      }, {}) || {};

      const statusData = [
        { name: 'AGENDADO', value: statusCounts.AGENDADO || 0, color: '#22c55e' },
        { name: 'CANCELADO', value: statusCounts.CANCELADO || 0, color: '#ef4444' },
        { name: 'REAGENDADO', value: statusCounts.REAGENDADO || 0, color: '#f59e0b' }
      ];

      // Dados para horários de pico - TODOS OS DADOS HISTÓRICOS
      const horariosPicoCounts = data
        ?.filter(item => item.STATUS === 'AGENDADO' || item.STATUS === 'REAGENDADO')
        .reduce((acc: any, item) => {
          const hora = item.HORA ? item.HORA.toString().substring(0, 5) : '';
          if (hora) {
            acc[hora] = (acc[hora] || 0) + 1;
          }
          return acc;
        }, {}) || {};

      // Ordenar horários por frequência e pegar os top horários de pico
      const horariosPicoData = Object.entries(horariosPicoCounts)
        .map(([hora, count]) => ({
          horario: hora,
          total: count as number
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10); // Top 10 horários de pico

      // Dados para performance por profissional - APENAS DO DIA ATUAL
      const profissionalCounts = dadosHoje
        .filter(item => item.STATUS === 'AGENDADO' || item.STATUS === 'REAGENDADO')
        .reduce((acc: any, item) => {
          if (item.PROFISSIONAL) {
            acc[item.PROFISSIONAL] = (acc[item.PROFISSIONAL] || 0) + 1;
          }
          return acc;
        }, {}) || {};

      const cores = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#f97316'];
      const performanceData = Object.entries(profissionalCounts)
        .map(([name, count], index) => ({
          name,
          agendamentos: count,
          color: cores[index % cores.length]
        }));

      return { statusData, horariosPicoData, performanceData };
    },
  });
};