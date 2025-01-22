import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const JobOpportunities = () => {
  const { data: jobs } = useQuery({
    queryKey: ["legal-jobs"],
    queryFn: async () => {
      const { data } = await supabase.from("legal_jobs").select("*");
      return data || [];
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Featured Legal Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs?.map((job) => (
            <div key={job.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{job.title}</h3>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {job.job_type}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">{job.company}</div>
              <div className="text-sm text-gray-500 mb-3">
                {job.location} • {job.salary_range}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Apply Now
              </Button>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-gray-400 mt-2">*This is mock data for beta testing</div>
      </CardContent>
    </Card>
  );
};