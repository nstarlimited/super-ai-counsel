import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, ThumbsUp, Users } from "lucide-react";

interface LawyerStatsProps {
  successRate: number;
  responseTime: string;
  totalClients: number;
  experienceYears: number;
}

export const LawyerStats = ({
  successRate,
  responseTime,
  totalClients,
  experienceYears,
}: LawyerStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span className="font-medium">Success Rate</span>
            </div>
            <span className="text-2xl font-bold">{successRate}%</span>
          </div>
          <Progress value={successRate} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Response Time</span>
            </div>
            <span className="text-lg font-medium">{responseTime}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span className="font-medium">Total Clients</span>
            </div>
            <span className="text-2xl font-bold">{totalClients}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Years of Experience</span>
            </div>
            <span className="text-2xl font-bold">{experienceYears}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};