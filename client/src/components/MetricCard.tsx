import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "default" | "urgent" | "warning" | "success" | "info";
  className?: string;
  delay?: number;
}

export function MetricCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = "default",
  className,
  delay = 0 
}: MetricCardProps) {
  
  const colorMap = {
    default: "text-foreground",
    urgent: "text-[hsl(var(--urgent))]",
    warning: "text-[hsl(var(--warning))]",
    success: "text-[hsl(var(--success))]",
    info: "text-[hsl(var(--info))]",
  };

  const bgMap = {
    default: "bg-secondary",
    urgent: "bg-[hsl(var(--urgent))]/10",
    warning: "bg-[hsl(var(--warning))]/10",
    success: "bg-[hsl(var(--success))]/10",
    info: "bg-[hsl(var(--info))]/10",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "glass-card p-6 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className={cn("text-3xl font-bold tracking-tight", colorMap[color])}>
            {value}
          </h3>
        </div>
        <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110 duration-300", bgMap[color], colorMap[color])}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-xs font-medium">
          <span className={cn(
            "flex items-center gap-1", 
            trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
          )}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
          </span>
          <span className="text-muted-foreground ml-1.5">vs last week</span>
        </div>
      )}
    </motion.div>
  );
}
