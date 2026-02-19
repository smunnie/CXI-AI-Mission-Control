import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, Calendar, ChevronRight, Clock, ExternalLink, MessageSquare, Slack, Trello } from "lucide-react";
import { motion } from "framer-motion";
import type { Signal } from "@shared/schema";
import React, { forwardRef } from "react";

interface SignalCardProps {
  signal: Signal;
  index: number;
}

export const SignalCard = forwardRef(function SignalCard(
  { signal, index }: SignalCardProps, 
  ref: React.Ref<HTMLDivElement>
) {
  const urgencyColor = {
    high: "border-l-4 border-l-[hsl(var(--urgent))]",
    medium: "border-l-4 border-l-[hsl(var(--warning))]",
    low: "border-l-4 border-l-[hsl(var(--info))]",
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'slack': return <Slack className="w-3.5 h-3.5" />;
      case 'jira': return <Trello className="w-3.5 h-3.5" />; // Trello looks like Jira board
      case 'email': return <MessageSquare className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className={cn(
        "glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group",
        urgencyColor[signal.urgency as keyof typeof urgencyColor] || urgencyColor.low
      )}>
        <CardHeader className="pb-3 pt-5 px-5 flex flex-row items-start justify-between space-y-0">
          <div className="flex-1 mr-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-normal gap-1.5 bg-background/50">
                {getSourceIcon(signal.source)}
                {signal.source}
              </Badge>
              <Badge 
                variant={signal.urgency === 'high' ? 'destructive' : 'secondary'} 
                className="text-xs font-normal capitalize"
              >
                {signal.category}
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
              {signal.title}
            </CardTitle>
          </div>
          {signal.deadline && (
            <div className="flex flex-col items-end text-xs text-muted-foreground min-w-[80px]">
              <span className="flex items-center gap-1 text-[hsl(var(--urgent))] font-medium bg-[hsl(var(--urgent))]/10 px-2 py-1 rounded-md">
                <Calendar className="w-3 h-3" />
                {new Date(signal.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent className="px-5 pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {signal.summary}
          </p>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button variant="ghost" size="sm" className="h-8 px-0 text-muted-foreground hover:text-foreground text-xs">
            Dismiss
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs shadow-md shadow-primary/20">
            View Source <ExternalLink className="w-3 h-3" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
});
