
import { ActivityItem, RecentActivityItem } from "./RecentActivityItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxHeight?: string;
}

export const ActivityFeed = ({ activities, maxHeight = "400px" }: ActivityFeedProps) => {
  return (
    <ScrollArea className={`h-full max-h-[${maxHeight}]`}>
      <div className="space-y-1">
        {activities.map((activity) => (
          <RecentActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </ScrollArea>
  );
};
