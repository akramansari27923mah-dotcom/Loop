import {
  LayoutDashboard,
  Inbox,
  TrendingUp,
  MessageCircleQuestion,
  FileText,
  Settings,
} from "lucide-react";

export const sidebarRoutes = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Inbox",
    href: "/dashboard/inbox",
    icon: Inbox,
  },
  {
    name: "Trends",
    href: "/dashboard/trends",
    icon: TrendingUp,
  },
  {
    name: "Ask LOOP",
    href: "/dashboard/ask",
    icon: MessageCircleQuestion,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
