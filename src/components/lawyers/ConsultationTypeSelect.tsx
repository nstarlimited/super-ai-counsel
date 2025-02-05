import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ConsultationType } from "@/types/consultation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, AlertTriangle, Video, PersonStanding } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ConsultationTypeSelectProps = {
  onSelect: (type: ConsultationType) => void;
  selectedTypeId?: string;
};

export const ConsultationTypeSelect = ({
  onSelect,
  selectedTypeId,
}: ConsultationTypeSelectProps) => {
  const { data: consultationTypes, isLoading } = useQuery({
    queryKey: ["consultation-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consultation_types")
        .select("*")
        .order("price");

      if (error) throw error;
      return data as ConsultationType[];
    },
  });

  if (isLoading) return <div>Loading consultation types...</div>;

  return (
    <div className="space-y-4">
      <Select
        value={selectedTypeId}
        onValueChange={(value) => {
          const selectedType = consultationTypes?.find((type) => type.id === value);
          if (selectedType) onSelect(selectedType);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select consultation type" />
        </SelectTrigger>
        <SelectContent>
          {consultationTypes?.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedTypeId && consultationTypes && (
        <Card>
          <CardHeader>
            <CardTitle>
              {consultationTypes.find((t) => t.id === selectedTypeId)?.name}
            </CardTitle>
            <CardDescription>
              {consultationTypes.find((t) => t.id === selectedTypeId)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {consultationTypes.find((t) => t.id === selectedTypeId)?.duration_minutes} minutes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>
                ${consultationTypes.find((t) => t.id === selectedTypeId)?.price}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {consultationTypes.find((t) => t.id === selectedTypeId)?.is_emergency && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Emergency
                </Badge>
              )}
              {consultationTypes.find((t) => t.id === selectedTypeId)?.is_group && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Group Session
                </Badge>
              )}
              <Badge variant="outline" className="flex items-center gap-1">
                <Video className="h-3 w-3" />
                Virtual
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <PersonStanding className="h-3 w-3" />
                In-Person
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};