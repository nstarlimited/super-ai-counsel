import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, MapPin, Clock, Globe, Video, FileText, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { LawyerCredentials } from "./LawyerCredentials";
import { LawyerStats } from "./LawyerStats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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
    avatar_url?: string;
    success_rate?: number;
    response_time?: string;
    education?: any[];
    certifications?: any[];
    bar_memberships?: any[];
    awards?: any[];
    professional_associations?: any[];
    consultation_fee?: number;
    video_consultation_available?: boolean;
    accepts_document_sharing?: boolean;
  };
  onClose: () => void;
};

export const LawyerProfile = ({ lawyer, onClose }: LawyerProfileProps) => {
  const { data: reviews } = useQuery({
    queryKey: ["lawyer-reviews", lawyer.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_reviews")
        .select(`
          *,
          profiles(first_name, last_name),
          lawyer_review_categories(
            knowledge_rating,
            communication_rating,
            value_rating
          )
        `)
        .eq("lawyer_id", lawyer.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={lawyer.avatar_url} alt={lawyer.firm_name} />
              <AvatarFallback>{getInitials(lawyer.firm_name)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <DialogTitle className="flex items-center gap-2">
                <span className="text-2xl">{lawyer.firm_name}</span>
                {lawyer.is_verified && (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                )}
              </DialogTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {lawyer.rating.toFixed(1)} ({lawyer.total_reviews} reviews)
                  </span>
                </div>
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
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
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
            <div className="grid grid-cols-2 gap-4">
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
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold">${lawyer.hourly_rate}/hour</span>
                </div>
                {lawyer.consultation_fee && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Initial consultation: ${lawyer.consultation_fee}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  {lawyer.video_consultation_available && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      Video available
                    </Badge>
                  )}
                  {lawyer.accepts_document_sharing && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Document sharing
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Stats */}
            <LawyerStats
              successRate={lawyer.success_rate || 0}
              responseTime={lawyer.response_time || "N/A"}
              totalClients={lawyer.total_reviews}
              experienceYears={lawyer.years_experience}
            />

            <Separator />

            {/* Credentials */}
            <LawyerCredentials
              education={lawyer.education || []}
              certifications={lawyer.certifications || []}
              barMemberships={lawyer.bar_memberships || []}
              awards={lawyer.awards || []}
              associations={lawyer.professional_associations || []}
            />
          </div>

          {/* Reviews Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Recent Reviews</h3>
            <div className="space-y-4">
              {reviews?.map((review: any) => (
                <div key={review.id} className="border rounded-lg p-4">
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
                  {review.lawyer_review_categories?.[0] && (
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Knowledge</span>
                        <div className="flex">
                          {Array.from({ length: review.lawyer_review_categories[0].knowledge_rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Communication</span>
                        <div className="flex">
                          {Array.from({ length: review.lawyer_review_categories[0].communication_rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Value</span>
                        <div className="flex">
                          {Array.from({ length: review.lawyer_review_categories[0].value_rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-sm mt-2">{review.review_text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button className="flex-1">Book Consultation</Button>
          <Button variant="outline" className="flex-1">
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};