import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star, CheckCircle } from "lucide-react";

type LawyerCardProps = {
  lawyer: {
    firm_name: string;
    specializations: string[];
    years_experience: number;
    hourly_rate: number;
    is_verified: boolean;
    rating: number;
    total_reviews: number;
    location: string;
    availability_status: string;
  };
  onSelect: () => void;
};

export const LawyerCard = ({ lawyer, onSelect }: LawyerCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{lawyer.firm_name}</h3>
          {lawyer.is_verified && (
            <CheckCircle className="h-5 w-5 text-blue-500" />
          )}
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>
            {lawyer.rating.toFixed(1)} ({lawyer.total_reviews} reviews)
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {lawyer.specializations.map((specialization) => (
            <Badge key={specialization} variant="secondary">
              {specialization}
            </Badge>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Experience:</span> {lawyer.years_experience}{" "}
            years
          </p>
          <p>
            <span className="font-medium">Rate:</span> ${lawyer.hourly_rate}/hour
          </p>
          <p>
            <span className="font-medium">Location:</span> {lawyer.location}
          </p>
          <Badge
            variant={lawyer.availability_status === "available" ? "success" : "secondary"}
          >
            {lawyer.availability_status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSelect} className="w-full">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};