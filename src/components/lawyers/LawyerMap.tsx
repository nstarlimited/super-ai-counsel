import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

type Lawyer = {
  id: string;
  firm_name: string;
  location: string;
  rating: number;
};

type LawyerMapProps = {
  lawyers: Lawyer[];
  onSelect: (lawyer: Lawyer) => void;
};

export const LawyerMap = ({ lawyers, onSelect }: LawyerMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Here you would initialize your map library (Google Maps, Mapbox, etc.)
    // For now, we'll just show a placeholder
  }, []);

  return (
    <Card className="w-full h-[600px] relative">
      <div ref={mapRef} className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Map View Coming Soon</p>
      </div>
    </Card>
  );
};