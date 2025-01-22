import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SmartSearch = () => {
  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search or ask any legal question..."
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      <div className="mt-2 text-xs text-gray-400">
        Popular: Contract Review, Legal Templates, Case Law
      </div>
    </div>
  );
};