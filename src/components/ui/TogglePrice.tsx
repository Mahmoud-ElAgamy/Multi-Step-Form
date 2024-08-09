// Types
import { TogglePriceProps } from "../../types/formData";

export function TogglePrice({ isYearlyPlan, setFormData }: TogglePriceProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2 text-center">
      <input
        type="checkbox"
        className="peer/option toggle order-2 text-[#1F2937]"
        checked={isYearlyPlan}
        onChange={() =>
          setFormData((prev) => ({
            ...prev,
            isYearlyPlan: !prev.isYearlyPlan,
          }))
        }
      />
      <span className="order-1 font-medium peer-checked/option:text-Cool-gray">
        Monthly
      </span>
      <span className="order-3 font-medium text-Cool-gray peer-checked/option:text-marine-blue">
        Yearly
      </span>
    </div>
  );
}
