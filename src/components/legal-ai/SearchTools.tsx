import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { keywords } from "@/data/legalAICategories";

interface SearchToolsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const SearchTools = ({ searchQuery, onSearchChange }: SearchToolsProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2">
            {keywords.map((keyword) => (
              <Badge
                key={keyword}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => onSearchChange(keyword)}
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search AI tools and agents..."
          value={searchQuery}
          onValueChange={onSearchChange}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Legal Research Assistant</CommandItem>
            <CommandItem>Contract Analysis</CommandItem>
            <CommandItem>Document Review</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};