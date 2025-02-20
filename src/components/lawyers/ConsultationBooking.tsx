
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lawyer } from "@/types/lawyer";
import { ConsultationType } from "@/types/consultation";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { ConsultationTypeSelect } from "./ConsultationTypeSelect";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Video, PersonStanding } from "lucide-react";

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

interface ConsultationBookingProps {
  lawyer: Lawyer;
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationBooking = ({ lawyer, isOpen, onClose }: ConsultationBookingProps) => {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();
  const [selectedType, setSelectedType] = useState<ConsultationType>();
  const [meetingType, setMeetingType] = useState<'virtual' | 'in_person'>('virtual');
  const [caseBrief, setCaseBrief] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const { toast } = useToast();

  const handleBooking = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to book a consultation",
          variant: "destructive",
        });
        return;
      }

      if (!date || !timeSlot || !selectedType) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      const [hours, minutes] = timeSlot.split(":").map(Number);
      const scheduledAt = setMinutes(setHours(date, hours), minutes);

      const { error } = await supabase.from("lawyer_consultations").insert({
        lawyer_id: lawyer.id,
        client_id: user.id,
        consultation_type_id: selectedType.id,
        consultation_type: selectedType.name,
        duration_minutes: selectedType.duration_minutes,
        scheduled_at: scheduledAt.toISOString(),
        meeting_type: meetingType,
        case_brief: caseBrief,
        special_requirements: specialRequirements,
        status: 'pending',
        payment_status: 'pending',
        payment_amount: selectedType.price,
      });

      if (error) throw error;

      toast({
        title: "Consultation booked",
        description: `Your consultation with ${lawyer.firm_name} has been scheduled.`,
      });
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: "Failed to book consultation. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!lawyer) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Consultation with {lawyer.firm_name}</DialogTitle>
          <DialogDescription>
            Select your preferred consultation type and schedule.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <ConsultationTypeSelect
            onSelect={setSelectedType}
            selectedTypeId={selectedType?.id}
          />

          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
              className="rounded-md border"
            />
            <Select onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Meeting Type</Label>
              <RadioGroup
                defaultValue="virtual"
                onValueChange={(value) => setMeetingType(value as 'virtual' | 'in_person')}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="virtual" id="virtual" />
                  <Label htmlFor="virtual" className="flex items-center gap-1">
                    <Video className="h-4 w-4" /> Virtual
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in_person" id="in_person" />
                  <Label htmlFor="in_person" className="flex items-center gap-1">
                    <PersonStanding className="h-4 w-4" /> In-Person
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="caseBrief">Case Brief</Label>
              <Textarea
                id="caseBrief"
                placeholder="Briefly describe your case..."
                value={caseBrief}
                onChange={(e) => setCaseBrief(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements</Label>
              <Textarea
                id="specialRequirements"
                placeholder="Any special requirements or accommodations..."
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
              />
            </div>
          </div>

          {date && timeSlot && selectedType && (
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Your {selectedType.name} consultation is scheduled for{" "}
                {format(date, "MMMM do, yyyy")} at {timeSlot}
              </p>
              <p>Duration: {selectedType.duration_minutes} minutes</p>
              <p>Cost: ${selectedType.price}</p>
            </div>
          )}

          <Button onClick={handleBooking} className="w-full">
            Book Consultation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
