import {
  LayoutDashboard,
  Inbox,
  TrendingUp,
  MessageCircleQuestion,
  FileText,
  Settings,
  UsersRound,
  MessageSquarePlus,
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
    name: "Feedback",
    href: "/dashboard/feedback",
    icon: MessageCircleQuestion,
  },
  {
    name: "Add Feedback",
    href: "/dashboard/feedback/add",
    icon: MessageSquarePlus,
  },
  {
    name: "Members",
    href: "/dashboard/create-member",
    icon: UsersRound,
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
