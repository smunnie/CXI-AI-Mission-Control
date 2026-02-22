import { useState } from "react";
import { useDashboard } from "@/hooks/use-dashboard";
import { MetricCard } from "@/components/MetricCard";
import { SignalCard } from "@/components/SignalCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { HealthChart } from "@/components/HealthChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  BarChart3,
  CalendarDays,
  Filter,
  LayoutDashboard,
  RefreshCcw,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TIME_RANGES = [
  { label: "7 days", value: 7 },
  { label: "2 weeks", value: 14 },
  { label: "1 month", value: 30 },
  { label: "3 months", value: 90 },
] as const;

/* ---------------- Emerging Risk Component ---------------- */

function EmergingRisksStructured({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="space-y-5">
      <p className="text-muted-foreground text-sm">{data.summary}</p>

      <div className="space-y-4">
        {data.risks?.map((risk: any, i: number) => (
          <div
            key={i}
            className={`p-4 rounded-xl border ${
              risk.severity?.toLowerCase() === "critical"
                ? "border-red-300 bg-red-50"
                : risk.severity?.toLowerCase() === "high"
                ? "border-orange-300 bg-orange-50"
                : "border-border bg-background"
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-sm">{risk.title}</h4>
              {risk.confidence && (
                <span className="text-xs text-muted-foreground">
                  {Math.round(risk.confidence * 100)}% confidence
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {risk.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Main Dashboard ---------------- */

export default function Dashboard() {
  const [days, setDays] = useState<number>(7);
  const { data, isLoading, isError, refetch, isRefetching } =
    useDashboard(days);
  const [filterSource, setFilterSource] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <DashboardError onRetry={() => refetch()} />;
  if (!data) return null;

  /* ---------- Filtering Logic ---------- */

  const uniqueSources = Array.from(
    new Set(
      data.signals.flatMap((s: any) =>
        s.source.split(/\+/).map((part: string) => part.trim().toLowerCase())
      )
    )
  ).sort();

  const uniqueCategories = Array.from(
    new Set(data.signals.map((s: any) => s.category.trim().toLowerCase()))
  ).sort();

  const formatLabel = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1);

  const filteredSignals = data.signals.filter((s: any) => {
    const sourceLower = s.source.toLowerCase();
    const categoryLower = s.category.toLowerCase();

    const matchesSource =
      filterSource === "All" ||
      sourceLower.includes(filterSource.toLowerCase());

    const matchesCategory =
      filterCategory === "All" ||
      categoryLower === filterCategory.toLowerCase();

    return matchesSource && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background/50 p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            Mission Control
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered insights for high-performance team leadership.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_RANGES.map(({ label, value }) => (
                <SelectItem key={value} value={String(value)}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            className={isRefetching ? "animate-spin" : ""}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>

          <Button className="bg-primary hover:bg-primary/90">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </header>

      {/* Snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Urgent Items"
          value={data.snapshot.urgent_count}
          icon={<AlertCircle className="w-5 h-5" />}
          color="urgent"
        />
        <MetricCard
          title="Risks Detected"
          value={data.snapshot.risk_count}
          icon={<ShieldAlert className="w-5 h-5" />}
          color="warning"
        />
        <MetricCard
          title="Upcoming Deadlines"
          value={data.snapshot.deadlines_count}
          icon={<CalendarDays className="w-5 h-5" />}
          color="info"
        />
        <MetricCard
          title="Execution Health"
          value={data.snapshot.execution_health}
          icon={<BarChart3 className="w-5 h-5" />}
          color="success"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Emerging Risk */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl border p-6"
          >
            <div className="flex items-center gap-2 text-warning font-medium mb-3">
              <ShieldAlert className="w-4 h-4" />
              Emerging Risk Analysis
            </div>

            <EmergingRisksStructured data={data.emerging_risk} />
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {["All", ...uniqueSources].map((src) => (
              <Badge
                key={src}
                variant={filterSource === src ? "default" : "outline"}
                onClick={() => setFilterSource(src)}
                className="cursor-pointer capitalize"
              >
                {formatLabel(src)}
              </Badge>
            ))}
            {["All", ...uniqueCategories].map((cat) => (
              <Badge
                key={cat}
                variant={filterCategory === cat ? "default" : "outline"}
                onClick={() => setFilterCategory(cat)}
                className="cursor-pointer capitalize"
              >
                {formatLabel(cat)}
              </Badge>
            ))}
          </div>

          {/* Signals */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredSignals.map((signal: any, idx: number) => (
                <SignalCard key={signal.id} signal={signal} index={idx} />
              ))}
              {filteredSignals.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No signals match selected filters.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-4 space-y-6">
          <HealthChart
            data={data.execution_health.sentiment_trend}
            insights={data.execution_health.insights}
          />

          <div className="bg-card rounded-2xl border p-6">
            <h3 className="font-semibold flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-yellow-500" />
              Recommended Actions
            </h3>

            <div className="space-y-4">
              {data.recommended_actions.map((action: any, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-secondary/30 border">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium text-sm">
                      {action.title}
                    </h4>
                    <Badge variant="destructive">
                      {action.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ActivityFeed activities={data.latest_activity} />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Skeleton ---------------- */

function DashboardSkeleton() {
  return (
    <div className="min-h-screen p-8 space-y-6 max-w-7xl mx-auto">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-48 rounded-2xl" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="col-span-4 space-y-4">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Error ---------------- */

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}