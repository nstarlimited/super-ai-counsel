import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Handshake } from "lucide-react";
import { CreateCaseModal } from "./CreateCaseModal";

export function CasesList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Legal Aid Cases</h2>
        <CreateCaseModal />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Example Case
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This is a placeholder for case content.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Handshake className="h-4 w-4" />
              <span>Seeking Volunteers</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}