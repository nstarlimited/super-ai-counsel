import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  Scale,
  AlertTriangle,
  Users,
  MessageSquare,
  Bot,
  Bell,
  ShoppingCart,
  HeadphonesIcon,
  Settings,
  Users as Community,
} from "lucide-react";
import { Link } from "react-router-dom";
import { UpgradeButton } from "../pricing/UpgradeButton";

export function DashboardSidebar() {
  const menuGroups = [
    {
      label: "Main Dashboard",
      items: [
        { title: "Home", icon: Home, url: "/dashboard" },
        { title: "Community", icon: Community, url: "/dashboard/community" },
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
                      asChild
                      tooltip={item.title}
                    >
                      <Link to={item.url} className="w-full flex items-center">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-2">
        <UpgradeButton />
      </SidebarFooter>
    </Sidebar>
  );
}