import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { LawyerCard } from "@/components/lawyers/LawyerCard";
import { LawyerProfile } from "@/components/lawyers/LawyerProfile";
import { useToast } from "@/components/ui/use-toast";

type Lawyer = {
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

const FindLawyer = () => {
  const { toast } = useToast();
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [filters, setFilters] = useState({
    specialization: "",
    location: "",
    priceRange: [0, 1000],
    language: "",
  });

  const { data: lawyers, isLoading } = useQuery({
    queryKey: ["lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("*");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch lawyers",
          variant: "destructive",
        });
        throw error;
      }

      return data as Lawyer[];
    },
  });

  const filteredLawyers = lawyers?.filter((lawyer) => {
    const matchesSpecialization =
      !filters.specialization ||
      lawyer.specializations.includes(filters.specialization);
    const matchesLocation =
      !filters.location ||
      lawyer.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesPrice =
      lawyer.hourly_rate >= filters.priceRange[0] &&
      lawyer.hourly_rate <= filters.priceRange[1];
    const matchesLanguage =
      !filters.language || lawyer.languages.includes(filters.language);

    return (
      matchesSpecialization && matchesLocation && matchesPrice && matchesLanguage
    );
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Find a Lawyer</h1>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow">
        <Select
          value={filters.specialization}
          onValueChange={(value) =>
            setFilters({ ...filters, specialization: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="criminal">Criminal Law</SelectItem>
            <SelectItem value="corporate">Corporate Law</SelectItem>
            <SelectItem value="family">Family Law</SelectItem>
            <SelectItem value="immigration">Immigration Law</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={50}
            onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
          />
        </div>

        <Select
          value={filters.language}
          onValueChange={(value) => setFilters({ ...filters, language: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="mandarin">Mandarin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lawyers Grid */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers?.map((lawyer) => (
            <LawyerCard
              key={lawyer.id}
              lawyer={lawyer}
              onSelect={() => setSelectedLawyer(lawyer)}
            />
          ))}
        </div>
      )}

      {/* Lawyer Profile Dialog */}
      {selectedLawyer && (
        <LawyerProfile
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
        />
      )}
    </div>
  );
};

export default FindLawyer;