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

export const FeaturedLawyers = () => {
  const { data: featuredLawyers } = useQuery({
    queryKey: ["featured-lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("*")
        .eq("is_featured", true)
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  if (!featuredLawyers?.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Featured Lawyers</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {featuredLawyers.map((lawyer) => (
            <CarouselItem key={lawyer.id} className="md:basis-1/2 lg:basis-1/3">
              <LawyerCard lawyer={{ ...lawyer, is_featured: true }} onSelect={() => {}} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};