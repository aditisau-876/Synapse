export interface DashboardStat {
  id: string;
  title: string;
  value: number;
  color: string;
  icon: string;
}

export interface RecentChat {
  id: string;
  name: string;
  message: string;
  time: string;
  online: boolean;
  unread: number;
}

export interface Meeting {
  id: string;
  title: string;
  time: string;
  participants: number;
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
}

export interface TaskItem {
  id: string;
  title: string;
  progress: number;
  priority: "Low" | "Medium" | "High";
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}