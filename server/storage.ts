import { type DashboardData } from "@shared/schema";

export interface IStorage {
  getDashboardData(): Promise<DashboardData>;
}

export class MemStorage implements IStorage {
  async getDashboardData(): Promise<DashboardData> {
    return {
      snapshot: {
        urgent_count: 3,
        risk_count: 2,
        deadlines_count: 4,
        execution_health: "At Risk"
      },
      signals: [
        {
          id: "1",
          title: "Client approval delayed",
          source: "email",
          category: "deadline",
          summary: "Client delay may impact sprint timeline.",
          urgency: "high",
          deadline: "2026-02-21"
        },
        {
          id: "2",
          title: "API Integration Blocker",
          source: "slack",
          category: "blocker",
          summary: "Backend team waiting on credentials for third-party API.",
          urgency: "high"
        },
        {
          id: "3",
          title: "Jira ticket updated: Frontend Login",
          source: "jira",
          category: "update",
          summary: "Login component UI is complete, needs API integration.",
          urgency: "medium"
        },
        {
          id: "4",
          title: "Production Deployment",
          source: "jira",
          category: "deadline",
          summary: "Upcoming release window on Friday.",
          urgency: "medium",
          deadline: "2026-02-23"
        },
        {
          id: "5",
          title: "Server Load Spike",
          source: "slack",
          category: "urgent",
          summary: "Unusual CPU usage detected on API workers.",
          urgency: "high"
        }
      ],
      latest_activity: [
        {
          id: "a1",
          text: "Still blocked on API access",
          source: "slack",
          timestamp: "2026-02-19T09:30:00"
        },
        {
          id: "a2",
          text: "Sent client email regarding delay",
          source: "email",
          timestamp: "2026-02-19T08:15:00"
        },
        {
          id: "a3",
          text: "Login UI PR merged",
          source: "jira",
          timestamp: "2026-02-19T07:45:00"
        }
      ],
      emerging_risks: "Multiple blocker mentions related to API integration may affect delivery timelines.",
      execution_health: {
        sentiment_trend: [0.1, 0.0, -0.1, -0.2, -0.3, -0.2, -0.4],
        insights: [
          "Blocker mentions increased compared to last week.",
          "Urgency signals trending upward.",
          "No major overload patterns detected."
        ]
      },
      recommended_actions: [
        {
          title: "Align API and Frontend teams",
          description: "Schedule short sync to unblock integration issues.",
          priority: "High"
        },
        {
          title: "Follow up with Client",
          description: "Send a reminder about the delayed approval.",
          priority: "Medium"
        },
        {
          title: "Investigate CPU Spike",
          description: "Check APM metrics for the recent API worker load increase.",
          priority: "High"
        }
      ]
    };
  }
}

export const storage = new MemStorage();
