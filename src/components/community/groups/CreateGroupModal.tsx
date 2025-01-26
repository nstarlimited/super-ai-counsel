import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CreateGroupModal() {
  return (
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      New Group
    </Button>
  );
}