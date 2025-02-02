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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Grid, List } from "lucide-react";
import { ComparisonDrawer } from "@/components/lawyers/ComparisonDrawer";
import { FeaturedLawyers } from "@/components/lawyers/FeaturedLawyers";
import { RecentlyViewed } from "@/components/lawyers/RecentlyViewed";

type ViewMode = "grid" | "list";
type SortOption = "rating" | "experience" | "price";

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
  avatar_url?: string;
  success_rate?: number;
  response_time?: string;
  is_featured?: boolean;
  profiles?: {
    avatar_url: string | null;
  };
};

export const FindLawyer = () => {
  const { toast } = useToast();
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [searchQuery, setSearchQuery] = useState("");
  const [compareList, setCompareList] = useState<Lawyer[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    specialization: "",
    location: "",
    priceRange: [0, 1000],
    language: "",
    minRating: 0,
    minExperience: 0,
    radius: 50,
    isVerified: false,
    availability: "all",
  });

  const { data: lawyers, isLoading } = useQuery({
    queryKey: ["lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("*, profiles(avatar_url)");

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
    const matchesSearch =
      !searchQuery ||
      lawyer.firm_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specializations.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
    const matchesRating = lawyer.rating >= filters.minRating;
    const matchesExperience = lawyer.years_experience >= filters.minExperience;
    const matchesVerification = !filters.isVerified || lawyer.is_verified;
    const matchesAvailability =
      filters.availability === "all" ||
      lawyer.availability_status === filters.availability;

    return (
      matchesSearch &&
      matchesSpecialization &&
      matchesLocation &&
      matchesPrice &&
      matchesLanguage &&
      matchesRating &&
      matchesExperience &&
      matchesVerification &&
      matchesAvailability
    );
  });

  const sortedLawyers = filteredLawyers?.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "experience":
        return b.years_experience - a.years_experience;
      case "price":
        return a.hourly_rate - b.hourly_rate;
      default:
        return 0;
    }
  });

  const handleCompare = (lawyer: Lawyer) => {
    if (compareList.find((l) => l.id === lawyer.id)) {
      setCompareList(compareList.filter((l) => l.id !== lawyer.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, lawyer]);
    } else {
      toast({
        title: "Compare limit reached",
        description: "You can compare up to 3 lawyers at a time",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Find a Lawyer</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow">
        <Input
          placeholder="Search lawyers by name or specialization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="col-span-full"
        />
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

      {/* Featured Lawyers */}
      <FeaturedLawyers />

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Main Content */}
      <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLawyers?.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                lawyer={{
                  ...lawyer,
                  avatar_url: lawyer.profiles?.avatar_url || lawyer.avatar_url,
                  languages: lawyer.languages || [],
                  is_verified: lawyer.is_verified || false,
                  total_reviews: lawyer.total_reviews || 0,
                  availability_status: lawyer.availability_status || "unavailable",
                }}
                onSelect={() => setSelectedLawyer(lawyer)}
                onCompare={() => handleCompare(lawyer)}
                isCompared={compareList.some((l) => l.id === lawyer.id)}
                viewMode={viewMode}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <div className="space-y-4">
            {sortedLawyers?.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                lawyer={{
                  ...lawyer,
                  avatar_url: lawyer.profiles?.avatar_url || lawyer.avatar_url,
                  languages: lawyer.languages || [],
                  is_verified: lawyer.is_verified || false,
                  total_reviews: lawyer.total_reviews || 0,
                  availability_status: lawyer.availability_status || "unavailable",
                }}
                onSelect={() => setSelectedLawyer(lawyer)}
                onCompare={() => handleCompare(lawyer)}
                isCompared={compareList.some((l) => l.id === lawyer.id)}
                viewMode="list"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Lawyer Profile Dialog */}
      {selectedLawyer && (
        <LawyerProfile
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
        />
      )}

      {/* Comparison Drawer */}
      <ComparisonDrawer
        lawyers={compareList}
        isOpen={isCompareDrawerOpen}
        onClose={() => setIsCompareDrawerOpen(false)}
        onRemove={(lawyer) => handleCompare(lawyer)}
      />

      {/* Compare Button */}
      {compareList.length > 0 && (
        <Button
          className="fixed bottom-4 right-4"
          onClick={() => setIsCompareDrawerOpen(true)}
        >
          Compare ({compareList.length})
        </Button>
      )}
    </div>
  );
};

export default FindLawyer;