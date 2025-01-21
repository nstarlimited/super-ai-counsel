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
  MessagesSquare,
  CalendarDays,
  MessageCircle,
  CreditCard,
  HeadphonesIcon,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        {
          title: "Legal AI Tools",
          icon: Scale,
          subItems: [
            { title: "Ask AI Lawyer", url: "/dashboard/ask-ai" },
            { title: "Document Automation", url: "/dashboard/documents" },
            { title: "Document Review", url: "/dashboard/review" },
          ],
        },
        { title: "Emergency Legal Help", icon: AlertTriangle, url: "/dashboard/emergency" },
      ],
    },
    {
      label: "Lawyer Marketplace",
      items: [
        {
          title: "Find Legal Help",
          icon: Users,
          subItems: [
            { title: "Find a Lawyer", url: "/dashboard/find-lawyer" },
            { title: "Book Consultation", url: "/dashboard/booking" },
            { title: "Ratings & Reviews", url: "/dashboard/reviews" },
          ],
        },
      ],
    },
    {
      label: "Community",
      items: [
        {
          title: "Community Features",
          icon: MessageSquare,
          subItems: [
            { title: "Legal Forums", url: "/dashboard/forums" },
            { title: "Knowledge Hub", url: "/dashboard/knowledge" },
            { title: "Competitions", url: "/dashboard/competitions" },
            { title: "Networking", url: "/dashboard/networking" },
          ],
        },
      ],
    },
    {
      label: "Smart Tools",
      items: [
        {
          title: "AI Tools",
          icon: Bot,
          subItems: [
            { title: "Legal Insights", url: "/dashboard/insights" },
            { title: "Legal Translator", url: "/dashboard/translator" },
            { title: "AI Chatbot", url: "/dashboard/chatbot" },
          ],
        },
        { title: "Notifications", icon: Bell, url: "/dashboard/notifications" },
      ],
    },
    {
      label: "Marketplace",
      items: [
        {
          title: "Legal Resources",
          icon: ShoppingCart,
          subItems: [
            { title: "Legal Services", url: "/dashboard/services" },
            { title: "Courses & Tutorials", url: "/dashboard/courses" },
            { title: "Templates", url: "/dashboard/templates" },
            { title: "Software Tools", url: "/dashboard/tools" },
          ],
        },
      ],
    },
    {
      label: "Community Groups",
      items: [
        {
          title: "Groups & Events",
          icon: Users,
          subItems: [
            { title: "Industry Groups", url: "/dashboard/industry-groups" },
            { title: "Peer Advice", url: "/dashboard/peer-advice" },
            { title: "Events & Webinars", url: "/dashboard/events" },
          ],
        },
        { title: "Feedback", icon: MessageCircle, url: "/dashboard/feedback" },
      ],
    },
    {
      label: "Support",
      items: [
        {
          title: "Help & Support",
          icon: HeadphonesIcon,
          subItems: [
            { title: "Subscription Plans", url: "/dashboard/subscription" },
            { title: "Customer Support", url: "/dashboard/support" },
            { title: "Help Center", url: "/dashboard/help" },
          ],
        },
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
                    {item.subItems ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4" />
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          className="w-48"
                          align="start"
                          alignOffset={-4}
                        >
                          {item.subItems.map((subItem) => (
                            <DropdownMenuItem key={subItem.title} asChild>
                              <a
                                href={subItem.url}
                                className="flex items-center cursor-pointer"
                              >
                                {subItem.title}
                              </a>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
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
                    )}
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