import { useState, useEffect } from "react";
import { DollarSign } from "lucide-react";

import useFormContext from "../hooks/useFormContext";

// Custom Components
import Tooltip from "./ui/Tooltip";
import { TogglePrice } from "./ui/TogglePrice";

// Data
import stepData from "../data/stepData";

const Step2 = () => {
  const [height, setHeight] = useState(138);

  const {
    formData,
    setFormData,
    handleChange,
    errors,
    tooltipVisibility,
    setTooltipVisibility,
    currentStep,
    motion,
    AnimatePresence,
  } = useFormContext();

  const { plans } = stepData[currentStep - 1];

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 992) {
        setHeight(formData.isYearlyPlan ? 100 : 75);
      } else {
        setHeight(formData.isYearlyPlan ? 165 : 138);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [formData.isYearlyPlan]);

  return (
    <>
      <menu className="relative space-y-3 lg:flex lg:gap-4 lg:space-y-0">
        {plans?.map((plan) => (
          <AnimatePresence key={plan.name}>
            <motion.li className="lg:w-[151px]" animate={{ height: height }}>
              <label
                htmlFor={plan.name}
                className="flex cursor-pointer gap-4 rounded-md border border-Light-gray p-3 transition hover:bg-sky-50 has-[:checked]:border-purplish-blue has-[:checked]:bg-sky-50 lg:flex-col lg:p-4 lg:pb-0"
              >
                <div dangerouslySetInnerHTML={{ __html: plan.icon }} />
                <div>
                  <h3 className="font-medium capitalize">{plan.name}</h3>
                  <h4 className="flex items-center text-dimgray">
                    <DollarSign size={16} />
                    <span>
                      {formData.isYearlyPlan
                        ? `${plan.yearlyPrice}/yr`
                        : `${plan.monthlyPrice}/mo`}
                    </span>
                  </h4>
                  {formData.isYearlyPlan && <h5>2 months free</h5>}
                </div>
                <input
                  className="appearance-none"
                  type="radio"
                  name="plan"
                  id={plan.name}
                  value={plan.name}
                  checked={formData.plan === plan.name}
                  onChange={handleChange}
                />
              </label>
            </motion.li>
          </AnimatePresence>
        ))}
        {errors.plan && (
          <Tooltip
            message={errors.plan}
            isVisible={tooltipVisibility.plan}
            hideTooltip={() =>
              setTooltipVisibility({ ...tooltipVisibility, plan: false })
            }
          />
        )}
      </menu>

      <TogglePrice
        isYearlyPlan={formData.isYearlyPlan}
        setFormData={setFormData}
      ></TogglePrice>
    </>
  );
};
export default Step2;
