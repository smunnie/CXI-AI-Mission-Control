import { cn } from "@/lib/utils";
import { Activity } from "@shared/schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, MessageSquare, GitCommit, Flag } from "lucide-react";

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'slack': return <MessageSquare className="w-3.5 h-3.5 text-blue-500" />;
      case 'github': return <GitCommit className="w-3.5 h-3.5 text-purple-500" />;
      case 'jira': return <Flag className="w-3.5 h-3.5 text-orange-500" />;
      default: return <Clock className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-border/50 bg-muted/30">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Latest Activity
        </h3>
      </div>
      <ScrollArea className="flex-1 p-0">
        <div className="divide-y divide-border/30">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-muted/30 transition-colors flex gap-3 group cursor-pointer">
              <div className="mt-0.5 min-w-[24px] h-6 rounded-full bg-secondary flex items-center justify-center border border-border">
                {getIcon(activity.source)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-foreground/90 leading-snug group-hover:text-primary transition-colors">
                  {activity.text}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {activity.source}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
