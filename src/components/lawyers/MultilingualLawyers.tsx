import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LawyerCard } from "./LawyerCard";
import { Lawyer } from "@/types/lawyer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export const MultilingualLawyers = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const { data: multilingualLawyers } = useQuery({
    queryKey: ["multilingual-lawyers", selectedLanguage],
    queryFn: async () => {
      const query = supabase
        .from("lawyer_profiles")
        .select("*, profiles(avatar_url)")
        .order("rating", { ascending: false });

      if (selectedLanguage) {
        query.contains("languages", [selectedLanguage]);
      }

      const { data, error } = await query.limit(3);

      if (error) throw error;
      return data as Lawyer[];
    },
  });

  const languages = [
    "English",
    "French",
    "Spanish",
    "Arabic",
    "Mandarin",
    "Hindi",
    "Portuguese",
    "Yoruba",
    "Igbo",
    "Hausa",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Multilingual Lawyers</h2>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang.toLowerCase()}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {multilingualLawyers?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {multilingualLawyers.map((lawyer) => (
            <LawyerCard
              key={lawyer.id}
              lawyer={lawyer}
              onSelect={() => {}}
              viewMode="grid"
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No lawyers found for the selected language.</p>
      )}
    </div>
  );
};