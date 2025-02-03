import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";

const lawyerApplicationSchema = z.object({
  firm_name: z.string().min(2, "Firm name must be at least 2 characters"),
  specializations: z.string().min(2, "Please enter your specializations"),
  years_experience: z.string().min(1, "Please enter your years of experience"),
  languages: z.string().min(2, "Please enter languages you speak"),
  hourly_rate: z.string().min(1, "Please enter your hourly rate"),
  location: z.string().min(2, "Please enter your location"),
});

export const JoinAsLawyer = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof lawyerApplicationSchema>>({
    resolver: zodResolver(lawyerApplicationSchema),
  });

  const onSubmit = async (values: z.infer<typeof lawyerApplicationSchema>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to submit your application",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("lawyer_profiles").insert({
        user_id: user.id,
        firm_name: values.firm_name,
        specializations: values.specializations.split(",").map((s) => s.trim()),
        years_experience: parseInt(values.years_experience),
        languages: values.languages.split(",").map((l) => l.trim()),
        hourly_rate: parseFloat(values.hourly_rate),
        location: values.location,
        verification_status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Application submitted",
        description: "We'll review your application and get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">Join as Lawyer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply to Join as a Lawyer</DialogTitle>
          <DialogDescription>
            Fill out this form to apply. We'll review your application and get back to you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firm_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firm Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specializations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specializations (comma-separated)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Criminal Law, Family Law, etc." />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="years_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages (comma-separated)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="English, Spanish, etc." />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hourly_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate ($)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City, State" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit Application</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};