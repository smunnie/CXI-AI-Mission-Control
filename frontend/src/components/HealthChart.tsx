import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";

interface HealthChartProps {
  data: number[];
  insights: string[];
}

export function HealthChart({ data, insights }: HealthChartProps) {
  const chartData = data.map((val, i) => ({ day: `D${i + 1}`, value: val }));

  return (
    <Card className="glass-card flex flex-col overflow-hidden">
      <CardHeader className="pb-2 bg-muted/30 border-b border-border/50 shrink-0">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Execution Health Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col">
        <div className="h-[120px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="day" 
                hide 
              />
              <YAxis 
                hide 
                domain={[0, 100]} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))',
                  borderRadius: '8px',
                  border: '1px solid hsl(var(--border))',
                  fontSize: '12px'
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ r: 3, fill: "hsl(var(--background))", strokeWidth: 2 }}
                activeDot={{ r: 5, fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2">
          {insights.map((insight, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1 shrink-0" />
              <span className="leading-tight">{insight}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
