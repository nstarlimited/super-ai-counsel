import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UsersRound, Lock, Unlock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CreateGroupModal } from "./CreateGroupModal";

export function GroupsList() {
  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading groups...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Groups</h2>
        <CreateGroupModal />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups?.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UsersRound className="h-5 w-5" />
                  {group.name}
                </CardTitle>
                {group.is_private ? (
                  <Lock className="h-4 w-4 text-gray-500" />
                ) : (
                  <Unlock className="h-4 w-4 text-gray-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{group.description}</p>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">
                  {group.membership_type.charAt(0).toUpperCase() + 
                   group.membership_type.slice(1).replace('_', ' ')}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {group.max_members} max members
                </span>
              </div>
              <Button className="w-full">Join Group</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}