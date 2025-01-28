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
  AlertTriangle,
  Users,
  MessageSquare,
  Bot,
  Bell,
  ShoppingCart,
  HeadphonesIcon,
  Settings,
  LogOut,
  BookOpen,
  Shield,
  Video,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function DashboardSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
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
        { title: "Legal AI Tools", icon: Scale, url: "/dashboard/ask-ai" },
        { title: "Emergency Legal Help", icon: AlertTriangle, url: "/dashboard/emergency" },
      ],
    },
    {
      label: "Community",
      items: [
        { title: "Forums", icon: MessageSquare, url: "/dashboard/community/forums" },
        { title: "Knowledge Hub", icon: BookOpen, url: "/dashboard/community/knowledge" },
        { title: "Legal Aid", icon: Shield, url: "/dashboard/community/legal-aid" },
        { title: "Live Sessions", icon: Video, url: "/dashboard/community/sessions" },
      ],
    },
    {
      label: "Lawyer Marketplace",
      items: [
        { title: "Find a Lawyer", icon: Users, url: "/dashboard/find-lawyer" },
        { title: "Book Consultation", icon: MessageSquare, url: "/dashboard/booking" },
      ],
    },
    {
      label: "Smart Tools",
      items: [
        { title: "AI Insights", icon: Bot, url: "/dashboard/insights" },
        { title: "Notifications", icon: Bell, url: "/dashboard/notifications" },
      ],
    },
    {
      label: "Resources",
      items: [
        { title: "Legal Services", icon: ShoppingCart, url: "/dashboard/services" },
        { title: "Help & Support", icon: HeadphonesIcon, url: "/dashboard/support" },
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
    <Sidebar className="mt-[73px]">
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
                        <button className="w-full flex items-center">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      ) : (
                        <Link to={item.url} className="w-full flex items-center">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
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