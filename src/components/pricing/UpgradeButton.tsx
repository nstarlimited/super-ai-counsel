import { useState } from "react";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingModal } from "./PricingModal";

export function UpgradeButton() {
  const [showPricingModal, setShowPricingModal] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="w-full bg-primary/5 hover:bg-primary/10"
        onClick={() => setShowPricingModal(true)}
      >
        <Crown className="mr-2 h-4 w-4" />
        Upgrade Plan
      </Button>
      <PricingModal
        open={showPricingModal}
        onOpenChange={setShowPricingModal}
      />
    </>
  );
}