import { z } from "zod";

export const snapshotSchema = z.object({
  urgent_count: z.number(),
  risk_count: z.number(),
  deadlines_count: z.number(),
  execution_health: z.string()
});

export const signalSchema = z.object({
  id: z.string(),
  title: z.string(),
  source: z.string(),
  category: z.string(),
  summary: z.string(),
  urgency: z.string(),
  deadline: z.string().optional()
});

export const activitySchema = z.object({
  id: z.string(),
  text: z.string(),
  source: z.string(),
  timestamp: z.string()
});

export const executionHealthSchema = z.object({
  sentiment_trend: z.array(z.number()),
  insights: z.array(z.string())
});

export const actionSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.string()
});

export const dashboardDataSchema = z.object({
  snapshot: snapshotSchema,
  signals: z.array(signalSchema),
  latest_activity: z.array(activitySchema),
  emerging_risks: z.string(),
  execution_health: executionHealthSchema,
  recommended_actions: z.array(actionSchema)
});

export type DashboardData = z.infer<typeof dashboardDataSchema>;
export type Signal = z.infer<typeof signalSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type Action = z.infer<typeof actionSchema>;
