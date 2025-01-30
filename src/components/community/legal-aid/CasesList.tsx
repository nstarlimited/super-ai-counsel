import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Banknote } from "lucide-react";
import { CreateCaseModal } from "./CreateCaseModal";
import { supabase } from "@/integrations/supabase/client";

interface Case {
  id: string;
  title: string;
  description: string;
  required_expertise: string[];
  is_pro_bono: boolean;
  status: string;
  location: string;
  compensation_details: string;
}

export function CasesList() {
  const { data: cases, isLoading } = useQuery({
    queryKey: ["legal-aid-cases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_aid_cases")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Case[];
    },
  });

  if (isLoading) {
    return <div>Loading cases...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Legal Aid Cases</h2>
        <CreateCaseModal />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases?.map((case_) => (
          <Card key={case_.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {case_.title}
                </CardTitle>
                <Badge variant={case_.is_pro_bono ? "secondary" : "default"}>
                  {case_.is_pro_bono ? "Pro Bono" : "Paid"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{case_.description}</p>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {case_.required_expertise.map((expertise) => (
                    <Badge key={expertise} variant="outline">
                      {expertise}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{case_.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Banknote className="h-4 w-4" />
                  <span>{case_.compensation_details}</span>
                </div>
              </div>
              <Button className="w-full">
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}