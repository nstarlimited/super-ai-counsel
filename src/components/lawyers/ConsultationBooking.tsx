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
import { addDays, format, setHours, setMinutes } from "date-fns";
import { useState } from "react";

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

type ConsultationBookingProps = {
  lawyer: Lawyer;
  isOpen: boolean;
  onClose: () => void;
};

export const ConsultationBooking = ({ lawyer, isOpen, onClose }: ConsultationBookingProps) => {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>();
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

      if (!date || !timeSlot) {
        toast({
          title: "Missing information",
          description: "Please select both date and time",
          variant: "destructive",
        });
        return;
      }

      const [hours, minutes] = timeSlot.split(":").map(Number);
      const scheduledAt = setMinutes(setHours(date, hours), minutes);

      const { error } = await supabase.from("lawyer_consultations").insert({
        lawyer_id: lawyer.id,
        client_id: user.id,
        scheduled_at: scheduledAt.toISOString(),
        duration_minutes: 60,
        consultation_type: "initial",
        payment_amount: lawyer.consultation_fee,
      });

      if (error) throw error;

      toast({
        title: "Consultation booked",
        description: `Your consultation with ${lawyer.firm_name} has been scheduled.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book consultation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Consultation with {lawyer.firm_name}</DialogTitle>
          <DialogDescription>
            Select your preferred date and time for the consultation.
            {lawyer.consultation_fee > 0 && (
              <p className="mt-2">
                Consultation fee: ${lawyer.consultation_fee}
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
          {date && timeSlot && (
            <p className="text-sm text-muted-foreground">
              Your consultation is scheduled for {format(date, "MMMM do, yyyy")} at {timeSlot}
            </p>
          )}
          <Button onClick={handleBooking} className="w-full">
            Book Consultation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};