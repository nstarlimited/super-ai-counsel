import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, CheckCircle, Clock, MessageSquare, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageModal } from "@/components/community/MessageModal";

type LawyerCardProps = {
  lawyer: {
    id: string;
    firm_name: string;
    specializations: string[];
    years_experience: number;
    hourly_rate: number;
    is_verified: boolean;
    rating: number;
    total_reviews: number;
    location: string;
    availability_status: string;
    avatar_url?: string;
    success_rate?: number;
    response_time?: string;
    is_featured?: boolean;
  };
  onSelect: () => void;
  onCompare?: () => void;
  isCompared?: boolean;
  viewMode?: "grid" | "list";
};

export const LawyerCard = ({
  lawyer,
  onSelect,
  onCompare,
  isCompared,
  viewMode = "grid",
}: LawyerCardProps) => {
  const isListView = viewMode === "list";

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-shadow",
        isListView && "flex flex-row items-start gap-4",
        lawyer.is_featured && "border-primary"
      )}
    >
      <CardHeader className={cn("space-y-1", isListView && "flex-shrink-0")}>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={lawyer.avatar_url} alt={lawyer.firm_name} />
            <AvatarFallback>{lawyer.firm_name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">{lawyer.firm_name}</h3>
              {lawyer.is_verified && (
                <CheckCircle className="h-5 w-5 text-blue-500" />
              )}
              {lawyer.is_featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>
                {lawyer.rating.toFixed(1)} ({lawyer.total_reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn("space-y-4", isListView && "flex-grow")}>
        <div className="flex flex-wrap gap-2">
          {lawyer.specializations.map((specialization) => (
            <Badge key={specialization} variant="secondary">
              {specialization}
            </Badge>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Experience:</span>{" "}
            {lawyer.years_experience} years
          </p>
          <p>
            <span className="font-medium">Rate:</span> ${lawyer.hourly_rate}/hour
          </p>
          <p>
            <span className="font-medium">Location:</span> {lawyer.location}
          </p>
          {lawyer.success_rate && (
            <p>
              <span className="font-medium">Success Rate:</span>{" "}
              {lawyer.success_rate}%
            </p>
          )}
          {lawyer.response_time && (
            <p className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Responds in {lawyer.response_time}</span>
            </p>
          )}
          <Badge
            variant="outline"
            className={cn(
              lawyer.availability_status === "available" &&
                "border-green-500 text-green-500"
            )}
          >
            {lawyer.availability_status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter
        className={cn(
          "flex gap-2",
          isListView ? "flex-col items-start" : "flex-row items-center"
        )}
      >
        <Button onClick={onSelect} className="flex-1">
          View Profile
        </Button>
        <div className="flex gap-2">
          <MessageModal recipientId={lawyer.id} recipientName={lawyer.firm_name} />
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          {onCompare && (
            <Button
              variant={isCompared ? "default" : "outline"}
              onClick={onCompare}
              className="whitespace-nowrap"
            >
              {isCompared ? "Remove" : "Compare"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};