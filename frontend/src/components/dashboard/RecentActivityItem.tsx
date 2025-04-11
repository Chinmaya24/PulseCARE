
import { CalendarClock } from "lucide-react";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status?: "success" | "warning" | "error" | "info";
  icon?: React.ReactNode;
}

interface RecentActivityItemProps {
  activity: ActivityItem;
}

export const RecentActivityItem = ({ activity }: RecentActivityItemProps) => {
  const { title, description, timestamp, status, icon } = activity;

  const getStatusClass = () => {
    switch (status) {
      case "success":
        return "bg-status-success/20 text-status-success";
      case "warning":
        return "bg-status-warning/20 text-status-warning";
      case "error":
        return "bg-status-error/20 text-status-error";
      case "info":
        return "bg-status-info/20 text-status-info";
      default:
        return "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="flex items-start space-x-4 py-3">
      <div className={`p-2 rounded-full ${getStatusClass()}`}>
        {icon || <CalendarClock className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground">{timestamp}</div>
    </div>
  );
};
