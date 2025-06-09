import { generateBillingLink } from "@/lib/subscription";
import { Button } from "./ui/button";

const Billing = async () => {
  const portalUrl = await generateBillingLink();
  return (
    <>
      {portalUrl && (
        <a href={portalUrl}>
          <Button variant="link">Billing</Button>
        </a>
      )}
    </>
  );
};

export default Billing;
