import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  User,
  Scale,
  FileText,
  Upload,
  AlertTriangle,
  Users,
  Calendar,
  Star,
  MessageSquare,
  BookOpen,
  Trophy,
  Network,
  LineChart,
  Languages,
  Bot,
  Bell,
  ShoppingCart,
  GraduationCap,
  FileCode,
  Box,
  UserGroup,
  MessagesSquare,
  CalendarDays,
  MessageCircle,
  CreditCard,
  HeadphonesIcon,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function DashboardSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const menuGroups = [
    {
      label: "Main Dashboard",
      items: [
        { title: "Home", icon: Home, url: "/dashboard" },
        { title: "Profile", icon: User, url: "/dashboard/profile" },
      ],
    },
    {
      label: "Legal Assistance",
      items: [
        { title: "Ask AI Lawyer", icon: Scale, url: "/dashboard/ask-ai" },
        { title: "Document Automation", icon: FileText, url: "/dashboard/documents" },
        { title: "Document Review", icon: Upload, url: "/dashboard/review" },
        { title: "Emergency Legal Help", icon: AlertTriangle, url: "/dashboard/emergency" },
      ],
    },
    {
      label: "Lawyer Marketplace",
      items: [
        { title: "Find a Lawyer", icon: Users, url: "/dashboard/find-lawyer" },
        { title: "Consultation Booking", icon: Calendar, url: "/dashboard/booking" },
        { title: "Lawyer Ratings & Reviews", icon: Star, url: "/dashboard/reviews" },
      ],
    },
    {
      label: "Community",
      items: [
        { title: "Legal Forums", icon: MessageSquare, url: "/dashboard/forums" },
        { title: "Knowledge Hub", icon: BookOpen, url: "/dashboard/knowledge" },
        { title: "Competitions & Awards", icon: Trophy, url: "/dashboard/competitions" },
        { title: "Networking", icon: Network, url: "/dashboard/networking" },
      ],
    },
    {
      label: "Smart Tools",
      items: [
        { title: "Legal Insights", icon: LineChart, url: "/dashboard/insights" },
        { title: "Legal Translator", icon: Languages, url: "/dashboard/translator" },
        { title: "AI Legal Chatbot", icon: Bot, url: "/dashboard/chatbot" },
        { title: "Personalized Notifications", icon: Bell, url: "/dashboard/notifications" },
      ],
    },
    {
      label: "Marketplace",
      items: [
        { title: "Legal Services", icon: ShoppingCart, url: "/dashboard/services" },
        { title: "Courses & Tutorials", icon: GraduationCap, url: "/dashboard/courses" },
        { title: "Premium Templates", icon: FileCode, url: "/dashboard/templates" },
        { title: "Legal Software Tools", icon: Box, url: "/dashboard/tools" },
      ],
    },
    {
      label: "Community Groups",
      items: [
        { title: "Industry Groups", icon: UserGroup, url: "/dashboard/industry-groups" },
        { title: "Peer Advice", icon: MessagesSquare, url: "/dashboard/peer-advice" },
        { title: "Events & Webinars", icon: CalendarDays, url: "/dashboard/events" },
        { title: "Feedback", icon: MessageCircle, url: "/dashboard/feedback" },
      ],
    },
    {
      label: "Subscription & Support",
      items: [
        { title: "Subscription Plans", icon: CreditCard, url: "/dashboard/subscription" },
        { title: "Customer Support", icon: HeadphonesIcon, url: "/dashboard/support" },
        { title: "Help Center", icon: HelpCircle, url: "/dashboard/help" },
      ],
    },
    {
      label: "Settings",
      items: [
        { title: "Settings", icon: Settings, url: "/dashboard/settings" },
        { title: "Logout", icon: LogOut, onClick: handleLogout },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild={!item.onClick}
                      onClick={item.onClick}
                      tooltip={item.title}
                    >
                      {item.onClick ? (
                        <button>
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      ) : (
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}