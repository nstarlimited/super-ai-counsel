import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  features: PlanFeature[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: "$49",
    period: "/month",
    features: [
      { name: "Basic legal document templates", included: true },
      { name: "5 AI legal queries/month", included: true },
      { name: "Email support (24-48h)", included: true },
      { name: "Basic legal resources", included: true },
      { name: "One 30-min consultation/month", included: true },
      { name: "Basic document review", included: true },
      { name: "Access to public forums", included: true },
      { name: "Basic case tracking", included: true },
    ],
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    popular: true,
    features: [
      { name: "All Basic features", included: true },
      { name: "Unlimited AI legal assistance", included: true },
      { name: "Priority support (4-8h)", included: true },
      { name: "Advanced document templates", included: true },
      { name: "Three 30-min consultations/month", included: true },
      { name: "Advanced document review", included: true },
      { name: "Priority access to lawyers", included: true },
      { name: "Custom legal forms", included: true },
    ],
  },
  {
    name: "Lifetime",
    price: "$149",
    period: " one-time",
    features: [
      { name: "All Professional features", included: true },
      { name: "Lifetime access", included: true },
      { name: "VIP support (1-2h)", included: true },
      { name: "Exclusive legal webinars", included: true },
      { name: "Premium document templates", included: true },
      { name: "Unlimited document storage", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Emergency legal support", included: true },
    ],
  },
];

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const { toast } = useToast();

  const handleUpgrade = async (plan: Plan) => {
    console.log('Initiating upgrade for plan:', plan.name);

    try {
      // Get payment link from Edge Function
      const { data, error } = await supabase.functions.invoke('get-payment-link', {
        body: { planName: plan.name }
      });

      if (error) {
        console.error('Error getting payment link:', error);
        toast({
          title: "Error",
          description: "Unable to process upgrade request. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Track the click without waiting for the response
      supabase.from('user_activities').insert({
        activity_type: 'upgrade_click',
        activity_data: {
          plan_name: plan.name,
          plan_price: plan.price,
          plan_period: plan.period
        }
      }).then(() => {
        console.log('Activity logged successfully');
      }).catch((error) => {
        console.error('Error logging activity:', error);
      });

      // Redirect to payment URL
      if (data?.url) {
        console.log('Redirecting to payment URL:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('Payment URL not received');
      }
    } catch (error) {
      console.error('Error in upgrade process:', error);
      toast({
        title: "Error",
        description: "Unable to process upgrade request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upgrade Your Plan
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border p-6 space-y-4 ${
                plan.popular
                  ? "border-primary shadow-lg ring-2 ring-primary"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature.name}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleUpgrade(plan)}
              >
                Upgrade to {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}