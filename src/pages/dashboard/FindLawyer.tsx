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
import { TopRatedLawyers } from "@/components/lawyers/TopRatedLawyers";
import { NearbyLawyers } from "@/components/lawyers/NearbyLawyers";
import { TrendingLawyers } from "@/components/lawyers/TrendingLawyers";
import { UrgentLegalHelp } from "@/components/lawyers/UrgentLegalHelp";
import { CategoryBasedLawyers } from "@/components/lawyers/CategoryBasedLawyers";
import { RecentlyViewed } from "@/components/lawyers/RecentlyViewed";
import { VerifiedLawyers } from "@/components/lawyers/VerifiedLawyers";
import { RecentSearches } from "@/components/lawyers/RecentSearches";
import { CommunityRecommended } from "@/components/lawyers/CommunityRecommended";
import { MultilingualLawyers } from "@/components/lawyers/MultilingualLawyers";
import { Lawyer } from "@/types/lawyer";
import { JoinAsLawyer } from "@/components/lawyers/JoinAsLawyer";
import { ConsultationBooking } from "@/components/lawyers/ConsultationBooking";
import { LocationFilter } from "@/components/lawyers/LocationFilter";
import { currencies, getCurrencyByCountry } from "@/utils/currencies";

type ViewMode = "grid" | "list";
type SortOption = "rating" | "experience" | "price";

export const FindLawyer = () => {
  const { toast } = useToast();
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [searchQuery, setSearchQuery] = useState("");
  const [compareList, setCompareList] = useState<Lawyer[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [filters, setFilters] = useState({
    specialization: "",
    location: {
      country: "",
      state: "",
      city: "",
    },
    priceRange: [0, 1000],
    language: "",
    minRating: 0,
    minExperience: 0,
    radius: 50,
    isVerified: false,
    availability: "all",
  });
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { data: lawyers, isLoading } = useQuery({
    queryKey: ["lawyers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select(`
          *,
          profiles(avatar_url)
        `);

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

  const handleLocationChange = (location: { country: string; state: string; city: string }) => {
    setFilters({ ...filters, location });
    // Update currency based on selected country
    if (location.country) {
      setSelectedCurrency(getCurrencyByCountry(location.country));
    }
  };

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
      !filters.location.country ||
      lawyer.location.toLowerCase().includes(filters.location.country.toLowerCase());
    const matchesPrice =
      lawyer.hourly_rate >= filters.priceRange[0] &&
      lawyer.hourly_rate <= filters.priceRange[1];
    const matchesLanguage =
      !filters.language || (lawyer.languages || []).includes(filters.language);
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

  const handleViewProfile = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Mock Data Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              This is a demo version with mock data. The lawyers, reviews, and other information shown are for demonstration purposes only.
            </p>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <JoinAsLawyer />
        </div>
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
      <div className="space-y-4 bg-white p-6 rounded-lg shadow">
        <Input
          placeholder="Search lawyers by name or specialization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            value={filters.specialization}
            onValueChange={(value) =>
              setFilters({ ...filters, specialization: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="criminal">Criminal Law</SelectItem>
              <SelectItem value="corporate">Corporate Law</SelectItem>
              <SelectItem value="family">Family Law</SelectItem>
              <SelectItem value="immigration">Immigration Law</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.language}
            onValueChange={(value) => setFilters({ ...filters, language: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="mandarin">Mandarin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <LocationFilter onLocationChange={handleLocationChange} />

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range ({selectedCurrency.symbol})</label>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={50}
            onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setFilters({
                specialization: "",
                location: { country: "", state: "", city: "" },
                priceRange: [0, 1000],
                language: "",
                minRating: 0,
                minExperience: 0,
                radius: 50,
                isVerified: false,
                availability: "all",
              });
              setSearchQuery("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* New Sections */}
      <VerifiedLawyers />
      <RecentSearches />
      <CommunityRecommended />
      <MultilingualLawyers />

      {/* Existing Sections */}
      <FeaturedLawyers />
      <TopRatedLawyers />
      <NearbyLawyers />
      <UrgentLegalHelp />
      <TrendingLawyers />
      <CategoryBasedLawyers />
      <RecentlyViewed />

      {/* Main Content */}
      <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLawyers?.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                lawyer={lawyer}
                onSelect={() => handleViewProfile(lawyer)}
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
                lawyer={lawyer}
                onSelect={() => handleViewProfile(lawyer)}
                onCompare={() => handleCompare(lawyer)}
                isCompared={compareList.some((l) => l.id === lawyer.id)}
                viewMode="list"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Profile Modal */}
      {selectedLawyer && (
        <LawyerProfile
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
          onBookConsultation={() => setIsBookingOpen(true)}
        />
      )}

      {/* Consultation Booking Modal */}
      {selectedLawyer && isBookingOpen && (
        <ConsultationBooking
          lawyer={selectedLawyer}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
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
