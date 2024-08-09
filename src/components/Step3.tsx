import { DollarSign } from "lucide-react";
import useFormContext from "../hooks/useFormContext";

// Data
import stepData from "../data/stepData";

const Step3 = () => {
  const { formData, handleChange, currentStep } = useFormContext();

  const { addOns } = stepData[currentStep - 1];

  return (
    <div className="form-control gap-3">
      {addOns?.map(
        ({ name, title, description, monthlyPrice, yearlyPrice }) => (
          <label
            htmlFor={name}
            className="label cursor-pointer justify-normal rounded-md border border-Light-gray p-4 transition-all hover:bg-sky-50 has-[:checked]:border-purplish-blue has-[:checked]:bg-sky-50"
          >
            <input
              id={name}
              className="checkbox"
              type="checkbox"
              name={name}
              checked={formData.addOns[name]}
              onChange={handleChange}
            />
            <div className="flex-grow pl-4">
              <h3 className="font-medium">{title}</h3>
              <h4 className="text-dimgray">{description}</h4>
            </div>
            <h5 className="flex items-center text-purplish-blue">
              +<DollarSign size={14} />
              {formData.isYearlyPlan ? yearlyPrice : monthlyPrice}
            </h5>
          </label>
        ),
      )}
    </div>
  );
};
export default Step3;
