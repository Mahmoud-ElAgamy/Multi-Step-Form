// Types
import { PlanPriceDetails, AddOnsPrices, FormData } from "../types/formData";

const calculatePlanAndTotalCost = (formData: FormData): PlanPriceDetails => {
  const basePrice =
    formData.plan === "arcade" ? 9 : formData.plan === "advanced" ? 12 : 15;
  const planPrice = formData.isYearlyPlan ? basePrice * 10 : basePrice;

  const addOnsPrices: AddOnsPrices = {
    "online-service": 1,
    "larger-storage": 2,
    "customizable-profile": 2,
  };

  const selectedAddOns = Object.entries(formData.addOns)
    .filter(([key, isChecked]) => isChecked && key in addOnsPrices)
    .map(([key]) => ({
      name: key,
      price: addOnsPrices[key] * (formData.isYearlyPlan ? 10 : 1),
    }));

  const addOnsTotal = selectedAddOns.reduce(
    (total, addOn) => total + addOn.price,
    0,
  );

  const totalCost = planPrice + addOnsTotal;

  return { planPrice, totalCost, selectedAddOns };
};

export default calculatePlanAndTotalCost;
