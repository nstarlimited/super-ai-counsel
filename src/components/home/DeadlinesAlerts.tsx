import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export const DeadlinesAlerts = () => {
  const deadlines = [
    { title: "Contract Review Due", date: "Today", status: "urgent" },
    { title: "Client Meeting", date: "Tomorrow", status: "upcoming" },
    { title: "File Documentation", date: "Next Week", status: "planned" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Deadlines & Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deadlines.map((deadline, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-sm font-medium">{deadline.title}</div>
                  <div className="text-xs text-gray-500">{deadline.date}</div>
                </div>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded ${
                  deadline.status === "urgent"
                    ? "bg-red-100 text-red-600"
                    : deadline.status === "upcoming"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {deadline.status}
              </div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-gray-400 mt-2">*This is mock data for beta testing</div>
      </CardContent>
    </Card>
  );
};