import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
  secretKey: string;
}

const plans: Plan[] = [
  {
    name: "Basic",
    price: "$49",
    period: "/month",
    secretKey: "CREEM_BASIC_URL",
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
    secretKey: "CREEM_PRO_URL",
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
    secretKey: "CREEM_LIFETIME_URL",
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
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpgrade = async (plan: Plan) => {
    try {
      setLoadingPlan(plan.name);
      
      // Track upgrade button click
      await supabase.from('user_activities').insert({
        activity_type: 'upgrade_click',
        activity_data: {
          plan_name: plan.name,
          plan_price: plan.price,
          plan_period: plan.period
        }
      });

      // Get the Creem URL from secrets
      const { data: { value: creemUrl }, error: secretError } = await supabase
        .from('secrets')
        .select('value')
        .eq('name', plan.secretKey)
        .single();

      if (secretError || !creemUrl) {
        throw new Error('Failed to get payment URL');
      }

      // Redirect to Creem payment page
      window.location.href = creemUrl;
      
    } catch (error) {
      console.error('Upgrade error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate upgrade process. Please try again.",
      });
    } finally {
      setLoadingPlan(null);
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
                disabled={loadingPlan === plan.name}
              >
                {loadingPlan === plan.name ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Upgrade to ${plan.name}`
                )}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}