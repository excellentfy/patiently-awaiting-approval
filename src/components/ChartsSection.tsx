
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer, ComposedChart } from "recharts";
import { useChartsData } from "@/hooks/useChartsData";

const chartConfig = {
  agendamentos: {
    label: "Agendamentos",
    color: "hsl(var(--primary))",
  },
  status: {
    label: "Status",
    color: "hsl(var(--primary))",
  },
  performance: {
    label: "Performance",
    color: "hsl(var(--primary))",
  },
};


// Componente customizado para barra com animação hover
const AnimatedBar = (props: any) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <g 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Bar 
        {...props}
        className="transition-all duration-700 ease-in-out"
        style={{ 
          transformOrigin: 'bottom',
          transform: isHovered ? 'scaleY(1)' : 'scaleY(0.1)'
        }}
      />
    </g>
  );
};

export const ChartsSection = () => {
  const { data: chartData, isLoading } = useChartsData();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Distribuição por Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Distribuição por Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData?.statusData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData?.statusData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center mt-4 space-x-4">
            {chartData?.statusData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Agendamentos por Horário */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Agendamentos por Horário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
               <ComposedChart 
                 data={chartData?.horarioData || []}
                 layout="horizontal"
                 margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
               >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeOpacity={0.8}
                    horizontal={false}
                    vertical={true}
                  />
                 <XAxis 
                   type="number"
                   stroke="hsl(var(--muted-foreground))"
                   fontSize={12}
                   label={{ value: 'Qtd', position: 'insideBottom', offset: -5 }}
                 />
                 <YAxis 
                   type="category"
                   dataKey="time" 
                   stroke="hsl(var(--muted-foreground))"
                   fontSize={12}
                 />
                 <Bar 
                   dataKey="agendamentos" 
                   fill="hsl(var(--primary))"
                   radius={[0, 4, 4, 0]}
                 />
                 <Line 
                   type="monotone"
                   dataKey="agendamentos" 
                   stroke="#ff8c00"
                   strokeWidth={3}
                   dot={{ fill: '#ff8c00', strokeWidth: 2, r: 4 }}
                   activeDot={{ r: 6, fill: '#ff8c00' }}
                   connectNulls={false}
                 />
                 <ChartTooltip content={<ChartTooltipContent />} />
               </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Performance por Profissional - Ocupa toda a largura e centralizado */}
      <Card className="bg-card border-border col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground text-center">
            Performance por Profissional
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-4xl">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData?.performanceData || []} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  label={{ 
                    value: 'Serviços\nRealizados', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Bar 
                  dataKey="agendamentos" 
                  radius={[4, 4, 0, 0]}
                  className="transition-all duration-300 hover:opacity-80"
                >
                  {chartData?.performanceData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
