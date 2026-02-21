import { useState } from "react";
import { useDashboard } from "@/hooks/use-dashboard";
import { MetricCard } from "@/components/MetricCard";
import { SignalCard } from "@/components/SignalCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { HealthChart } from "@/components/HealthChart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  ArrowRight, 
  BarChart3, 
  CalendarDays, 
  CheckCircle2, 
  Filter, 
  LayoutDashboard, 
  RefreshCcw, 
  Search, 
  ShieldAlert, 
  Sparkles,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const { data, isLoading, isError, refetch, isRefetching } = useDashboard();
  const [filterSource, setFilterSource] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <DashboardError onRetry={() => refetch()} />;
  if (!data) return null;

  // Filter signals
  const filteredSignals = data.signals.filter(s => {
    const matchesSource = filterSource === "All" || s.source.toLowerCase() === filterSource.toLowerCase();
    const matchesCategory = filterCategory === "All" || s.category.toLowerCase() === filterCategory.toLowerCase() || (filterCategory === "Deadlines" && s.category.toLowerCase() === "deadline") || (filterCategory === "Blockers" && s.category.toLowerCase() === "blocker");
    return matchesSource && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background/50 p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            Mission Control
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered insights for high-performance team leadership.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search signals..." className="pl-9 bg-background" />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => refetch()} 
            className={isRefetching ? "animate-spin" : ""}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </header>

      {/* 1. Snapshot Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Urgent Items" 
          value={data.snapshot.urgent_count} 
          icon={<AlertCircle className="w-5 h-5" />} 
          color="urgent"
          trend="up"
          trendValue="12%"
          delay={0}
        />
        <MetricCard 
          title="Risks Detected" 
          value={data.snapshot.risk_count} 
          icon={<ShieldAlert className="w-5 h-5" />} 
          color="warning"
          trend="down"
          trendValue="5%"
          delay={0.1}
        />
        <MetricCard 
          title="Upcoming Deadlines" 
          value={data.snapshot.deadlines_count} 
          icon={<CalendarDays className="w-5 h-5" />} 
          color="info"
          trend="neutral"
          trendValue="0%"
          delay={0.2}
        />
        <MetricCard 
          title="Execution Health" 
          value={data.snapshot.execution_health} 
          icon={<BarChart3 className="w-5 h-5" />} 
          color="success"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area (Left) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 4. Emerging Risks Highlight */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-[hsl(var(--warning))/10] via-background to-background border border-[hsl(var(--warning))/20] rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldAlert className="w-32 h-32 text-[hsl(var(--warning))]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-[hsl(var(--warning))] font-medium">
                <ShieldAlert className="w-4 h-4" />
                <span>Emerging Risk Analysis</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Potential Delivery Bottleneck Detected</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {data.emerging_risks}
              </p>
            </div>
          </motion.div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 -my-4 px-1 rounded-lg">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full no-scrollbar">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {["All", "Slack", "Jira", "Email"].map(src => (
                <Badge 
                  key={src}
                  variant={filterSource === src ? "default" : "outline"}
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => setFilterSource(src)}
                >
                  {src}
                </Badge>
              ))}
              <div className="w-px h-4 bg-border mx-2 shrink-0" />
              {["All", "Urgent", "Deadlines", "Blockers"].map(cat => (
                <Badge 
                  key={cat}
                  variant={filterCategory === cat ? "default" : "outline"}
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* 2. Important Signals */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredSignals.map((signal, idx) => (
                <SignalCard key={signal.id} signal={signal} index={idx} />
              ))}
              {filteredSignals.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No signals found matching your filters.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Area (Right) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 5. Execution Health Chart */}
          <div className="h-[300px]">
            <HealthChart 
              data={data.execution_health.sentiment_trend} 
              insights={data.execution_health.insights} 
            />
          </div>

          {/* 6. Recommended Actions */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-yellow-500" />
              Recommended Actions
            </h3>
            <div className="space-y-4">
              {data.recommended_actions.map((action, i) => (
                <div key={i} className="group p-3 rounded-xl bg-secondary/30 hover:bg-secondary/80 transition-colors border border-transparent hover:border-border cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{action.title}</h4>
                    <Badge variant={action.priority === 'High' ? 'destructive' : 'secondary'} className="text-[10px] h-5">
                      {action.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{action.description}</p>
                  <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Take Action <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Latest Activity Feed */}
          <div className="h-[400px]">
            <ActivityFeed activities={data.latest_activity} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-4">
          <Skeleton className="h-40 rounded-2xl" />
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
        </div>
        <div className="col-span-4 space-y-6">
          <Skeleton className="h-[300px] rounded-2xl" />
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-full w-fit mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground">Failed to load dashboard data. Please try again.</p>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    </div>
  );
}
