import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, MapPin, Clock, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type LawyerProfileProps = {
  lawyer: {
    id: string;
    firm_name: string;
    specializations: string[];
    years_experience: number;
    languages: string[];
    hourly_rate: number;
    is_verified: boolean;
    rating: number;
    total_reviews: number;
    location: string;
    availability_status: string;
  };
  onClose: () => void;
};

export const LawyerProfile = ({ lawyer, onClose }: LawyerProfileProps) => {
  const { data: reviews } = useQuery({
    queryKey: ["lawyer-reviews", lawyer.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_reviews")
        .select(`*, profiles(first_name, last_name)`)
        .eq("lawyer_id", lawyer.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {lawyer.firm_name}
              {lawyer.is_verified && (
                <CheckCircle className="h-5 w-5 text-blue-500" />
              )}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>
                {lawyer.rating.toFixed(1)} ({lawyer.total_reviews} reviews)
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Specializations */}
          <div className="space-y-2">
            <h3 className="font-semibold">Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {lawyer.specializations.map((specialization) => (
                <Badge key={specialization} variant="secondary">
                  {specialization}
                </Badge>
              ))}
            </div>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{lawyer.years_experience} years of experience</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{lawyer.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{lawyer.languages.join(", ")}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">${lawyer.hourly_rate}/hour</p>
              <Badge
                variant="outline"
                className={cn(
                  lawyer.availability_status === "available"
                    ? "border-green-500 text-green-500"
                    : ""
                )}
              >
                {lawyer.availability_status}
              </Badge>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Recent Reviews</h3>
            <div className="space-y-4">
              {reviews?.map((review: any) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {review.profiles.first_name} {review.profiles.last_name}
                    </span>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {review.review_text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1">Book Consultation</Button>
            <Button variant="outline" className="flex-1">
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};