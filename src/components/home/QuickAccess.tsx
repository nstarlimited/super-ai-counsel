import { Calendar, Heart, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const QuickAccess = () => {
  const tools = [
    { icon: Star, title: "Document Templates", count: 15 },
    { icon: Heart, title: "Saved Items", count: 8 },
    { icon: Calendar, title: "Recent Cases", count: 3 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Access Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <tool.icon className="h-6 w-6 mb-2 text-primary" />
              <div className="text-sm font-medium text-center">{tool.title}</div>
              <div className="text-xs text-gray-500">{tool.count} items</div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-gray-400 mt-2">*This is mock data for beta testing</div>
      </CardContent>
    </Card>
  );
};