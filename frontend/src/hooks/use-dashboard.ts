import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/routes";
import type { DashboardData } from "@/shared/schema";

const DEFAULT_DAYS = 7;

export function useDashboard(days: number = DEFAULT_DAYS) {
  return useQuery<DashboardData>({
    queryKey: [api.dashboard.get.path, days],
    queryFn: async () => {
      const url = `${api.dashboard.get.path}?days=${days}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return await res.json();
    },
    // refetchInterval: 30000,
  });
}
