import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, GraduationCap, Building, ShieldCheck } from "lucide-react";

interface Credential {
  institution: string;
  title: string;
  year: string;
  description?: string;
}

interface LawyerCredentialsProps {
  education: Credential[];
  certifications: Credential[];
  barMemberships: Credential[];
  awards: Credential[];
  associations: Credential[];
}

export const LawyerCredentials = ({
  education,
  certifications,
  barMemberships,
  awards,
  associations,
}: LawyerCredentialsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education & Certifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="space-y-1">
              <h4 className="font-semibold">{edu.title}</h4>
              <p className="text-sm text-muted-foreground">
                {edu.institution} • {edu.year}
              </p>
              {edu.description && (
                <p className="text-sm text-muted-foreground">{edu.description}</p>
              )}
            </div>
          ))}
          <div className="flex flex-wrap gap-2 mt-2">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="secondary">
                {cert.title}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Bar Memberships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {barMemberships.map((bar, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{bar.title}</span>
                <Badge variant="outline">{bar.year}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Awards & Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {awards.map((award, index) => (
              <div key={index} className="space-y-1">
                <h4 className="font-semibold">{award.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {award.institution} • {award.year}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Professional Associations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {associations.map((assoc, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{assoc.title}</span>
                <Badge variant="outline">{assoc.year}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};