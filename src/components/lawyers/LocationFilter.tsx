import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

type LocationFilterProps = {
  onLocationChange: (location: { country: string; state: string; city: string }) => void;
};

export const LocationFilter = ({ onLocationChange }: LocationFilterProps) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // This is a simplified list - you might want to use a complete countries database
  const countries = [
    { code: "US", name: "United States" },
    { code: "NG", name: "Nigeria" },
    { code: "GB", name: "United Kingdom" },
    // Add more countries as needed
  ];

  useEffect(() => {
    onLocationChange({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
    });
  }, [selectedCountry, selectedState, selectedCity, onLocationChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
        <SelectTrigger>
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedState} onValueChange={setSelectedState}>
        <SelectTrigger>
          <SelectValue placeholder="Select State/Region" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {/* Add dynamic state list based on selected country */}
          <SelectItem value="state1">State 1</SelectItem>
          <SelectItem value="state2">State 2</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedCity} onValueChange={setSelectedCity}>
        <SelectTrigger>
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {/* Add dynamic city list based on selected state */}
          <SelectItem value="city1">City 1</SelectItem>
          <SelectItem value="city2">City 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};