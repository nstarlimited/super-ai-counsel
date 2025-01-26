import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSquare, Trophy, Users, BookOpen, Video, Shield, UsersRound } from "lucide-react";
import { CompetitionsList } from "@/components/community/CompetitionsList";
import { ForumsList } from "@/components/community/ForumsList";
import { KnowledgeHub } from "@/components/community/KnowledgeHub";
import { NetworkingArea } from "@/components/community/NetworkingArea";
import { GroupsList } from "@/components/community/groups/GroupsList";
import { SessionsList } from "@/components/community/live-sessions/SessionsList";
import { CasesList } from "@/components/community/legal-aid/CasesList";

export default function CommunityFeatures() {
  const { data: competitions, isLoading: isLoadingCompetitions } = useQuery({
    queryKey: ["competitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .order("start_date", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Features</h1>
      </div>

      <Alert>
        <AlertDescription>
          Disclaimer: This is a demo version of the community features. Some functionality may be limited.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="competitions" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="competitions" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Competitions
          </TabsTrigger>
          <TabsTrigger value="forums" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Forums
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Knowledge Hub
          </TabsTrigger>
          <TabsTrigger value="networking" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Networking
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <UsersRound className="h-4 w-4" />
            Groups
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Live Sessions
          </TabsTrigger>
          <TabsTrigger value="legal-aid" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Legal Aid
          </TabsTrigger>
        </TabsList>

        <TabsContent value="competitions">
          <CompetitionsList competitions={competitions} isLoading={isLoadingCompetitions} />
        </TabsContent>

        <TabsContent value="forums">
          <ForumsList />
        </TabsContent>

        <TabsContent value="knowledge">
          <KnowledgeHub />
        </TabsContent>

        <TabsContent value="networking">
          <NetworkingArea />
        </TabsContent>

        <TabsContent value="groups">
          <GroupsList />
        </TabsContent>

        <TabsContent value="sessions">
          <SessionsList />
        </TabsContent>

        <TabsContent value="legal-aid">
          <CasesList />
        </TabsContent>
      </Tabs>
    </div>
  );
}