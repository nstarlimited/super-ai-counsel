import { useState } from "react";
import { SearchTools } from "@/components/legal-ai/SearchTools";
import { CategoryCard } from "@/components/legal-ai/CategoryCard";
import { categories } from "@/data/legalAICategories";

export const LegalAITools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.agents.some(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="space-y-8 p-6">
      <SearchTools searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            agentCount={category.agentCount}
            agents={category.agents}
          />
        ))}
      </div>
    </div>
  );
};