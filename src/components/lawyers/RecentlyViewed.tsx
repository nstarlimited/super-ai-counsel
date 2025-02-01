import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LawyerCard } from "./LawyerCard";

export const RecentlyViewed = () => {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewedLawyers");
    if (stored) {
      setRecentIds(JSON.parse(stored));
    }
  }, []);

  const { data: recentLawyers } = useQuery({
    queryKey: ["recent-lawyers", recentIds],
    queryFn: async () => {
      if (!recentIds.length) return [];
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("*")
        .in("id", recentIds);

      if (error) throw error;
      return data;
    },
    enabled: recentIds.length > 0,
  });

  if (!recentLawyers?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recently Viewed</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {recentLawyers.map((lawyer) => (
            <CarouselItem key={lawyer.id} className="md:basis-1/2 lg:basis-1/3">
              <LawyerCard lawyer={lawyer} onSelect={() => {}} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};