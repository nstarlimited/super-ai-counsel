import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

type Lawyer = {
  id: string;
  firm_name: string;
  specializations: string[];
  years_experience: number;
  hourly_rate: number;
  rating: number;
  location: string;
  success_rate?: number;
};

type ComparisonDrawerProps = {
  lawyers: Lawyer[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (lawyer: Lawyer) => void;
};

export const ComparisonDrawer = ({
  lawyers,
  isOpen,
  onClose,
  onRemove,
}: ComparisonDrawerProps) => {
  const compareFields = [
    { label: "Experience", key: "years_experience", suffix: " years" },
    { label: "Hourly Rate", key: "hourly_rate", prefix: "$", suffix: "/hour" },
    { label: "Rating", key: "rating" },
    { label: "Location", key: "location" },
    { label: "Success Rate", key: "success_rate", suffix: "%" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Compare Lawyers</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="space-y-6">
            {/* Lawyers Names */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {lawyers.map((lawyer) => (
                <div key={lawyer.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2"
                    onClick={() => onRemove(lawyer)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <h3 className="font-medium">{lawyer.firm_name}</h3>
                </div>
              ))}
            </div>

            {/* Comparison Fields */}
            {compareFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">
                  {field.label}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {lawyers.map((lawyer) => (
                    <div key={lawyer.id}>
                      {field.prefix}
                      {lawyer[field.key as keyof Lawyer]}
                      {field.suffix}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Specializations */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">
                Specializations
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {lawyers.map((lawyer) => (
                  <div key={lawyer.id} className="space-y-1">
                    {lawyer.specializations.map((spec) => (
                      <div key={spec} className="text-sm">
                        {spec}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};